/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import cookie from 'react-cookie';
import { IndexRoute, Route } from 'react-router';
import { App, Homepage, NotFound, Login, SignUp, Dashboard, EnsureAuthentication, ForgotPassword, ForgotPasswordSuccess, ResetPassword, EnsureUnAuthentication } from './containers';
import { checkAuth as _checkAuth } from './actions/auth-actions';

export default (store) => { // eslint-disable-line
  const checkAuth = () => {
    return store.dispatch(_checkAuth(cookie.load('token'))); // eslint-disable-line
  };

  return (
    <Route path="/" onEnter={checkAuth} component={App}>
      <IndexRoute component={Homepage} />

      <Route path="" component={EnsureUnAuthentication}>
        <Route path="sign-up" component={SignUp} />
        <Route path="login" component={Login} />
        <Route path="forgot-password" component={ForgotPassword} />
        <Route path="forgot-password-success" component={ForgotPasswordSuccess} />
        <Route path="reset/:token" component={ResetPassword} />
      </Route>

      <Route component={EnsureAuthentication}>
        <Route path="/dashboard" component={Dashboard} />
      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
