import { OrderInfo } from '../types';
import request from '../utils/request';

export const createOrderRequest = async (
  ingredients: string[]
): Promise<OrderInfo> => {
  const { name, order, success } = await request<OrderInfo>('/orders',  {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!success) {
    throw new Error('Could not create order');
  }

  return { name, order };
};
