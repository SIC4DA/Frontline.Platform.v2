import logger from "@/services/logger";

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    if (error && typeof error === "object" && Object.keys(error).length) {
      logger.error("Error in tryCatch", { error });
    }

    return { data: null, error: error as E };
  }
}
