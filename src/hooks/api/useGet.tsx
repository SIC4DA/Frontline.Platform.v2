import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { UseGet } from "./types";
import { requestHandler } from "./utils";

export const useGet = <T,>({ endpoint, queryKey, queryOptions, requestOptions }: UseGet<T>) => {
  const results = useQuery<T, Error>({
    ...queryOptions,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: () => requestHandler<T>({ endpoint, method: "GET", requestOptions }),
  });

  return results as UseQueryResult<T, Error>;
};
