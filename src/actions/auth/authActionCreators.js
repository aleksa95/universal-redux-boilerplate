import axios from 'axios';
import AUTH_ACTIONS from './authActions';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

function errorHandler(dispatch, error, type, formError) {
  let errorMessage = '';

  if (error.data && error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data && error.data.message) {
    errorMessage = error.data.message;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser(); // eslint-disable-line
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }

  if (formError) {
    const formField = error.data.type;
    let submissionError = {}; // eslint-disable-line
    submissionError[formField] = error.data.error;
    submissionError._error = error.data.error;
    throw new SubmissionError(submissionError);
  }
}

/**
 * Logs out user
 * @returns {function(*, *)}
 */
function logoutUser() {
  return async (dispatch, getStore) => { // eslint-disable-line
    dispatch({type: AUTH_ACTIONS.LOGOUT, payload: getStore().auth.user});

    let response;

    try {
      response = await axios.get(`/api/auth/logout`, { withCredentials: true });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.LOGIN_FAILED);
    }

    dispatch({type: AUTH_ACTIONS.LOGOUT_SUCCESS});

    return response;
  };
}

/**
 * Logs in user
 * @param email
 * @param password
 * @param rememberMe
 * @returns {function(*=)}
 */
function loginUser({ email, password, rememberMe }) {
  return async (dispatch) => {
    dispatch({type: AUTH_ACTIONS.LOGIN, payload: {email, password}});

    let response;

    try {
      response = await axios.post(`/api/auth/login`, { email, password, rememberMe });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.LOGIN_FAILED, true);
    }

    dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data.user });

    dispatch(push('/dashboard'));

    return response;
  };
}

/**
 * Creates new user
 * @param email
 * @param password
 * @returns {function(*=)}
 */
function signUpUser({ email, password }) {
  return async (dispatch) => {
    dispatch({type: AUTH_ACTIONS.SIGN_UP, payload: {email, password}});

    let response;

    try {
      response = await axios.post(`/api/auth/sign-up`, { email, password });
    } catch (error) {
      if (error.response.status === 429) {
        errorHandler(dispatch, error.response, AUTH_ACTIONS.SIGN_UP_TO_MUCH_ATTEMPTS);

        setTimeout(() => {
          console.log('a');
          dispatch({ type: AUTH_ACTIONS.DISMISS_SIGN_UP_ERROR});
        }, 15000);
      } else {
        errorHandler(dispatch, error.response, AUTH_ACTIONS.SIGN_UP_FAILED, true);
      }
    }

    dispatch({ type: AUTH_ACTIONS.SIGN_UP_SUCCESS, payload: response.data.user });

    dispatch(push('/dashboard'));

    return response;
  };
}

/**
 * Checks if user is authenticated
 * @returns {function(*, *)}
 */
function checkAuth() {
  return async (dispatch, getStore) => {
    dispatch({type: AUTH_ACTIONS.AUTHENTICATE, payload: getStore().auth.user});

    let response;

    try {
      response = await axios.get(`http://localhost:3000/api/auth/authenticate`, { withCredentials: true });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.AUTHENTICATION_FAILED);
    }

    if (response.data && response.data.user) {
      dispatch({
        type: AUTH_ACTIONS.AUTHENTICATION_SUCCESS,
        payload: response.data.user
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTHENTICATION_FAILED,
        payload: { error: 'User not authenticated' }
      });
    }

    return response;
  };
}

/**
 * Dispatches Action to routing reducer
 * @param route
 * @returns {function(*, *)}
 */
function redirect(route) {
  return (dispatch) => {
    dispatch(push(route));
  };
}

/**
 * Checks if Auth form fields are valid
 * @returns {{}}
 */
const authFormsValidator = values => {
  const errors = {};

  if (!values.email) errors.email = 'Required';

  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) errors.password = 'Required';

  return errors;
};

/**
 * Sends request to send forgot password email
 *
 * @param email
 * @returns {function(*=)}
 */
const forgotPassword = ({ email }) => {
  return async (dispatch) => {
    dispatch({type: AUTH_ACTIONS.FORGOT_PASSWORD, payload: { email }});

    let response;

    try {
      response = await axios.post(`/api/auth/forgot-password`, { email });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.FORGOT_PASSWORD_FAILED, true);
    }

    dispatch({ type: AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS, payload: email });
    dispatch(push('/forgot-password-success'));

    return response;
  };
};

/**
 * Sends request to check if the token on route "reset/:token" is valid
 *
 * @param token
 * @returns {function(*=)}
 */
const checkIfResetPasswordTokenIsValid = ({ token }) => {
  return async (dispatch) => {
    dispatch({type: AUTH_ACTIONS.CHECK_RESET_TOKEN, payload: { token }});

    let response;

    try {
      response = await axios.post(`/api/auth/check-reset-token`, { token });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.CHECK_RESET_TOKEN_FAILED);
    }

    dispatch({ type: AUTH_ACTIONS.CHECK_RESET_TOKEN_SUCCESS, payload: response.data.user });

    return response;
  };
};

/**
 * Sends request to reset user password
 *
 * @param userId
 * @param currentPassword
 * @param newPassword
 * @returns {function(*=)}
 */
const resetPassword = ({ userId, currentPassword, newPassword }) => {
  return async (dispatch) => {
    dispatch({type: AUTH_ACTIONS.RESET_PASSWORD, payload: { userId }});

    let response;

    try {
      response = await axios.post(`/api/auth/reset-password`, { userId, currentPassword, newPassword });
    } catch (error) {
      errorHandler(dispatch, error.response, AUTH_ACTIONS.RESET_PASSWORD_FAILED, true);
    }

    dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS });

    return response;
  };
};

module.exports = {
  logoutUser, loginUser, checkAuth, signUpUser, redirect, authFormsValidator, forgotPassword,
  checkIfResetPasswordTokenIsValid, resetPassword
};
