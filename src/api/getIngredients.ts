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
  const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
  const {data, success} = await res.json();

  if (!success) {
    throw new Error('Request failed');
  }

  return data;
}
