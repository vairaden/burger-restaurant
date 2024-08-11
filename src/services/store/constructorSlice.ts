import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';

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
    addIngredient: (
      state,
      { payload }: PayloadAction<{ item: Ingredient }>
    ) => {
      if (payload.item.type === 'bun') {
        state.bun = payload.item;
      } else {
        state.ingredientsInBurger.push(payload.item);
      }
    },
    deleteIngredient: (
      state,
      { payload }: PayloadAction<{ index: number }>
    ) => {
      state.ingredientsInBurger.splice(payload.index, 1);
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ itemIndex: number; targetIndex: number }>
    ) => {
      const { itemIndex, targetIndex } = payload;
      if (targetIndex < itemIndex) {
        const item = state.ingredientsInBurger.splice(itemIndex, 1)[0];
        state.ingredientsInBurger.splice(targetIndex, 0, item);
      } else {
        const item = state.ingredientsInBurger.splice(itemIndex, 1)[0];
        state.ingredientsInBurger.splice(targetIndex - 1, 0, item);
      }
    },
  },
});

export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;

export default constructorSlice.reducer;
