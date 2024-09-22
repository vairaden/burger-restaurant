import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../../../api/getIngredients';
import { Ingredient, IngredientListItem } from '../../../types';

interface IMessage {
  type: string;
  data: string;
}

interface InitialState {
  wsConnected: boolean;
  messages: IMessage[];
  error?: Event;
}

const initialState: InitialState = {
  wsConnected: false,
  messages: [],
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsConnectionStart: () => {},
    wsConnectionSuccess: (state, action: PayloadAction<{event: Event}>) => {},
    wsConnectionError: (state, action: PayloadAction<{event: Event}>) => {},
    wsConnectionClosed: (state, action: PayloadAction<{event: CloseEvent}>) => {
      const {event} =action.payload;
    },
    wsGetMessage: (state, action: PayloadAction<{data: string}>) => {},
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

export type WebsocketActions = ReturnType<typeof websocketSlice.actions[keyof typeof websocketSlice.actions]>

export default websocketSlice.reducer;
