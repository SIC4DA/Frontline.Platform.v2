import { ErrorHandler, ValidationError } from "elysia";

type ErrorHandlerParams = Parameters<ErrorHandler>[0];

type ErrorResponse = {
  message: string;
  data: null;
  errors: unknown[];
};

const handleErrors = (
  error: ErrorHandlerParams["error"],
  code: number | string,
): ErrorResponse => {
  if (error instanceof ValidationError) {
    const errors = error.all.map((e) =>
      typeof e.summary === "string"
        ? {
            message: e.message,
            value: e.value,
            path: e.path,
            summary: e.summary,
          }
        : e,
    );

    return {
      message:
        typeof errors[0].summary === "string"
          ? errors[0].summary
          : error.message,
      data: null,
      errors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.toString(),
      data: null,
      errors: [
        {
          message: error.message,
          code: code || "UNKNOWN",
          cause: error.cause,
          stack: error.stack,
        },
      ],
    };
  }

  if (!("response" in error) && "message" in error)
    return {
      message: error.toString() || "Unknown error",
      data: null,
      errors: [
        {
          message: error?.message || "Unknown error",
          code: "UNKNOWN",
          cause: error.toString(),
        },
      ],
    };

  if (typeof error.response === "object") {
    return error.response;
  }

  if (typeof error.response === "string") {
    return {
      message: error.toString(),
      data: null,
      errors: [
        {
          message: error.response,
          code: "UNKNOWN",
        },
      ],
    };
  }

  return {
    message: error.toString() || "Unknown error",
    data: null,
    errors: [error],
  };
};

export const errorHandler = ({ error, set, code }: ErrorHandlerParams) => {
  const errorResponse = handleErrors(error, code);
  console.error(
    `\x1b[31m${new Date().toLocaleString()}\x1b[0m \x1b[31m${errorResponse.message}\x1b[0m`,
  );

  set.status =
    typeof code === "number" ? code : code === "VALIDATION" ? 400 : 500;

  return errorResponse;
};
