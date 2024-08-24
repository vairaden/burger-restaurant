import request from '../../utils/request';

export interface LoginRequestOpts {
  email: string;
  password: string;
}

export interface LoginRequestRes {
  accessToken: boolean;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

export const loginRequest = async (
  opts: LoginRequestOpts
): Promise<LoginRequestRes> => {
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
