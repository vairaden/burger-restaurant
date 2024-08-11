const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res;
}

export default checkResponse