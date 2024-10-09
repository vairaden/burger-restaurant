import { API_URL } from '../constants';
import { refreshAccessToken } from '../services/auth/authSlice';
import checkResponse from './checkResponse';
import { refreshTokenRequest } from '../api/authApi/refreshTokenRequest';

interface ApiRequest {
  success: boolean;
}

const withAuthHeader = (opts?: RequestInit) => {
  if (opts === undefined) {
    return;
  }

  const optsWithAuth: RequestInit = {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: localStorage.getItem('accessToken') || '',
    },
  };

  return optsWithAuth;
};

const request = async <T>(
  url: string,
  opts?: RequestInit
): Promise<T & ApiRequest> => {
  let res = await fetch(API_URL + url, withAuthHeader(opts));

  if (res.status !== 401) {
    checkResponse(res);
    return await res.json();
  }

  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return await res.json();
  }
  const { accessToken, refreshToken } = await refreshTokenRequest({ token });
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);

  res = await fetch(API_URL + url, withAuthHeader(opts));

  checkResponse(res);
  return await res.json();
};

export default request;
