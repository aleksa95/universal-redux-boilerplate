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
    console.log(role);

    // new role logic
    return next();
  }
};

exports.testEndpoint = function(req, res) {
  res.status(200).json({ message: 'Test successful.', user: req.user });
};
