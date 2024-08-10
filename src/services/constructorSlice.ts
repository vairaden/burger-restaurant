import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../api/getIngredients';

export interface ConstructorState {
  bun: Ingredient | null;
  ingredientsInBurger: Ingredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredientsInBurger: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
  },
});

export const { } = constructorSlice.actions;

export default constructorSlice.reducer;
