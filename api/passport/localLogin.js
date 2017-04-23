import User from '../models/user';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';

/**
 * Passport JS strategy for local user login
 */
export default (req, email, password, done) => {
  User.findOne({'local.email' : email}, function(err, user) {
    if (err) return done(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.LOGIN.NON_EXISTING_EMAIL, done);

    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);

      if (!isMatch) return errorHandler(ERROR_TYPES.USER.LOGIN.NO_MATCH, done);

      return done(null, user);
    });
  });
};
