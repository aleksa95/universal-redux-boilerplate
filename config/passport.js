import passport from 'passport';
import User from '../api/models/user';
import LocalStrategy from 'passport-local';
import ERROR_TYPES from '../api/errorHandler/errorTypes';
import errorHandler from '../api/errorHandler/errorHandler';

const localOptions = { usernameField: 'email' };

/**
 * Passport JS strategy for user login
 */
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.LOGIN.NON_EXISTING_EMAIL, done);

    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);

      if (!isMatch) return errorHandler(ERROR_TYPES.USER.LOGIN.NO_MATCH, done);

      return done(null, user);
    });
  });
});

passport.use(localLogin);
