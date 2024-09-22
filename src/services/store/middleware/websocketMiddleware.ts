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
        const { url } = websocketConfigs[config];
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess({ event }));
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError({ event }));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(wsGetMessage({ data }));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed({ event }));
        };

        if (type === 'websocket/wsSendMessage') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
