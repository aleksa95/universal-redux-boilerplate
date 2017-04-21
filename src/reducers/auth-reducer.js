import AUTH_ACTIONS from '../actions/auth/authActions';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  authenticating: false,
  signingIn: false,
  signUpError: false,
  loggingIn: false,
  loggingOut: false,
  checkingResetToken: false,
  resetToken: '',
  resetTokenError: false,
  userResetEmail: '',
  resetPassUser: {},
  user: {},
  forgotPasswordOngoing: false,
  userIdResetPassword: '',
  resetPasswordSuccess: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_UP:
      return {...state, signingIn: true, user: action.payload };
    case AUTH_ACTIONS.SIGN_UP_SUCCESS:
      return {...state, signingIn: false, signUpError: false, authenticated: true, user: action.payload, error: false };
    case AUTH_ACTIONS.SIGN_UP_FAILED:
      return {...state, signingIn: false, signUpError: false, authenticated: false, error: action.payload };
    case AUTH_ACTIONS.SIGN_UP_TO_MUCH_ATTEMPTS:
      return {...state, signingIn: false, signUpError: true, authenticated: false, error: action.payload };
    case AUTH_ACTIONS.DISMISS_SIGN_UP_ERROR:
      return {...state, signUpError: false };

    case AUTH_ACTIONS.LOGIN:
      return {...state, loggingIn: true, user: action.payload };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {...state, loggingIn: false, authenticated: true, user: action.payload, error: false };
    case AUTH_ACTIONS.LOGIN_FAILED:
      return {...state, loggingIn: false, authenticated: false, error: action.payload };

    case AUTH_ACTIONS.LOGOUT:
      return {...state, loggingOut: true, user: action.payload };
    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {...state, loggingOut: false, authenticated: false, error: false };
    case AUTH_ACTIONS.LOGOUT_FAILED:
      return {...state, loggingOut: false, authenticated: true, error: action.payload };

    case AUTH_ACTIONS.FORGOT_PASSWORD:
      return {...state, forgotPasswordOngoing: true, userResetEmail: action.payload.email };
    case AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS:
      return {...state, forgotPasswordOngoing: false, error: false };
    case AUTH_ACTIONS.FORGOT_PASSWORD_FAILED:
      return {...state, forgotPasswordOngoing: false, error: action.payload };

    case AUTH_ACTIONS.RESET_PASSWORD:
      return {...state, resettingPassword: true, userIdResetPassword: action.payload.userId };
    case AUTH_ACTIONS.RESET_PASSWORD_SUCCESS:
      return {...state, resettingPassword: false, error: false, resetPasswordSuccess: true };
    case AUTH_ACTIONS.RESET_PASSWORD_FAILED:
      return {...state, resettingPassword: false, error: action.payload };

    case AUTH_ACTIONS.CHECK_RESET_TOKEN:
      return {...state, checkingResetToken: true, resetToken: action.payload.token };
    case AUTH_ACTIONS.CHECK_RESET_TOKEN_SUCCESS:
      return {...state, checkingResetToken: false, error: false, resetPassUser: action.payload };
    case AUTH_ACTIONS.CHECK_RESET_TOKEN_FAILED:
      return {...state, checkingResetToken: false, error: action.payload, resetTokenError: true };

    case AUTH_ACTIONS.AUTHENTICATE:
      return {...state, authenticating: true, user: action.payload };
    case AUTH_ACTIONS.AUTHENTICATION_SUCCESS:
      return {...state, authenticating: false, authenticated: true, user: action.payload, error: false };
    case AUTH_ACTIONS.AUTHENTICATION_FAILED:
      return {...state, authenticating: false, authenticated: false, error: action.payload };

    default:
      return state;
  }
}
