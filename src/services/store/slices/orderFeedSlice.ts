import { createAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OrderDetails } from '../../../types';

interface IMessage {
  success: boolean;
  orders: OrderDetails[];
  total: number;
  totalToday: number;
}

interface InitialState {
  wsConnected: boolean;
  messages: IMessage[];
  error: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  wsConnected: false,
  messages: [],
  loading: true,
  error: false,
};

const wsConnect = createAction<string>('orderFeed/connect');
const wsDisconnect = createAction('orderFeed/disconnect');

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    wsConnectionStart: (state) => {
      state.error = false;
      state.wsConnected = true;
      state.loading = false;
    },
    wsConnectionSuccess: (state) => {
      state.error = false;
      state.wsConnected = true;
      state.loading = false;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.wsConnected = false;
      state.loading = false;
    },
    wsConnectionClosed: (state) => {
      state.loading = false;
      state.error = false;
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: PayloadAction<IMessage>) => {
      const data = action.payload;

      state.error = false;
      state.messages = [data, ...state.messages.slice(0, 10)];
    },
    wsSendMessage: () => {},
  },
});

export const orderFeedActions = {
  wsConnect,
  wsDisconnect,
  ...orderFeedSlice.actions,
};

export type WebsocketActions = ReturnType<
  (typeof orderFeedSlice.actions)[keyof typeof orderFeedSlice.actions]
>;

export default orderFeedSlice;
