import { OrderInfo } from '../../types';
import request from '../../utils/request';

export interface CreateOrderRequestOpts {
  ingredients: string[];
}

export const createOrderRequest = async (opts: CreateOrderRequestOpts) => {
  const res = await request<OrderInfo>('/orders', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Could not create order');
  }

  return res;
};
