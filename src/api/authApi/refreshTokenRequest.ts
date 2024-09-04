import request from '../../utils/request';

export interface RefreshTokenRequestRes {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenRequest = async () => {
  const res = await request<RefreshTokenRequestRes>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Refresh token request failed');
  }

  return res;
};
