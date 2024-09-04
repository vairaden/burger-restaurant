import { User } from '../../types';
import request from '../../utils/request';

export interface UpdateUserRequestOpts {
  name: string;
  password: string;
  email: string;
}

export interface UpdateUserRequestRes {
  user: User;
}

export const updateUserRequest = async (opts: UpdateUserRequestOpts) => {
  const res = await request<UpdateUserRequestRes>('/auth/user', {
    method: 'PATCH',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('User data update failed');
  }

  return res;
};
