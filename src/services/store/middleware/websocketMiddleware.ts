import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '..';
import { WebsocketActions, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage } from '../slices/websocketSlice';


export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: WebsocketActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === 'websocket/wsConnectionStart') {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess({ event }));
        };

        socket.onerror = event => {
          dispatch(wsConnectionError({ event }));
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch(wsGetMessage({ data }));
        };

        socket.onclose = event => {
          dispatch(wsConnectionClosed({event}));
        };

        if (type === 'websocket/wsSendMessage') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};