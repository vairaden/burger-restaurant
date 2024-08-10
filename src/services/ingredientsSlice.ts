import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {getIngredients, Ingredient} from "../api/getIngredients";

export interface IngredientsState {
  ingredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

export const fetchIngredientsList = createAsyncThunk(
  "ingredients/fetchIngredientsList",
  async () => {
    const ingredients = await getIngredients();
    return ingredients;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsList.pending, (state, action) => {})
      .addCase(fetchIngredientsList.fulfilled, (state, action) => {
        return {ingredients: action.payload}
      })
      .addCase(fetchIngredientsList.rejected, (state, action) => {});
  },
});

export const { } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
