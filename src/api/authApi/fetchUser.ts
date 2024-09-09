import { User } from '../../types';
import request from '../../utils/request';

export interface FetchUserRequestRes {
  user: User;
}

export const fetchUserRequest = async () => {
  const res = await request<FetchUserRequestRes>('/auth/user', {
    method: 'GET',
  });

  if (!res.success) {
    throw new Error('User data fetch failed');
  }

  return res;
};
