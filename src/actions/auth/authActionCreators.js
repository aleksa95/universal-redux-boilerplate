import axios from 'axios';
import cookie from 'react-cookie';
import authActions from './authActions';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

/**
 * Logs out user
 * @returns {function(*, *)}
 */
function logoutUser() {
  return (dispatch, getStore) => { // eslint-disable-line
    dispatch({type: authActions.LOGOUT, payload: getStore().auth.user});
    cookie.remove('token', { path: '/' });
    dispatch({type: authActions.LOGOUT_SUCCESS});
  };
}

function errorHandler(dispatch, error, type) {
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
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
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
    dispatch({type: authActions.LOGIN, payload: {email, password}});

    let response;

    try {
      response = await axios.post(`/api/auth/login`, { email, password, rememberMe });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.LOGIN_FAILED);
      const formField = error.response.data.type;
      let submissionError = {}; // eslint-disable-line
      submissionError[formField] = error.response.data.error;
      submissionError._error = error.response.data.error;
      throw new SubmissionError(submissionError);
    }

    dispatch({ type: authActions.LOGIN_SUCCESS, payload: response.data.user });
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
    dispatch({type: authActions.SIGN_UP, payload: {email, password}});

    let response;

    try {
      response = await axios.post(`/api/auth/sign-up`, { email, password });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.SIGN_UP_FAILED);

      if (error.response.status === 429) {
        setTimeout(() => {
          dispatch({ type: authActions.DISMISS_SIGN_UP_ERROR});
        }, 15000);
      }

      const formField = error.response.data.type;
      let submissionError = {}; // eslint-disable-line
      submissionError[formField] = error.response.data.error;
      submissionError._error = error.response.data.error;
      throw new SubmissionError(submissionError);
    }

    dispatch({ type: authActions.SIGN_UP_SUCCESS, payload: response.data.user });
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
    dispatch({type: authActions.AUTHENTICATE, payload: getStore().auth.user});

    let response;

    try {
      response = await axios.get(`http://localhost:3000/api/auth/authenticate`, { withCredentials: true });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.AUTHENTICATION_FAILED);
    }

    dispatch({
      type: authActions.AUTHENTICATION_SUCCESS,
      payload: response.data.user
    });

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
    dispatch({type: authActions.FORGOT_PASSWORD, payload: { email }});

    let response;

    try {
      response = await axios.post(`/api/auth/forgot-password`, { email });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.FORGOT_PASSWORD_FAILED);
      const formField = error.response.data.type;
      let submissionError = {}; // eslint-disable-line
      submissionError[formField] = error.response.data.error;
      submissionError._error = error.response.data.error;
      throw new SubmissionError(submissionError);
    }

    dispatch({ type: authActions.FORGOT_PASSWORD_SUCCESS, payload: email });
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
    dispatch({type: authActions.CHECK_RESET_TOKEN, payload: { token }});

    let response;

    try {
      response = await axios.post(`/api/auth/check-reset-token`, { token });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.CHECK_RESET_TOKEN_FAILED);
    }

    dispatch({ type: authActions.CHECK_RESET_TOKEN_SUCCESS, payload: response.data.user });

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
    dispatch({type: authActions.RESET_PASSWORD, payload: { userId }});

    let response;

    try {
      response = await axios.post(`/api/auth/reset-password`, { userId, currentPassword, newPassword });
    } catch (error) {
      errorHandler(dispatch, error.response, authActions.RESET_PASSWORD_FAILED);
      const formField = error.response.data.type;
      let submissionError = {}; // eslint-disable-line
      submissionError[formField] = error.response.data.error;
      submissionError._error = error.response.data.error;
      throw new SubmissionError(submissionError);
    }

    dispatch({ type: authActions.RESET_PASSWORD_SUCCESS });

    return response;
  };
};

/**
 * TEST
 * @param user
 * @returns {function(*, *)}
 */
function test(user) { // eslint-disable-line
  return async (dispatch) => { // eslint-disable-line
    let response;

    try {
      response = await axios.post('/api/user/test', { user: user }, {
        headers: { 'Authorization': cookie.load('token') }
      });
    } catch (error) {
      console.log(error);
    }

    console.log(response);

    return response;
  };
}

module.exports = {
  logoutUser, loginUser, checkAuth, signUpUser, redirect, authFormsValidator, forgotPassword,
  checkIfResetPasswordTokenIsValid, resetPassword
};
