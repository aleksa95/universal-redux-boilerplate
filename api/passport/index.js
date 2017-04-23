import localLoginStrategy from './localLogin';
import localSignUpStrategy from './localSignUp';
import facebookStrategy from './facebookPassport';
import twitterStrategy from './twitterPassport';

export default {
  login: localLoginStrategy,
  singUp: localSignUpStrategy,
  facebook: facebookStrategy,
  twitter: twitterStrategy
}
