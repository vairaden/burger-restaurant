import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { WebsocketConfigTypes } from '../../../constants';

interface IMessage {
  type: string;
  data: string;
}

interface InitialState {
  wsConnected: boolean;
  messages: IMessage[];
  error: Event | null;
}

const initialState: InitialState = {
  wsConnected: false,
  messages: [],
  error: null,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsConnectionStart: (
      state,
      action: PayloadAction<{ config: WebsocketConfigTypes }>
    ) => {},
    wsConnectionSuccess: (state, action: PayloadAction<{ event: Event }>) => {
      state.error = null;
      state.wsConnected = true;
    },
    wsConnectionError: (state, action: PayloadAction<{ event: Event }>) => {},
    wsConnectionClosed: (
      state,
      action: PayloadAction<{ event: CloseEvent }>
    ) => {
      const { event } = action.payload;
      state.error = null;
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: PayloadAction<{ data: string }>) => {
      state.error = null;
      state.messages = [
        ...state.messages,
        { type: '', data: action.payload.data },
      ];
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
