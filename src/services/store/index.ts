import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { websocketMiddleware } from './middleware/websocketMiddleware';
import orderHistoryActions from '../orderHistory/orderHistoryActions';
import orderFeedActions from '../orderFeed/orderFeedActions';
import { ingredientsSlice } from '../ingredients/ingredientsSlice';
import { ordersSlice } from '../orders/ordersSlice';
import { authSlice, refreshAccessToken } from '../auth/authSlice';
import { passwordSlice } from '../password/passwordSlice';
import { orderFeedSlice } from '../orderFeed/orderFeedSlice';
import { orderHistorySlice } from '../orderHistory/orderHistorySlice';
import { burgerConstructorSlice } from '../burgerConstructor/burgerConstructorSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  ordersSlice,
  authSlice,
  passwordSlice,
  orderFeedSlice,
  orderHistorySlice,
);

const orderFeedMiddleware = websocketMiddleware({
  connect: orderFeedActions.wsConnect,
  disconnect: orderFeedActions.wsDisconnect,
  onClose: orderFeedActions.wsConnectionClosed,
  onError: orderFeedActions.wsConnectionError,
  onMessage: orderFeedActions.wsGetMessage,
  sendMessage: orderFeedActions.wsSendMessage,
  onOpen: orderFeedActions.wsConnectionSuccess,
  onConnecting: orderFeedActions.wsConnectionStart,
  refreshAccessToken,
});

const orderHistoryMiddleware = websocketMiddleware(
  {
    connect: orderHistoryActions.wsConnect,
    disconnect: orderHistoryActions.wsDisconnect,
    onClose: orderHistoryActions.wsConnectionClosed,
    onError: orderHistoryActions.wsConnectionError,
    onMessage: orderHistoryActions.wsGetMessage,
    sendMessage: orderHistoryActions.wsSendMessage,
    onOpen: orderHistoryActions.wsConnectionSuccess,
    onConnecting: orderHistoryActions.wsConnectionStart,
    refreshAccessToken,
  },
  true
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderFeedMiddleware, orderHistoryMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
