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

export interface IngredientListItem extends Ingredient {
  numberInConstructor: number;
}

export interface ConstructorIngredient extends Ingredient {
  constructorId: string;
}

export interface OrderInfo {
  name: string;
  order: {
    number: number;
  };
}

export const enum OrderStatus {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
}

export interface OrderDetails {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  name: string;
}

export interface WebsocketConfigType {
  url: string;
  needAuth: boolean;
}
