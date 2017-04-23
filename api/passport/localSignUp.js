import User from '../models/user';
import emailExistence from 'email-existence';
import ERROR_TYPES from '../errorHandler/errorTypes';
import errorHandler from '../errorHandler/errorHandler';

export default (req, email, password, done) => {
  emailExistence.check(email, (emailError, emailExists) => {
    if (emailError) return errorHandler(ERROR_TYPES.USER.SIGN_UP.INVALID_EMAIL, done);

    if (!emailExists) return errorHandler(ERROR_TYPES.USER.SIGN_UP.INVALID_EMAIL, done);

    User.findOne({'local.email' : email}, (err, existingUser) => {
      if (err) return errorHandler(ERROR_TYPES.USER.SIGN_UP.FIND, done);

      if (existingUser) return errorHandler(ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN, done);

      var newUser            = new User();
      newUser.local.email    = email;
      newUser.local.password = password;

      newUser.save((err, newSavedUser, errType) => {
        if (err && errType) return errorHandler(ERROR_TYPES.USER.PRE_SAVE.ERROR, done, errType);

        return done(null, newSavedUser);
      });
    });
  });
}
