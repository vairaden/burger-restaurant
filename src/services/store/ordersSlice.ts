import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderInfo } from '../../types';
import { clearIngredients } from './ingredientsSlice';
import { clearConstructor } from './constructorSlice';
import { createOrderRequest } from '../../api/orderApi';

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
>('orders/createOrder', async ({ ingredientIds }, thunkAPI) => {
  const order = await createOrderRequest({ingredients: ingredientIds});

  thunkAPI.dispatch(clearIngredients())
  thunkAPI.dispatch(clearConstructor());

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
        state.error = false;
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
