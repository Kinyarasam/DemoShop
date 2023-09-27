#!/usr/bin/env node

import redis from 'redis';
import dotenv from 'dotenv';

/** Load the environment variables */
dotenv.config({ path: './config/config.env' });

class RedisClient {
  constructor() {
    this.host = process.env.REDIS_HOST;
    this.port = process.env.REDIS_PORT;

    this.client = redis.createClient({
      url: `redis://${this.host}:${this.port}`
    });

    /** Display the error to the Console incase of an error */
    this.client.on('error', (err) => {
      console.log(`Error connecting to the Redis Server: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

}

const redisClient = new RedisClient();

export default redisClient;