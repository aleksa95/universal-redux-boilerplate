import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED,
  AUTHENTICATE, AUTHENTICATATION_SUCCESS, AUTHENTICATATION_FAILED} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  authenticating: false,
  signingIn: false,
  loggingIn: false,
  loggingOut: false,
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_UP:
      return {...state, signingIn: true, user: action.payload};
    case SIGN_UP_SUCCESS:
      return {...state, signingIn: false, authenticated: true, user: action.payload };
    case SIGN_UP_FAILED:
      return {...state, signingIn: false, authenticated: false, error: action.payload };

    case LOGIN:
      return {...state, loggingIn: true, user: action.payload };
    case LOGIN_SUCCESS:
      return {...state, loggingIn: false, authenticated: true, user: action.payload };
    case LOGIN_FAILED:
      return {...state, loggingIn: false, authenticated: false, error: action.payload };

    case LOGOUT:
      return {...state, loggingOut: true, user: action.payload};
    case LOGOUT_SUCCESS:
      return {...state, loggingOut: false, authenticated: false };
    case LOGOUT_FAILED:
      return {...state, loggingOut: false, authenticated: true, error: action.payload };

    case AUTHENTICATE:
      return {...state, authenticating: true, user: action.payload};
    case AUTHENTICATATION_SUCCESS:
      return {...state, authenticating: false, authenticated: true, user: action.payload };
    case AUTHENTICATATION_FAILED:
      return {...state, authenticating: false, authenticated: false, error: action.payload };

    default:
      return state;
  }
}
