import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';
import { TRefreshAccessToken } from '../../auth/authSlice';

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
  return (store) => (next) => (action) => {
    const dispatch = store.dispatch as AppDispatch;
    const getState = store.getState;

    if (connect.match(action)) {
      url = action.payload;
      if (withAuth) {
        const urlWithToken = `${url}?token=${getState().auth.accessToken.replace(
          'Bearer ',
          ''
        )}`;
        socket = new WebSocket(urlWithToken);
      } else {
        socket = new WebSocket(url);
      }

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
