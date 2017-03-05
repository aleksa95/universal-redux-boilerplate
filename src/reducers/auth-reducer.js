
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST, AUTHENTICATE, AUTHENTICATATION_SUCCESS, AUTHENTICATATION_FAILED } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  authenticating: false,
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {...state, authenticating: true};
    case AUTHENTICATATION_SUCCESS:
      return {...state, authenticating: false, authenticated: true, user: action.payload };
    case AUTHENTICATATION_FAILED:
      return {...state, authenticating: false, authenticated: false, error: action.payload };
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}
