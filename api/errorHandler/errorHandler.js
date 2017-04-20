import ERROR_TYPES from './errorTypes';

// 401 - Unauthorized
// 403 - Forbidden
// 422 - Unprocessed Entity
// 429 - Too Many Requests

const errorHandler = function (ERROR_TYPE, res, message) {
  switch (ERROR_TYPE) {

    case ERROR_TYPES.USER.LOGIN.NO_MATCH:
      return res(null, false, { type:'email', error: "Your login details do not match. Please try again." });

    case ERROR_TYPES.USER.LOGIN.PASSPORT_ERROR:
      return res.status(422).send(message);

    case ERROR_TYPES.USER.LOGIN.NON_EXISTING_EMAIL:
      return res(null, false, { type: 'email', error: 'There is no user registered with that email.' });

    case ERROR_TYPES.USER.SIGN_UP.FIND:
      return res(null, false, { error: 'Error while trying to find user.' , type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN:
      return res(null, false, { error: 'That email address is already in use.' , type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.INVALID_EMAIL:
      return res(null, false, { error: 'That email address does not exist.' , type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.PRE_SAVE.GEN_SALT:
      return res(null, false, { error: 'Error while saving user (gen salt)' , type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.PRE_SAVE.HASH_PASSWORD:
      return res(null, false, { error: 'Error while saving user (hash pass)' , type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.PASSPORT_ERROR:
      return res.status(422).send(message);

    case ERROR_TYPES.USER.FAILED_AUTHENTICATION:
      return res.status(401).json({message: 'Session timeout'});

    case ERROR_TYPES.USER.INVALID_TOKEN:
      return res.status(401).json({message: message});

    case ERROR_TYPES.USER.ROLE_MISMATCH:
      return res.status(401).json({message: 'Role mismatch'});

    case ERROR_TYPES.USER.FORGOT_PASSWORD.NO_EMAIL:
      return res.status(422).send({ error: 'You must enter an email address.', type: 'email'});

    case ERROR_TYPES.USER.FORGOT_PASSWORD.NON_EXISTING_EMAIL:
      return res.status(422).send({ type: 'email', error: 'There is no user registered with that email.' });

    case ERROR_TYPES.USER.CHECK_TOKEN.NOT_VALID:
      return res.status(422).send({ type: 'token', error: 'Password reset token is invalid or has expired.' });

    case ERROR_TYPES.USER.RESET_PASSWORD.NO_USER:
      return res.status(422).send({ type: 'currentPassword', error: 'There is no user with that ID'});

    case ERROR_TYPES.USER.RESET_PASSWORD.NO_MATCH:
      return res.status(422).send({ type: 'currentPassword', error: "The submitted current password is not valid"});
  }
};

export default errorHandler;
