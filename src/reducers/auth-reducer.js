import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED,
  FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  CHECK_RESET_TOKEN, CHECK_RESET_TOKEN_SUCCESS, CHECK_RESET_TOKEN_FAILED,
  AUTHENTICATE, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  authenticating: false,
  signingIn: false,
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
  resetPasswordSuccess: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_UP:
      return {...state, signingIn: true, user: action.payload };
    case SIGN_UP_SUCCESS:
      return {...state, signingIn: false, authenticated: true, user: action.payload, error: false };
    case SIGN_UP_FAILED:
      return {...state, signingIn: false, authenticated: false, error: action.payload };

    case LOGIN:
      return {...state, loggingIn: true, user: action.payload };
    case LOGIN_SUCCESS:
      return {...state, loggingIn: false, authenticated: true, user: action.payload, error: false };
    case LOGIN_FAILED:
      return {...state, loggingIn: false, authenticated: false, error: action.payload };

    case LOGOUT:
      return {...state, loggingOut: true, user: action.payload };
    case LOGOUT_SUCCESS:
      return {...state, loggingOut: false, authenticated: false, error: false };
    case LOGOUT_FAILED:
      return {...state, loggingOut: false, authenticated: true, error: action.payload };

    case FORGOT_PASSWORD:
      return {...state, forgotPasswordOngoing: true, userResetEmail: action.payload.email };
    case FORGOT_PASSWORD_SUCCESS:
      return {...state, forgotPasswordOngoing: false, error: false };
    case FORGOT_PASSWORD_FAILED:
      return {...state, forgotPasswordOngoing: false, error: action.payload };

    case RESET_PASSWORD:
      return {...state, resettingPassword: true, userIdResetPassword: action.payload.userId };
    case RESET_PASSWORD_SUCCESS:
      return {...state, resettingPassword: false, error: false, resetPasswordSuccess: true };
    case RESET_PASSWORD_FAILED:
      return {...state, resettingPassword: false, error: action.payload };

    case CHECK_RESET_TOKEN:
      return {...state, checkingResetToken: true, resetToken: action.payload.token };
    case CHECK_RESET_TOKEN_SUCCESS:
      return {...state, checkingResetToken: false, error: false, resetPassUser: action.payload };
    case CHECK_RESET_TOKEN_FAILED:
      return {...state, checkingResetToken: false, error: action.payload, resetTokenError: true };

    case AUTHENTICATE:
      return {...state, authenticating: true, user: action.payload };
    case AUTHENTICATION_SUCCESS:
      return {...state, authenticating: false, authenticated: true, user: action.payload, error: false };
    case AUTHENTICATION_FAILED:
      return {...state, authenticating: false, authenticated: false, error: action.payload };

    default:
      return state;
  }
}
