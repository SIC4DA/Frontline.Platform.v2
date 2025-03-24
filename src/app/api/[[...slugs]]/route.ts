import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { fileRouter } from "./apps/file";
import { ApiError } from "./error/api.error";
import { BadRequestError } from "./error/bad-request.error";
import { healthCheck } from "./health-check";
import {
  useErrorMiddleware,
  useSuccessResponseMiddleware,
} from "./middleware/response.middleware";

import env from "@/config/env";
import { UnauthorizedError } from "./error/unauthorized";

const app = new Elysia({
  name: "api",
  prefix: "/api",
  serve: { maxRequestBodySize: 1024 * 1024 * 10 },
})
  .error({ ApiError, BadRequestError, UnauthorizedError })
  .use(serverTiming())
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Frontline API",
          version: "1.0.0",
          description: "API documentation for Frontline",
        },
      },
    }),
  )
  .use(
    cors({
      origin: env.NEXT_BASE_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      maxAge: 86400, // 1 day
      allowedHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .use(useSuccessResponseMiddleware)
  .use(useErrorMiddleware)
  .use(healthCheck)
  .use(fileRouter);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;

export type App = typeof app;
