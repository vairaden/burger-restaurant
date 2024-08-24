import request from '../../utils/request';

export interface LogoutRequestOpts {
  token: string;
}
export interface LogoutRequestRes {
  message: string;
}

export const logoutRequest = async (opts: LogoutRequestOpts) => {
  const res = await request<LogoutRequestRes>('/auth/logout', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Logout request failed');
  }

  return res;
};
