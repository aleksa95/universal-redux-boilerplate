import { apiHost, apiPort } from '../../config/env';
import axios from 'axios';
import cookie from 'react-cookie';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST, AUTHENTICATE, AUTHENTICATATION_SUCCESS, AUTHENTICATATION_FAILED } from './types';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

const API_URL = `http://${apiHost}:${apiPort}/api`;

function logoutUser() {
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    dispatch(push('/'));
  };
}

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

function loginUser({ email, password }) {
  return (dispatch) => {
    return axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        setNewToken(response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        if (!error) return;
        errorHandler(dispatch, error.response, AUTH_ERROR);
        const formField = error.response.data.type;
        let submissionError = {}; // eslint-disable-line
        submissionError[formField] = error.response.data.error;
        submissionError._error = error.response.data.error;
        throw new SubmissionError(submissionError);
      });
  };
}

function registerUser({ email, password }) {
  return (dispatch) => {
    return axios.post(`${API_URL}/auth/register`, { email, password })
      .then(response => {
        setNewToken(response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
        const formField = error.response.data.type;
        let submissionError = {}; // eslint-disable-line
        submissionError[formField] = error.response.data.error;
        submissionError._error = error.response.data.error;
        throw new SubmissionError(submissionError);
      });
  };
}

export function protectedTest() {
  return function(dispatch) { // eslint-disable-line
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
      .then(response => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

function checkAuth(token) {
  return function(dispatch) {
    const isTokenPresent = !!token;
    dispatch({
      type: AUTHENTICATE
    });

    if (isTokenPresent) {
      axios.get(`${API_URL}/auth/authenticate`, {
        headers: { 'Authorization': cookie.load('token') }
      }).then(response => {
        setNewToken(response.data.token);
        dispatch({
          type: AUTHENTICATATION_SUCCESS,
          payload: response.data.user
        });
      })
        .catch((error) => {
          dispatch({
            type: AUTHENTICATATION_FAILED,
            payload: error
          });
        });
    } else {
      dispatch({
        type: AUTHENTICATATION_FAILED
      });
    }
  };
}

function redirect(route) {
  return function(dispatch) {
    dispatch(push(route));
  };
}

module.exports = {
  logoutUser, loginUser, checkAuth, registerUser, redirect
};
