import request from '../../utils/request';

export interface SendResetEmailRequestOpts {
  email: string;
}

export interface SendResetEmailRequestRes {
  message: string;
}

export const sendResetEmailRequest = async (opts: SendResetEmailRequestOpts) => {
  const res = await request<SendResetEmailRequestRes>('/password-reset', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.success) {
    throw new Error('Could not send email');
  }

  return res;
};
