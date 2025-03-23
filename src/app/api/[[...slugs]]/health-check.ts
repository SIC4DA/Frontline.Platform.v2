import env from "@/config/env";
import { checkRedisConnection } from "@/config/redis";
import { checkDatabaseConnection } from "@/core/db";
import Elysia from "elysia";

export const healthCheck = new Elysia({
  name: "health-check",
  tags: ["Health"],
}).get("/", async () => ({
  message: "Hello Elysia API",
  status: "healthy",
  apiVersion: "1.0.0",
  environment: env.NODE_ENV || "development",
  memory: {
    heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
  },
  cpu: {
    user: `${(process.cpuUsage().user / 1000000).toFixed(2)}%`,
    system: `${(process.cpuUsage().system / 1000000).toFixed(2)}%`,
  },
  uptime: `${process.uptime().toFixed(2)} sec`,
  platform: process.platform,
  runtime_version: process.version,
  database: await checkDatabaseConnection(),
  redis: await checkRedisConnection(),
}));
