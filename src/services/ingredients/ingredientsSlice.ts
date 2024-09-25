import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/getIngredients';
import { Ingredient, IngredientListItem } from '../../types';

export interface IngredientsState {
  ingredients: Record<string, IngredientListItem>;
  selectedBunId: string | null;
  selectedIngredient: Ingredient | null;
  loading: boolean;
  error: boolean;
}

const initialState: IngredientsState = {
  ingredients: {},
  selectedBunId: null,
  selectedIngredient: null,
  loading: false,
  error: false,
};

export const fetchIngredientsList = createAsyncThunk(
  'ingredients/fetchIngredientsList',
  getIngredients
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
          state.ingredients[state.selectedBunId].numberInConstructor = 0;
        }
        state.selectedBunId = payload.item._id;

        state.ingredients[payload.item._id].numberInConstructor = 2;
      } else {
        state.ingredients[payload.item._id].numberInConstructor++;
      }
    },
    decreaseIngredientNumber: (
      state,
      { payload }: PayloadAction<{ item: Ingredient }>
    ) => {
      if (payload.item.type !== 'bun') {
        state.ingredients[payload.item._id].numberInConstructor--;
      }
    },
    setSelectedIngredient: (
      state,
      { payload }: PayloadAction<{ item: Ingredient | null }>
    ) => {
      state.selectedIngredient = payload.item;
    },
    clearIngredients: (state) => {
      for (const key of Object.keys(state.ingredients)) {
        state.ingredients[key].numberInConstructor = 0;
      }
      state.selectedBunId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsList.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchIngredientsList.fulfilled, (state, action) => {
        const ingredients: Record<string, IngredientListItem> = {};
        action.payload.forEach(
          (item) =>
            (ingredients[item._id] = {
              ...item,
              numberInConstructor: 0,
            })
        );

        state.ingredients = ingredients;

        state.loading = false;
      })
      .addCase(fetchIngredientsList.rejected, () => {
        return {
          ...initialState,
          error: true,
        };
      });
  },
});

export const {
  increaseIngredientNumber,
  decreaseIngredientNumber,
  setSelectedIngredient,
  clearIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice;
