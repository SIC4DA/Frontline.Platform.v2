import { type RedisClientType, createClient } from "redis";

import env from "@/config/env";
import logger from "@/services/logger";
import { tryCatch } from "@/utils/tryCatch";

export const redisClient: RedisClientType = createClient({
  url: env.REDIS_URL,
});

export const checkRedisConnection = async () => {
  const result = await redisClient.ping();
  return result === "PONG";
};

const connectToRedis = async () => {
  const { error } = await tryCatch(redisClient.connect());

  if (error) {
    logger.error("Could not connect to Redis", {
      service: "redis-server",
      error,
    });
  }
};

connectToRedis();
