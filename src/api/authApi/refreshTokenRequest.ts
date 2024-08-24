import request from '../../utils/request';

export interface RefreshTokenRequestOpts {
  token: string;
}

export interface RefreshTokenRequestRes {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenRequest = async (opts: RefreshTokenRequestOpts) => {
  const res = await request<RefreshTokenRequestRes>('/auth/token', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Refresh token request failed');
  }

  return res;
};
