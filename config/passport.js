import passport from 'passport';
import User from '../api/models/user';
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { type: 'email', error: 'There is no user registered with that email.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, { type:'email', error: "Your login details do not match. Please try again." });
      }

      return done(null, user);
    });
  });
});

passport.use(localLogin);
