import { type RedisClientType, createClient } from "redis";

import env from "@/config/env";

export const redisClient: RedisClientType = createClient({
  url: env.REDIS_URL,
});

export const checkRedisConnection = async () => {
  const result = await redisClient.ping();
  return result === "PONG";
};

const connectToRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Could not connect to Redis", error);
    process.exit(1);
  }
};

connectToRedis();
