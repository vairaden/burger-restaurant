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

export interface OrderList {
  "success": true,
  "orders": [
    {
      "ingredients": [
        "60d3463f7034a000269f45e7",
        "60d3463f7034a000269f45e9",
        "60d3463f7034a000269f45e8",
        "60d3463f7034a000269f45ea"
      ],
      "_id": "",
      "status": "done",
      "number": 0,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }
  ],
  "total": 1,
  "totalToday": 1
}

export interface User {
  email: string;
  name: string;
}

export interface WebsocketConfig {
  url: string;
}
