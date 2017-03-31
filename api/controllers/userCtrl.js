import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/env';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';

/**
 * Checks if request has token and if the user from the token has the required role
 * @param role
 * @returns {function(*, *=, *)}
 */
exports.requireRole = role => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return errorHandler(ERROR_TYPES.USER.FAILED_AUTHENTICATION, res);

    return jwt.verify(token, config.secret, (err, user) => {
      if (err) return errorHandler(ERROR_TYPES.USER.INVALID_TOKEN, res, err);

      if (user.role !== role) return errorHandler(ERROR_TYPES.USER.ROLE_MISMATCH, res, err);

      return next();
    });
  }
};

exports.testEndpoint = function(req, res) {
  res.status(200).json({ message: 'Test successful.' });
};
