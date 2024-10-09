import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OrderDetails } from '../../types';

interface IMessage {
  success: boolean;
  orders: OrderDetails[];
  total: number;
  totalToday: number;
}

interface InitialState {
  wsConnected: boolean;
  data: IMessage | null;
  error: string | null;
  loading: boolean;
}

export const orderFeedInitialState: InitialState = {
  wsConnected: false,
  data: null,
  loading: false,
  error: null,
};

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState: orderFeedInitialState,
  reducers: {
    wsConnectionStart: (state) => {
      state.error = null;
      state.wsConnected = false;
      state.loading = true;
    },
    wsConnectionSuccess: (state) => {
      state.error = null;
      state.wsConnected = true;
      state.loading = false;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.wsConnected = false;
      state.loading = false;
    },
    wsConnectionClosed: (state) => {
      state.loading = false;
      state.error = null;
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: PayloadAction<IMessage>) => {
      const data = action.payload;

      state.error = null;
      state.data = data;
    },
    wsSendMessage: () => {},
  },
});
