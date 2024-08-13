import { Ingredient } from '../types';
import request from '../utils/request';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const { data, success }  = await request<{data: Ingredient[]}>('/ingredients');

  if (!success) {
    throw new Error('No ingredient data');
  }

  return data;
};
