import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConstructorIngredient } from '../../types';
import { v4 as uuid } from 'uuid';

export interface ConstructorState {
  bun: ConstructorIngredient | null;
  ingredientsInBurger: ConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredientsInBurger: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        { payload }: PayloadAction<{ item: ConstructorIngredient }>
      ) => {
        if (payload.item.type === 'bun') {
          state.bun = payload.item;
        } else {
          state.ingredientsInBurger.push(payload.item);
        }
      },
      prepare(payload) {
        return {
          payload: {
            item: {
              ...payload.item,
              constructorId: uuid(),
            },
          },
        };
      },
    },
    deleteIngredient: (
      state,
      { payload }: PayloadAction<{ item: ConstructorIngredient }>
    ) => {
      const index = state.ingredientsInBurger.findIndex(
        (item) => item.constructorId === payload.item.constructorId
      );
      state.ingredientsInBurger.splice(index, 1);
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ itemId: string; targetId: string }>
    ) => {
      const { itemId, targetId } = payload;
      const itemIndex = state.ingredientsInBurger.findIndex(
        (item) => item.constructorId === itemId
      );
      const targetIndex = state.ingredientsInBurger.findIndex(
        (item) => item.constructorId === targetId
      );

      if (targetIndex < itemIndex) {
        const item = state.ingredientsInBurger.splice(itemIndex, 1)[0];
        state.ingredientsInBurger.splice(targetIndex, 0, item);
      } else {
        const item = state.ingredientsInBurger.splice(itemIndex, 1)[0];
        state.ingredientsInBurger.splice(targetIndex - 1, 0, item);
      }
    },
    moveIngredientToBottom: (
      state,
      { payload }: PayloadAction<{ itemId: string }>
    ) => {
      const { itemId } = payload;
      const itemIndex = state.ingredientsInBurger.findIndex(
        (item) => item.constructorId === itemId
      );

      const item = state.ingredientsInBurger.splice(itemIndex, 1)[0];
      state.ingredientsInBurger.splice(
        state.ingredientsInBurger.length,
        0,
        item
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredientsInBurger = [];
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
  moveIngredientToBottom,
} = constructorSlice.actions;

export default constructorSlice.reducer;
