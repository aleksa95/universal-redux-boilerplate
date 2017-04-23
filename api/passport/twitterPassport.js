import User from '../models/user';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';

export default (token, tokenSecret, profile, done) => {
  User.findOne({'twitter.id': profile.id}, (err, user) => {
    if (err) return done(err);

    if (user) return done(null, user);

    var newUser = new User();
    newUser.twitter.id = profile.id;
    newUser.twitter.token = token;
    newUser.twitter.name = profile.displayName;
    newUser.twitter.email = profile.email;

    newUser.save((err, newSavedUser, errType) => {
      if (err && errType) return errorHandler(ERROR_TYPES.USER.PRE_SAVE.ERROR, done, errType);

      return done(null, newUser);
    });
  });
}
