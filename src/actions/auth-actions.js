import { apiHost, apiPort } from '../../config/env';
import axios from 'axios';
import cookie from 'react-cookie';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT, LOGOUT_SUCCESS,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  AUTHENTICATE, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED } from './types';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

const API_URL = `http://${apiHost}:${apiPort}/api`;

/**
 * Logs out user
 * @returns {function(*, *)}
 */
function logoutUser() {
  return (dispatch, getStore) => { // eslint-disable-line
    dispatch({type: LOGOUT, payload: getStore().auth.user});
    cookie.remove('token', { path: '/' });
    dispatch({type: LOGOUT_SUCCESS});
  };
}

/**
 * Writes new JWT token into the cookie
 * @param token
 */
function setNewToken(token) {
  cookie.save('token', token, { path: '/'});
}

function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
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
 * @returns {function(*=)}
 */
function loginUser({ email, password }) {
  return (dispatch) => {
    dispatch({type: LOGIN, payload: {email, password}});

    return axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        setNewToken(response.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        if (!error) return;
        errorHandler(dispatch, error.response, LOGIN_FAILED);
        const formField = error.response.data.type;
        let submissionError = {}; // eslint-disable-line
        submissionError[formField] = error.response.data.error;
        submissionError._error = error.response.data.error;
        throw new SubmissionError(submissionError);
      });
  };
}

/**
 * Creates new user
 * @param email
 * @param password
 * @returns {function(*=)}
 */
function signUpUser({ email, password }) {
  return (dispatch) => {
    dispatch({type: SIGN_UP, payload: {email, password}});

    return axios.post(`${API_URL}/auth/sign-up`, { email, password })
      .then(response => {
        setNewToken(response.data.token);
        dispatch({ type: SIGN_UP_SUCCESS, payload: response.data.user });
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, SIGN_UP_FAILED);
        const formField = error.response.data.type;
        let submissionError = {}; // eslint-disable-line
        submissionError[formField] = error.response.data.error;
        submissionError._error = error.response.data.error;
        throw new SubmissionError(submissionError);
      });
  };
}

/**
 * Checks if user has
 * @param token
 * @returns {function(*, *)}
 */
function checkAuth(token) {
  return (dispatch, getStore) => {
    const isTokenPresent = !!token;
    const config = { headers: { 'Authorization': cookie.load('token') }};

    dispatch({type: AUTHENTICATE, payload: getStore().auth.user});

    if (!isTokenPresent) {
      dispatch({
        type: AUTHENTICATION_FAILED, payload: 'Token is not present'
      });
      return;
    }

    axios.get(`${API_URL}/auth/authenticate`, config).then(response => {
      setNewToken(response.data.token);
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: response.data.user
      });
    }).catch((error) => {
      if (cookie.load('token')) cookie.remove('token', { path: '/' });

      dispatch({
        type: AUTHENTICATION_FAILED,
        payload: error.message
      });
    });
  };
}

/**
 * Dispatches Action to routing reducer
 * @param route
 * @returns {function(*, *)}
 */
function redirect(route) {
  return function(dispatch) {
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

const resetPassword = ({ email }) => {
  return (dispatch) => {
    dispatch({type: RESET_PASSWORD, payload: { email }});

    return axios.post(`${API_URL}/auth/reset-password`, { email })
      .then(() => {
        console.log('dsadas');
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: email });
        dispatch(push('/reset-password-success'));
      })
      .catch((error) => {
        console.log('dsadas');
        if (!error) return;
        errorHandler(dispatch, error.response, RESET_PASSWORD_FAILED);
        const formField = error.response.data.type;
        let submissionError = {}; // eslint-disable-line
        submissionError[formField] = error.response.data.error;
        submissionError._error = error.response.data.error;
        throw new SubmissionError(submissionError);
      });
  };
};

/**
 * TEST
 * @param user
 * @returns {function(*, *)}
 */
function test(user) { // eslint-disable-line
  return (dispatch) => { // eslint-disable-line
    return axios.post(API_URL + 'user/test', { user: user }, {
      headers: { 'Authorization': cookie.load('token') }
    }).then(response => {
      console.log(response);
    });
  };
}

module.exports = {
  logoutUser, loginUser, checkAuth, signUpUser, redirect, authFormsValidator, resetPassword
};
