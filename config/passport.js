import passport from 'passport';
import User from '../api/models/user';
import emailExistence from 'email-existence';
import LocalStrategy from 'passport-local';
import ERROR_TYPES from '../api/errorHandler/errorTypes';
import errorHandler from '../api/errorHandler/errorHandler';
import { Strategy as FacebookStrategy } from 'passport-facebook';

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

const facebookStrategy = new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : '426856600984229',
    clientSecret    : '40eb808c7162d1b3863d5b7d60b3fae3',
    callbackURL     : 'http://localhost:3000/api/auth/facebook-callback'

  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function () {

      // find the user in the database based on their facebook id
      User.findOne({'facebook.id': profile.id}, function (err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id = profile.id; // set the users facebook id
          newUser.facebook.token = token; // we will save the token that facebook provides to the user
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
          newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          // save our user to the database
          newUser.save(function (err) {
            if (err)
              throw err;

            // if successful, return the new user
            return done(null, newUser);
          });
        }

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
  passport.use('facebook', facebookStrategy);
};
