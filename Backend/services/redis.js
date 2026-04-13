const { createClient } = require("redis");

if (!process.env.REDIS_URL) {
  throw new Error("missing REDIS_URL");
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.log("Failed to connect to Redis", err);
  }
};

// ✅ Export BOTH the function and the client
module.exports = { connectRedis, redisClient };