import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { UseAction } from "./types";
import { requestHandler } from "./utils";

export const useAction = <T, K extends T | undefined>({
  method,
  endpoint,
  mutationOptions,
  requestOptions,
}: UseAction<T, K>) => {
  const result = useMutation<T, Error, K>({
    ...mutationOptions,
    mutationFn: (payload?: K) =>
      requestHandler<T>({
        method,
        endpoint,
        payload,
        requestOptions,
      }) as Promise<T>,
  });

  return result as UseMutationResult<T, Error, unknown>;
};
