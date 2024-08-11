import { API_URL } from "../constants";
import checkResponse from "./checkResponse";

const request = async <T>(url: string, opts?: RequestInit): Promise<T & {success: boolean}> => {
    const res = await fetch(API_URL + url, opts).then(checkResponse);
    return await res.json();
}

export default request;