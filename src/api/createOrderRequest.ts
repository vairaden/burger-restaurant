import { API_URL } from '../constants';
import { OrderInfo } from '../types';

export const createOrderRequest = async (
  ingredients: string[]
): Promise<OrderInfo> => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const { name, order, success } = await res.json();

  if (!success) {
    throw new Error('No data');
  }

  return { name, order };
};
