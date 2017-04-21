import User from '../models/user';
import config from '../../config/env';
import passport from 'passport';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';
import { waterfall } from 'async';
import bcrypt from 'bcrypt-nodejs';
import nodemailer from 'nodemailer';
import Hogan from 'hogan.js';
import fs from 'fs';
import passportConfig from '../../config/passport'; // eslint-disable-line

/**
 * Creates a user object that goes into thw JWT token
 * @param user
 * @returns {object}
 */
const setUserInfo = user => {
  return {
    id: user._id,
    email: user.local.email,
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
  passport.authenticate('local-login', (err, user, info) => {
    if (err) return next(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.LOGIN.PASSPORT_ERROR, res, info);

    req.logIn(user, err => {
      if (err) return next(err);

      let userInfo = setUserInfo(user);

      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 2592000000; //30 days

        return res.status(201).json({
          user: userInfo,
          session: req.session,
          "req.user": req.user
        });
      } else {
        return res.status(201).json({
          user: userInfo,
          session: req.session,
          "req.user": req.user
        });
      }
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
};

/**
 * Creates new user if there are no other users with the same email
 * @param req
 * @param res
 * @param next
 */
exports.signUp = (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.SIGN_UP.PASSPORT_ERROR, res, info);

    req.logIn(user, err => {
      if (err) return next(err);

      let userInfo = setUserInfo(user);

      return res.status(201).json({
        user: userInfo,
        session: req.session,
        "req.user": req.user
      });
    });
  })(req, res, next);
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
      User.findOne({ 'local.email': email }, function(err, user) {
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
      const smtpTransport = nodemailer.createTransport(config.mailerSettings);

      const template = fs.readFileSync('./src/emailTemplates/forgotPassword.hjs', 'utf-8');
      const compiledTemplate = Hogan.compile(template);

      const mailOptions = {
        to: user.local.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        html: compiledTemplate.render({ resetPasswordRef: req.headers.origin + '/reset/' + token })
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
 * Changes user password if it is not the same as the old one, then sends confirmation email
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

          user.local.password = newPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save().then(savedUser => {
            done(null, savedUser);
          });
        });
      });
    },
    (user, done) => {
      const smtpTransport = nodemailer.createTransport(config.mailerSettings);

      const template = fs.readFileSync('./src/emailTemplates/resetPasswordSuccess.hjs', 'utf-8');
      const compiledTemplate = Hogan.compile(template);

      const mailOptions = {
        to: user.local.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        html: compiledTemplate.render({ userEmail: user.email })
      };

      smtpTransport.sendMail(mailOptions, err => {
        res.sendStatus(200);
        done(err, 'done');
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
  let user = undefined;

  if (req.isAuthenticated() && req.user) {
    user = setUserInfo(req.user)
  }

  return res.status(200).json({ user });
};

/**
 * Authentication middleware that checks if token is present in request
 * @param req
 * @param res
 * @param next
 */
exports.authCheckMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  errorHandler(ERROR_TYPES.USER.FAILED_AUTHENTICATION, res);
};
