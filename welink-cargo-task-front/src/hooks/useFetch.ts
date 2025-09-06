import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useAppStore } from "@/store/store";

type FetchOptions<T> = {
  queryKey: string[];
  url: string;
  auth?: boolean;
  requestOptions?:  RequestInit & { auth?: boolean };
  options?: UseQueryOptions<T>;
  enabled?: boolean;
};

export function useFetch<T>({
  queryKey,
  url,
  requestOptions,
  options,
  enabled = true,
}: FetchOptions<T>) {
 
  return useQuery<T>({
    queryKey,
    queryFn: () => fetcher<T>(url, requestOptions),
    enabled,
    
    ...options,
  });
}