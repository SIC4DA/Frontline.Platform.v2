import { type RedisClientType, createClient } from "redis";

import env from "@/config/env";
import logger from "@/services/logger";

declare global {
  // eslint-disable-next-line no-var
  var redisClient: RedisClientType | undefined;
}

const getRedisClient = (): RedisClientType => {
  if (!global.redisClient) {
    const client = createClient({
      url: env.REDIS_URL,
    });

    client.on("error", (error) => {
      logger.error("Redis Client Error", {
        service: "redis-server",
        error,
      });
    });

    global.redisClient = client as RedisClientType;
  }

  return global.redisClient;
};

export const redisClient = getRedisClient();

export const checkRedisConnection = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const result = await redisClient.ping();
    return result === "PONG";
  } catch (error) {
    logger.error("Redis connection check failed", {
      service: "redis-server",
      error,
    });
    return false;
  }
};

const connectToRedis = async () => {
  if (redisClient.isOpen) {
    return;
  }

  try {
    await redisClient.connect();
  } catch (error) {
    logger.error("Could not connect to Redis", {
      service: "redis-server",
      error,
    });
  }
};

connectToRedis();
