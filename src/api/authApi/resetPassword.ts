import request from '../../utils/request';

export interface ResetPasswordRequestOpts {
  password: string;
  token: string;
}

export interface ResetPasswordRequestRes {
  message: string;
}

export const resetPasswordRequest = async (opts: ResetPasswordRequestOpts) => {
  const res = await request<ResetPasswordRequestRes>('/password-reset/reset', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Password reset failed');
  }

  return res;
};
