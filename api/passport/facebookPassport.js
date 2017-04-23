import User from '../models/user';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';

export default (token, refreshToken, profile, done) => {
  User.findOne({'facebook.id': profile.id}, (err, user) => {
    if (err) return done(err);

    if (user) return done(null, user);

    var newUser = new User();
    newUser.facebook.id = profile.id;
    newUser.facebook.token = token;
    newUser.facebook.name = profile.displayName;
    newUser.facebook.email = profile.emails[0].value;

    newUser.save((err, newSavedUser, errType) => {
      if (err && errType) return errorHandler(ERROR_TYPES.USER.PRE_SAVE.ERROR, done, errType);

      return done(null, newUser);
    });
  });
}
