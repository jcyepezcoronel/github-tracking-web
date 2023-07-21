import { isAxiosError } from "axios";
import { clientApi } from "../../shared/api/clientApi";
import { TRepo } from "./repos-type";
import { TCommitRoot } from "../commits/commits-types";

export const fetchReposList = async (page = 1, perPage = 10) => {
  let data: TRepo[] | null = null, error: null | string = null;
  try {
    const res = await clientApi.get<TRepo[]>(`/repos?page=${page}&perPage=${perPage}`);
    data = res.data
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error = err.response.data.message as string
    }
  }
  return { data, error };
}

export const fetchRepo = async (fullName: string) => {
  let data: TRepo | null = null, error: null | string = null;
  try {
    const res = await clientApi.get<TRepo>(`/repos/${fullName}`);
    data = res.data
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error = err.response.data.message as string
    }
  }
  return { data, error };

}
export const fetchRepoCommitsList = async (fullName: string, page = 1, perPage = 10) => {
  let data: TCommitRoot[] | null = null, error: null | string = null;
  try {
    const res = await clientApi.get<TCommitRoot[]>(`/repos/${fullName}/commits?page=${page}&perPage=${perPage}`);
    data = res.data
  } catch(err) {
    error = 'unexpected error';
    if(isAxiosError(err) && err.response) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error = err.response.data.message as string
    }
  }
  return { data, error };
}