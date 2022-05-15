import useSWR from "swr";
import { NEWS_API_KEY, NEWS_API_DOMAIN } from "../constants";
import fetcher from "../lib/fetcher";

export function useNewsApi(params) {
  const { searchText = "", page = 1 } = params;
  const api = `${NEWS_API_DOMAIN}/everything?q=${searchText}&page=${page}&apiKey=${NEWS_API_KEY}`;
  const { data, error } = useSWR(searchText ? api : null, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
