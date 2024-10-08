import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderDetails, OrderInfo } from '../../types';
import { clearIngredients } from '../ingredients/ingredientsSlice';
import { clearConstructor } from '../burgerConstructor/burgerConstructorSlice';
import { createOrderRequest } from '../../api/orderApi';

export interface OrdersState {
  selectedOrder: OrderInfo | null;
  orderDetails: OrderDetails | null;
  loading: boolean;
  error: boolean;
}

export const ordersInitialState: OrdersState = {
  selectedOrder: null,
  orderDetails: null,
  loading: false,
  error: false,
};

export const createOrder = createAsyncThunk<
  OrderInfo,
  { ingredientIds: string[] }
>('orders/createOrder', async ({ ingredientIds }, thunkAPI) => {
  const order = await createOrderRequest({ ingredients: ingredientIds });

  thunkAPI.dispatch(clearIngredients());
  thunkAPI.dispatch(clearConstructor());

  return order;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
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
      .addCase(createOrder.rejected, () => {
        return {
          ...ordersInitialState,
          error: true,
        };
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;
