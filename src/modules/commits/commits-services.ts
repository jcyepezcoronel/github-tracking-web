import { isAxiosError } from "axios";
import { TCommitRoot } from "./commits-types";
import { clientApi } from "../../shared/api/clientApi";

export const fetchCommitsList = async (page = 1, perPage = 10) => {
  let data: TCommitRoot[] | null = null, error: null | string = null;
  try {
    const res = await clientApi.get<TCommitRoot[]>(`/commits?page=${page}&perPage=${perPage}`);
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