import { isAxiosError } from "axios";
import { clientApi } from "../../shared/api/clientApi";
import { TUser } from "./auth-types";

export const login = async (email: string, password: string) => {
  let error: string | null = null; 
  try {
    const {
      data: { access_token }
    } = await clientApi.post<{ access_token: string; }>('/auth/login', {
      email,
      password
    })
    sessionStorage.setItem('auth_token', access_token);
  } catch(err) {
    if(isAxiosError(err)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      error = err.response?.data.message || 'unexpected error';
    }
  }
  return { data: null, error } 
}

export const fetchUser = async () => {
  let data, error;
  try {
    const res = await clientApi.get<TUser>('/auth');
    data = res.data
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error = err.response.data.message as string
    }
  }
  return { data, error }
}

export const signUp = async (email: string, password: string) => {
  let data;
  let error: string | null = null; 
  try {
    const res = await clientApi.post<TUser>('/auth/sign-up', {
      email,
      password
    })
    data = res.data;
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      error = err.response?.data.message || 'unexpected error';
    }
  }
  return { data, error } 
}

export const createAccessToGithubByCode = async (code: string) => {
  let data: { ok: boolean } | null = null, error: string | null = null;
  try {
    const  res = await clientApi.post<{ ok: boolean; }>('/auth/github-callback', { code })
    data = res.data;
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      error = err.response?.data.message || 'unexpected error';
    }
  }
  return { data, error }
}