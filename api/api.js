/* eslint no-console: 0 */
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { apiPort, database } from '../config/env';
import router from './router/router';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(logger('dev'));

require('../config/passport')(passport);

app.use(express.static('public'));
app.use(cookieParser('mySecretKey'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization, X-AUTHENTICATION");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Content-Type-Options", "nosniff");
  next();
});

mongoose.connect(database);

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Api listening on port ${apiPort}!`);
  }
});

router(app);
