import type { FetcherParamsType } from "./types";

export const requestHandler = async <T>(fetcherParams: FetcherParamsType<T>) => {
  return await fetch(fetcherParams.endpoint, {
    method: fetcherParams.method,
    ...(fetcherParams.payload && {
      body: JSON.stringify(fetcherParams.payload),
    }),
    ...(fetcherParams.requestOptions && fetcherParams.requestOptions),
  }).then((res) => res.json());
};
