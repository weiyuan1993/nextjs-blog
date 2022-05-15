import useSWR from "swr";
import fetcher from "../lib/fetcher";

export function useNewsApi(params) {
  const { searchText = "", page = 1 } = params;
  const api = `/api/news/everything?q=${searchText}&page=${page}`;
  const { data, error } = useSWR(searchText ? api : null, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
