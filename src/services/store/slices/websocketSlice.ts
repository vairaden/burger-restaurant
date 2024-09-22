import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { WebsocketConfig } from '../../../constants';
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

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsConnectionStart: (
      state,
      action: PayloadAction<{ config: WebsocketConfig }>
    ) => {
      state.error = false;
      state.wsConnected = false;
      state.loading = true;
    },
    wsConnectionSuccess: (state) => {
      state.error = false;
      state.wsConnected = true;
      state.loading = false;
    },
    wsConnectionError: (state) => {
      state.error = true;
      state.wsConnected = false;
      state.loading = false;
    },
    wsConnectionClosed: (state, action: PayloadAction<{ code: number }>) => {
      state.loading = false;
      state.error = false;
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: PayloadAction<{ message: string }>) => {
      const { message } = action.payload;
      const data = JSON.parse(message);

      state.error = false;
      state.messages = [data, ...state.messages.slice(0, 9)];
    },
    wsSendMessage: () => {},
  },
});

export const {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetMessage,
  wsSendMessage,
} = websocketSlice.actions;

export type WebsocketActions = ReturnType<
  (typeof websocketSlice.actions)[keyof typeof websocketSlice.actions]
>;

export default websocketSlice.reducer;
