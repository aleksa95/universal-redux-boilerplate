/* eslint no-console: 0 */
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { apiPort, database } from '../config/env';
const router = require('./router/router');

const app = express();

app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect(database);

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Api listening on port ${apiPort}!`);
  }
});

router(app);
