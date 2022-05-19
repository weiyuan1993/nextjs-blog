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

export function useHeadlineApi(params) {
  const { category = "general", country = "tw" } = params;
  const api = `/api/news/headlines?category=${category}&country=${country}`;
  const { data, error } = useSWR(country ? api : null, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
