import type { Middleware } from 'redux';
import { RootState } from '..';
import {
  WebsocketActions,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from '../slices/websocketSlice';
import { websocketConfigs } from '../../../constants';

export const socketMiddleware: Middleware<{}, RootState> =
  (store) => (next) => {
    let socket: WebSocket | null = null;

    return (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action as WebsocketActions;

      if (type === 'websocket/wsConnectionStart') {
        const { config } = payload;
        let { url, needAuth } = websocketConfigs[config];

        if (needAuth) {
          const accessToken = getState().authSlice.accessToken.split(' ')[1];
          url = url.concat(`?token=${accessToken}`);
        }

        if (socket) {
          socket.close();
          socket = null;
        }

        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(wsGetMessage({ message: data }));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed({ code: event.code }));
        };

        if (type === 'websocket/wsSendMessage') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
