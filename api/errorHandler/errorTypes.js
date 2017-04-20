const ERROR_TYPES = {
  USER: {
    SIGN_UP: {
      FIND: 'user.sign-up.find',
      EMAIL_TAKEN: 'user.sign-up.email-taken',
      INVALID_EMAIL: 'user.sign-up.invalid-email',
      PASSPORT_ERROR: 'user.sign-up.passport',
      PRE_SAVE: {
        GEN_SALT: 'user.sing-up.pre-save.gen-salt',
        HASH_PASSWORD: 'user.sing-up.pre-save.hash-password'
      }
    },
    LOGIN: {
      NON_EXISTING_EMAIL: 'user.login.non-existing-email',
      NO_MATCH: 'user.login.no-match',
      PASSPORT_ERROR: 'user.login.no-match-send'
    },
    FORGOT_PASSWORD: {
      NO_EMAIL: 'user.forgot-password.no-email',
      NON_EXISTING_EMAIL: 'user.forgot-password.no-match'
    },
    CHECK_TOKEN: {
      NOT_VALID: 'user.check_token.not-valid'
    },
    RESET_PASSWORD: {
      NO_USER: 'user.reset-password.no-user',
      NO_MATCH: 'user.reset-password.no-match'
    },
    FAILED_AUTHENTICATION: 'user.failed-authentication',
    INVALID_TOKEN: 'user.invalid-token',
    ROLE_MISMATCH: 'user.role-mismatch',
    PRE_SAVE: {
      GEN_SALT: 'user.pre-save.gen-salt',
      HASH_PASSWORD: 'user.pre-save.hash-password'
    }
  }
};

export default ERROR_TYPES;
