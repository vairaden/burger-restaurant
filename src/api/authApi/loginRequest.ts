import { User } from '../../types';
import request from '../../utils/request';

export interface LoginRequestOpts {
  email: string;
  password: string;
}

export interface LoginRequestRes {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const loginRequest = async (opts: LoginRequestOpts) => {
  const res = await request<LoginRequestRes>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Login request failed');
  }

  return res;
};
