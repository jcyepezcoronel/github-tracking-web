import axios from "axios";
import { SERVER_DOMAIN_URL } from "../constants/environment";

export const clientApi = axios.create({
  baseURL: `${SERVER_DOMAIN_URL}/api`
})

clientApi.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('auth_token');
  if(token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req
})