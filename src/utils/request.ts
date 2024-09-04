import { API_URL } from '../constants';
import { store } from '../services/store';
import { refreshAccessToken } from '../services/store/authSlice';
import checkResponse from './checkResponse';

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
      Authorization: store.getState().authSlice.accessToken,
    },
  };

  return optsWithAuth;
};

const request = async <T>(
  url: string,
  opts?: RequestInit
): Promise<T & ApiRequest> => {
  let res = await fetch(API_URL + url, withAuthHeader(opts));

  if (res.status === 401) {
    await store.dispatch(refreshAccessToken());
    res = await fetch(API_URL + url, withAuthHeader(opts));
  }

  checkResponse(res);

  return await res.json();
};

export default request;
