const ERROR_TYPES = {
  USER: {
    SIGN_UP: {
      NO_EMAIL: 'user.sing-up.no-email',
      NO_PASSWORD: 'user.sing-up.no-email',
      EMAIL_TAKEN: 'user.sign-up.email-taken'
    },
    LOGIN: {
      NON_EXISTING_EMAIL: 'user.login.non-existing-email',
      NO_MATCH: 'user.login.no-match'
    },
    FAILED_AUTHENTICATION: 'user.failed-authentication',
    INVALID_TOKEN: 'user.invalid-token',
    ROLE_MISMATCH: 'user.role-mismatch'
  }
};

export default ERROR_TYPES;
