#!/usr/bin/env node
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes';

/* Load the environment variables */
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(express.json());
app.use('/api', router);

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  });
};

startServer();

export default app;
