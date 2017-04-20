import passport from 'passport';
import User from '../api/models/user';
import emailExistence from 'email-existence';
import LocalStrategy from 'passport-local';
import ERROR_TYPES from '../api/errorHandler/errorTypes';
import errorHandler from '../api/errorHandler/errorHandler';
const localOptions = { usernameField: 'email', passwordField : 'password', passReqToCallback : true };

/**
 * Passport JS strategy for user login
 */
const localLogin = new LocalStrategy(localOptions, (req, email, password, done) => {
  User.findOne({'local.email' : email}, function(err, user) {
    if (err) return done(err);

    if (!user) return errorHandler(ERROR_TYPES.USER.LOGIN.NON_EXISTING_EMAIL, done);

    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);

      if (!isMatch) return errorHandler(ERROR_TYPES.USER.LOGIN.NO_MATCH, done);

      return done(null, user);
    });
  });
});

const localSingUp = new LocalStrategy(localOptions, (req, email, password, done) => {
  emailExistence.check(email, (emailError, emailExists) => {
    if (emailError) return errorHandler(ERROR_TYPES.USER.SIGN_UP.INVALID_EMAIL, done);

    if (!emailExists) return errorHandler(ERROR_TYPES.USER.SIGN_UP.INVALID_EMAIL, done);

    User.findOne({'local.email' : email}, (err, existingUser) => {
      if (err) return errorHandler(ERROR_TYPES.USER.SIGN_UP.FIND, done);

      if (existingUser) return errorHandler(ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN, done);

      var newUser            = new User();
      newUser.local.email    = email;
      newUser.local.password = password;

      newUser.save(function(err, newSavedUser, errType) {
        if (err && errType) {
          switch (errType) {
            case ERROR_TYPES.USER.PRE_SAVE.GEN_SALT:
              return errorHandler(ERROR_TYPES.USER.SIGN_UP.PRE_SAVE.GEN_SALT, done);

            case ERROR_TYPES.USER.HASH_PASSWORD:
              return errorHandler(ERROR_TYPES.USER.SIGN_UP.PRE_SAVE.HASH_PASSWORD, done);
          }
        }

        return done(null, newSavedUser);
      });
    });
  });
});

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
      if (err) done(err);

      done(null, user);
    });
  });

  passport.use('local-login', localLogin);
  passport.use('local-signup', localSingUp);
};
