import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/env';
import passport from 'passport';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';
import { waterfall } from 'async';
import bcrypt from 'bcrypt-nodejs';
import nodemailer from 'nodemailer';
import passportConfig from '../../config/passport'; // eslint-disable-line

/**
 * Create JWT token with user information and secret key
 * @param user
 * @param rememberMe
 * @returns {object}
 */
const generateToken = (user, rememberMe) => {
  var jwtConfig = rememberMe ? { expiresIn: '31d'} : { expiresIn: '24h'};
  return 'JWT ' + jwt.sign(user, config.secret, jwtConfig);
};

/**
 * Creates a user object that goes into thw JWT token
 * @param user
 * @returns {object}
 */
const setUserInfo = user => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
};

/**
 * Uses passport local authentication on login request and sends response back
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.LOGIN.NO_MATCH_SEND, res, info);

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
exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) return errorHandler(ERROR_TYPES.USER.SIGN_UP.NO_EMAIL, res);

  if (!password) return errorHandler(ERROR_TYPES.USER.SIGN_UP.NO_PASSWORD, res);

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) return errorHandler(ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN, res);

    let user = new User({
      email: email,
      password: password
    });

    user.save().then(user => {
      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

/**
 * Finds user by given email, sets user reset token and token expiration, sends email with password reset token
 *
 * @param req
 * @param res
 * @param next
 */
exports.forgotPassword = function (req, res, next) {
  const email = req.body.email;

  if (!email) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NO_EMAIL, res);

  waterfall([
    done => {
      bcrypt.genSalt(20, (err, buf) => {
        let token = buf.toString('hex');

        token = token.replace(/\//g, Math.floor(Math.random() * 10 + 1));

        done(err, token);
      });
    },
    (token, done) => {
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);

        if (!user) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NON_EXISTING_EMAIL, res);

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save().then((savedUser) => {
          done(err, token, savedUser);
        });
      });
    },
    (token, user, done) => {
      var smtpTransport = nodemailer.createTransport(config.mailerSettings);
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        req.headers.origin + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, err => {
        res.sendStatus(200);
        done(err, 'done');
      });
    }
  ], (err) => {
    if (err) return next(err);
  });
};

/**
 * Checks if reset password token is valid and returns user if it is
 *
 * @param req
 * @param res
 * @param next
 */
exports.checkResetToken = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) return errorHandler(ERROR_TYPES.USER.CHECK_TOKEN.NOT_VALID, res);

    res.status(200).json({user: setUserInfo(user)});
  });
};

/**
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.resetPassword = (req, res, next) => {
  const userId = req.body.userId,
        currentPassword = req.body.currentPassword,
        newPassword = req.body.newPassword;

  waterfall([
    done => {
      User.findOne({ _id: userId }, (err, user) => {
        if (!user) return errorHandler(ERROR_TYPES.USER.RESET_PASSWORD.NO_USER, res);

        user.comparePassword(currentPassword, (err, isMatch) => {
          if (err) return done(err);

          if (!isMatch) return errorHandler(ERROR_TYPES.USER.RESET_PASSWORD.NO_MATCH, res);

          user.password = newPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save().then(savedUser => {
            done(null, savedUser);
          });
        });
      });
    },
    (user, done) => {
      var smtpTransport = nodemailer.createTransport(config.mailerSettings);
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, err => {
        res.sendStatus(200);
        done(err);
      });
    }
  ], err => {
    if (err) return next(err);
  });
};

/**
 * Checks if token is present in request
 * @param req
 * @param res
 */
exports.authenticate = (req, res) => {
  var token = req.headers.authorization.split(' ')[1];

  if (!token) return errorHandler(ERROR_TYPES.USER.FAILED_AUTHENTICATION, res);

  jwt.verify(token, config.secret, (err, user) => {

    if (err) return errorHandler(ERROR_TYPES.USER.INVALID_TOKEN, res, err);

    let userInfo = setUserInfo(user);

    res.status(200).json({
      token: generateToken(userInfo),
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
