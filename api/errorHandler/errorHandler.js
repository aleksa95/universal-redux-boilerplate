import ERROR_TYPES from './errorTypes';

// 401 - Unauthorized
// 403 - Forbidden
// 422 - Unprocessed Entity

const errorHandler = function (ERROR_TYPE, res, message) {
  switch (ERROR_TYPE) {

    case ERROR_TYPES.USER.LOGIN.NO_MATCH:
      return res(null, false, { type:'email', error: "Your login details do not match. Please try again." });

    case ERROR_TYPES.USER.LOGIN.NO_MATCH_SEND:
      return res.status(422).send(message);

    case ERROR_TYPES.USER.LOGIN.NON_EXISTING_EMAIL:
      return res(null, false, { type: 'email', error: 'There is no user registered with that email.' });

    case ERROR_TYPES.USER.SIGN_UP.NO_EMAIL:
      return res.status(422).send({ error: 'You must enter an email address.', type: 'email'});

    case ERROR_TYPES.USER.SIGN_UP.NO_PASSWORD:
      return res.status(422).send({ error: 'You must enter a password.', type: 'password' });

    case ERROR_TYPES.USER.SIGN_UP.EMAIL_TAKEN:
      return res.status(422).send({ error: 'That email address is already in use.' , type: 'email'});

    case ERROR_TYPES.USER.FAILED_AUTHENTICATION:
      return res.status(401).json({message: 'Must have token in header'});

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
