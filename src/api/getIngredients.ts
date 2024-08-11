import { API_URL } from '../constants';
import { Ingredient } from '../types';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(`${API_URL}/ingredients`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const { data, success } = await res.json();

  if (!success) {
    throw new Error('No data');
  }

  return data;
};
