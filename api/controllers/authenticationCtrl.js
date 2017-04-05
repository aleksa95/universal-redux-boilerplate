import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/env';
import passport from 'passport';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';
import passportConfig from '../../config/passport'; // eslint-disable-line

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

exports.resetPassword = function (req, res) {
  const email = req.body.email;

  if (!email) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NO_EMAIL, res);

  User.findOne({ email: email }, function(err, user) {
    if (err) { return next(err); }

    if (!user) return errorHandler(ERROR_TYPES.USER.FORGOT_PASSWORD.NON_EXISTING_EMAIL, res);


    res.send(200);
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
