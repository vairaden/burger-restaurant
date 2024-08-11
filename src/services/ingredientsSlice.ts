import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../api/getIngredients';
import { Ingredient, IngredientListItem } from '../types';

export interface IngredientsState {
  ingredients: IngredientListItem[];
  selectedBunId: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  selectedBunId: null,
};

export const fetchIngredientsList = createAsyncThunk(
  'ingredients/fetchIngredientsList',
  async () => {
    const ingredients = await getIngredients();
    return ingredients;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    increaseIngredientNumber: (
      state,
      { payload }: PayloadAction<{ item: Ingredient }>
    ) => {
      if (payload.item.type === 'bun') {
        if (state.selectedBunId) {
          state.ingredients[
            state.ingredients.findIndex(
              (item) => item._id === state.selectedBunId
            )
          ].numberInConstructor = 0;
        }
        state.selectedBunId = payload.item._id;

        state.ingredients[
          state.ingredients.findIndex((item) => item._id === payload.item._id)
        ].numberInConstructor = 2;
      } else {
        state.ingredients[
          state.ingredients.findIndex((item) => item._id === payload.item._id)
        ].numberInConstructor++;
      }
    },
    decreaseIngredientNumber: (
      state,
      { payload }: PayloadAction<{ item: Ingredient }>
    ) => {
      if (payload.item.type !== 'bun') {
        state.ingredients[
          state.ingredients.findIndex((item) => item._id === payload.item._id)
        ].numberInConstructor--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsList.pending, (state, action) => {})
      .addCase(fetchIngredientsList.fulfilled, (state, action) => {
        state.ingredients = action.payload.map((item) => ({
          ...item,
          numberInConstructor: 0,
        }));
      })
      .addCase(fetchIngredientsList.rejected, (state, action) => {});
  },
});

export const { increaseIngredientNumber, decreaseIngredientNumber } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
