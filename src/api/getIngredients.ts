import {API_URL} from "../constants";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(`${API_URL}/api/ingredients`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const {data, success} = await res.json();

  if (!success) {
    throw new Error('No data');
  }

  return data;
}
