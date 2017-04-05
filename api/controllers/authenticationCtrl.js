import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/env';
import passport from 'passport';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';
import passportConfig from '../../config/passport'; // eslint-disable-line
import { waterfall } from 'async';
import bcrypt from 'bcrypt-nodejs';
import nodemailer from 'nodemailer';

/**
 * Create JWT token with user information and secret key
 * @param user
 * @param setExpire
 * @returns {object}
 */
function generateToken(user, setExpire) {
  var jwtConfig = setExpire ? { expiresIn: '24h'} : {};
  return 'JWT ' + jwt.sign(user, config.secret, jwtConfig);
}

/**
 * Creates a user object that goes into thw JWT token
 * @param user
 * @returns {object}
 */
function setUserInfo(user) {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
}

/**
 * Uses passport local authentication on login request and sends response back
 * @param req
 * @param res
 * @param next
 */
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    if (!user) return res.json(403, info);

    let userInfo = setUserInfo(user);

    res.status(200).json({
      token: generateToken(userInfo, true),
      user: userInfo
    });

  })(req, res, next);
};

/**
 * Creates new user if there are no other users with the same email
 * @param req
 * @param res
 * @param next
 */
exports.signUp = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) return errorHandler(ERROR_TYPES.USER.SIGN_UP.NO_EMAIL, res);

  if (!password) return errorHandler(ERROR_TYPES.USER.SIGN_UP.NO_PASSWORD, res);

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) return errorHandler(ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN, res);

    let user = new User({
      email: email,
      password: password
    });

    user.save(function(err, user) {
      if (err) return next(err);

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: generateToken(userInfo, true),
        user: userInfo
      });
    });
  });
};

exports.resetPassword = function (req, res, next) {
  const email = req.body.email;

  if (!email) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NO_EMAIL, res);

  waterfall([
    function(done) {
      bcrypt.genSalt(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return next(err); }

        if (!user) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NON_EXISTING_EMAIL, res);

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'quincygod',
          pass: 'Kikiriki1'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        req.headers.origin + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.sendStatus(200);
        done(err, 'done');
      });
    }
  ], function(err, message) {
    console.log(err, message);
    if (err) return next(err);
  });
};

/**
 * Checks if token is present in request
 * @param req
 * @param res
 */
exports.authenticate = function (req, res) {
  var token = req.headers.authorization.split(' ')[1];

  if (!token) return errorHandler(ERROR_TYPES.USER.FAILED_AUTHENTICATION, res);

  jwt.verify(token, config.secret, function (err, user) {
    if (err) return errorHandler(ERROR_TYPES.USER.INVALID_TOKEN, res, err);

    let userInfo = setUserInfo(user);

    res.status(200).json({
      token: generateToken(userInfo, true),
      user: userInfo
    });
  });
};

/**
 * Authentication middleware that checks if token is present in request
 * @param req
 * @param res
 * @param next
 */
exports.authCheckMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) return errorHandler(ERROR_TYPES.USER.FAILED_AUTHENTICATION, res);

  return jwt.verify(token, config.secret, (err) => {
    if (err) return errorHandler(ERROR_TYPES.USER.INVALID_TOKEN, res, err);

    return next();
  });
};
