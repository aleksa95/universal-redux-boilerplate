import authActions from '../actions/auth/authActions';

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
    case authActions.SIGN_UP:
      return {...state, signingIn: true, user: action.payload };
    case authActions.SIGN_UP_SUCCESS:
      return {...state, signingIn: false, signUpError: false, authenticated: true, user: action.payload, error: false };
    case authActions.authActions.SIGN_UP_FAILED:
      return {...state, signingIn: false, signUpError: true, authenticated: false, error: action.payload };
    case authActions.DISMISS_SIGN_UP_ERROR:
      return {...state, signUpError: false };

    case authActions.LOGIN:
      return {...state, loggingIn: true, user: action.payload };
    case authActions.LOGIN_SUCCESS:
      return {...state, loggingIn: false, authenticated: true, user: action.payload, error: false };
    case authActions.LOGIN_FAILED:
      return {...state, loggingIn: false, authenticated: false, error: action.payload };

    case authActions.LOGOUT:
      return {...state, loggingOut: true, user: action.payload };
    case authActions.LOGOUT_SUCCESS:
      return {...state, loggingOut: false, authenticated: false, error: false };
    case authActions.LOGOUT_FAILED:
      return {...state, loggingOut: false, authenticated: true, error: action.payload };

    case authActions.FORGOT_PASSWORD:
      return {...state, forgotPasswordOngoing: true, userResetEmail: action.payload.email };
    case authActions.FORGOT_PASSWORD_SUCCESS:
      return {...state, forgotPasswordOngoing: false, error: false };
    case authActions.FORGOT_PASSWORD_FAILED:
      return {...state, forgotPasswordOngoing: false, error: action.payload };

    case authActions.RESET_PASSWORD:
      return {...state, resettingPassword: true, userIdResetPassword: action.payload.userId };
    case authActions.RESET_PASSWORD_SUCCESS:
      return {...state, resettingPassword: false, error: false, resetPasswordSuccess: true };
    case authActions.RESET_PASSWORD_FAILED:
      return {...state, resettingPassword: false, error: action.payload };

    case authActions.CHECK_RESET_TOKEN:
      return {...state, checkingResetToken: true, resetToken: action.payload.token };
    case authActions.CHECK_RESET_TOKEN_SUCCESS:
      return {...state, checkingResetToken: false, error: false, resetPassUser: action.payload };
    case authActions.CHECK_RESET_TOKEN_FAILED:
      return {...state, checkingResetToken: false, error: action.payload, resetTokenError: true };

    case authActions.AUTHENTICATE:
      return {...state, authenticating: true, user: action.payload };
    case authActions.AUTHENTICATION_SUCCESS:
      return {...state, authenticating: false, authenticated: true, user: action.payload, error: false };
    case authActions.AUTHENTICATION_FAILED:
      return {...state, authenticating: false, authenticated: false, error: action.payload };

    default:
      return state;
  }
}
