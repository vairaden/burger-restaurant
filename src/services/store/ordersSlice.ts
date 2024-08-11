import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createOrderRequest } from '../../api/createOrderRequest';
import { OrderInfo } from '../../types';

export interface OrdersState {
  selectedOrder: OrderInfo | null;
  loading: boolean;
  error: boolean;
}

const initialState: OrdersState = {
  selectedOrder: null,
  loading: false,
  error: false,
};

export const createOrder = createAsyncThunk<
  OrderInfo,
  { ingredientIds: string[] }
>('orders/createOrder', ({ ingredientIds }) => {
  const order = createOrderRequest(ingredientIds);
  return order;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state = initialState;
        state.error = true;
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
