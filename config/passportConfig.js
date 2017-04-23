import User from '../api/models/user';
import LocalStrategy from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import config from './env';
import passportStrategies from '../api/passport/index';

const passportConfig = config.passport;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log('SERIALIZE');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>{
    console.log('DE-SERIALIZE');
    User.findById(id, (err, user) => {
      if (err) done(err);

      done(null, user);
    });
  });

  passport.use('local-login',  new LocalStrategy(passportConfig.local,       passportStrategies.login));
  passport.use('local-signup', new LocalStrategy(passportConfig.local,       passportStrategies.singUp));
  passport.use('twitter',      new TwitterStrategy(passportConfig.twitter,   passportStrategies.twitter));
  passport.use('facebook',     new FacebookStrategy(passportConfig.facebook, passportStrategies.facebook));
};
