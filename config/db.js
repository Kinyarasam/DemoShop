#!/usr/bin/env node
import mongoose from "mongoose";
import dotenv from 'dotenv';

/** Load the environment variables */
dotenv.config({path: './config/config.env'})


class DBClient {
  constructor() {
    this.isConnected = false;
    this.host = process.env.MONGO_DB_HOST;
    this.port = process.env.MONGO_DB_PORT;
    this.database = process.env.MONGO_DB_DATABASE ;
    this.url = process.env.MONGO_URI

    this.client = mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
      this.isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.log('Database connection error: ', err);
      this.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from the database');
      this.isConnected = false;
    });
  }

  async host() {
    const host = (await this.client).connection.host;
    return host
  }

  isAlive() {
    return this.isConnected;
  }
}

const dbClient = new DBClient();

export default dbClient;
