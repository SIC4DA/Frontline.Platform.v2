import { ApiError } from "@api/error/api.error";
import ElysiaApp from "elysia";
import { ErrorResponse, SuccessResponse } from "../schemas/response";

const IGNORE_PATHS = ["/api/docs", "/api/docs/json", "/api/auth/reference"];

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

export const useSuccessResponseMiddleware = (app: ElysiaApp) => {
  return app.onAfterHandle(async (context): Promise<SuccessResponse | void> => {
    if (IGNORE_PATHS.includes(new URL(context.request.url).pathname)) return;

    const path = context.request.url;
    const message = "success";
    let response = context.response;
    const timeStamp = new Date().toISOString();
    const status = context.set.status ?? 200;

    try {
      if (response instanceof Promise) {
        const resolvedResponse = await response;
        const data = await resolvedResponse.json();

        if (!resolvedResponse.ok) {
          throw new ApiError(
            data.message || resolvedResponse.statusText || "Invalid response",
            data.code || resolvedResponse.statusText,
            resolvedResponse.status,
          );
        }

        response = data;
      }

      return {
        status,
        message,
        data: response,
        path,
        timeStamp,
      };
    } catch {
      throw new ApiError("Invalid response", "INVALID_RESPONSE", 500);
    }
  });
};

export const useErrorMiddleware = (app: ElysiaApp) => {
  return app.onError(
    async ({ request, error, set, code }): Promise<ErrorResponse> => {
      const path = request.url;
      const message =
        "message" in error
          ? isJsonString(error.message)
            ? JSON.parse(error.message)
            : error.message
          : error.toString();
      const data = null;
      const timeStamp = new Date().toISOString();
      const status =
        typeof set.status === "number"
          ? set.status
          : "status" in error
            ? error.status
            : 500;

      console.error(
        `\x1b[31m${new Date().toLocaleString()}\x1b[0m \x1b[31m${message}\x1b[0m`,
      );

      return {
        status,
        message,
        data,
        code: code.toString(),
        path,
        timeStamp,
      };
    },
  );
};
