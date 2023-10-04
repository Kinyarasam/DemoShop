#!/usr/bin/env node
import express from 'express';
import AppController from '../controller/appController';
import CustomerController from '../controller/customerController';

const router = express.Router();

router
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .get('/customers', CustomerController.getAll)
  .post('/customer', CustomerController.createNew)
  .get('/customer', CustomerController.getOne)
  .put('/customer/:id', CustomerController.updateOne)


export default router;
