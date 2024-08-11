import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createOrderRequest } from '../../api/createOrderRequest';
import { OrderInfo } from '../../types';

export interface OrdersState {
  selectedOrder: OrderInfo | null;
}

const initialState: OrdersState = {
  selectedOrder: null,
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
      .addCase(createOrder.pending, () => {})
      .addCase(createOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected, () => {});
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
