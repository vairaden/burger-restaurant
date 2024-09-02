import request from '../../utils/request';

export interface RegisterRequestOpts {
  email: string;
  password: string;
  name: string;
}

export interface RegisterRequestRes {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const registerRequest = async (opts: RegisterRequestOpts) => {
  const res = await request<RegisterRequestRes>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Register request failed');
  }

  return res;
};
