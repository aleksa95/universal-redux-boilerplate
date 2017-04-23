import localLoginStrategy from './localLogin';
import localSignUpStrategy from './localSignUp';
import facebookStrategy from './facebookPassport';

export default {
  login: localLoginStrategy,
  singUp: localSignUpStrategy,
  facebook: facebookStrategy
}
