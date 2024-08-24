import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/getIngredients';
import { Ingredient } from '../../types';

export interface AuthState {
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
