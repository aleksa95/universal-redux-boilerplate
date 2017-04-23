import User from '../api/models/user';
import LocalStrategy from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from './env';
import passportStrategies from '../api/passport/index';

const passportConfig = config.passport;

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

  passport.use('local-login',  new LocalStrategy(passportConfig.local, passportStrategies.login));
  passport.use('local-signup', new LocalStrategy(passportConfig.local, passportStrategies.singUp));
  passport.use('facebook',     new FacebookStrategy(passportConfig.facebook, passportStrategies.facebook));
};
