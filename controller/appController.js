#!/usr/bin/env node

import dbClient from "../config/db";
import redisClient from "../config/redis";
import Customer from "../models/customer";

class AppController {
  static getStatus(req, res) {

    return res.status(200).json({
      db: dbClient.isAlive(),
      redis: redisClient.isAlive()
    });
  }

  static async getStats(req, res) {
    const noUsers = 0;
    const noProducts = 0;
    const noOrders = 0;
    const noCustomers = await Customer.countDocuments();

    return res.status(200).json({
      Users: noUsers,
      Customers: noCustomers,
      Orders: noOrders,
      Products: noProducts,
    });
  }
}

export default AppController;
