import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { TRefreshAccessToken } from '../slices/authSlice';

export type TWsActionTypes<S, R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  refreshAccessToken: TRefreshAccessToken;
};

const RECONNECT_PERIOD = 3000;

export const websocketMiddleware = <S, R>(
  wsActions: TWsActionTypes<S, R>,
  withAuth: boolean = false
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      refreshAccessToken,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch, getState } = store;

      if (connect.match(action)) {
        url = action.payload;
        if (withAuth) {
          url += `?token=${getState().auth.accessToken.replace('Bearer ', '')}`;
        }

        socket = new WebSocket(url);
        onConnecting && dispatch(onConnecting());
        isConnected = true;

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Error'));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (e) => {
          const { data } = e;

          try {
            const parsedData = JSON.parse(data);

            if (withAuth && parsedData.message === 'Invalid or missing token') {
              // @ts-ignore
              dispatch(refreshAccessToken())
                .then((refreshData: any) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((err: any) => {
                  dispatch(onError((err as Error).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          dispatch(onError((err as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
