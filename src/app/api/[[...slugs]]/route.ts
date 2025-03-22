import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { betterAuthMiddleware } from "./auth";
import { fileRouter } from "./file";
import { healthCheck } from "./health-check";

import env from "@/config/env";
import { errorHandler } from "@/middlewares/error-handler";

export const app = new Elysia({
  name: "api",
  prefix: "/api",
  serve: { maxRequestBodySize: 1024 * 1024 * 10 },
})
  .use(serverTiming())
  .use(
    swagger({
      path: "/docs",
      provider: "scalar",
      excludeTags: ["default"],
      documentation: {
        info: {
          title: "Elysia API",
          version: "1.0.0",
          description: "Elysia API",
        },
      },
    }),
  )
  .use(
    cors({
      origin: env.NEXT_BASE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .onError(errorHandler)
  .use(healthCheck)
  .use(betterAuthMiddleware)
  .use(fileRouter);

export const GET = app.handle;
export const POST = app.handle;
