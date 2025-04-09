import { QueryKey, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type FetcherMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type FetcherParamsType<T> = {
  method: FetcherMethods;
  endpoint: string;
  payload?: T;
  requestOptions?: Omit<RequestInit, "body" | "method">;
};

export type UseGet<T> = {
  endpoint: string;
  queryKey: QueryKey;
  queryOptions?: Omit<UseQueryOptions<T, Error, T>, "queryKey" | "queryFn">;
  requestOptions?: Omit<RequestInit, "body" | "method">;
};

export type UseAction<T, K> = {
  method: Exclude<FetcherMethods, "GET">;
  endpoint: string;
  mutationOptions?: Omit<UseMutationOptions<T, Error, K>, "mutationFn">;
  requestOptions?: Omit<RequestInit, "body" | "method">;
};
