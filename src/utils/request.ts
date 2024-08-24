import { API_URL } from '../constants';
import checkResponse from './checkResponse';

interface ApiRequest {
  success: boolean;
}

const request = async <T>(
  url: string,
  opts?: RequestInit
): Promise<T & ApiRequest> => {
  const res = await fetch(API_URL + url, opts).then(checkResponse);
  return await res.json();
};

export default request;
