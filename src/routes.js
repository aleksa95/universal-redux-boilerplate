/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import cookie from 'react-cookie';
import { IndexRoute, Route } from 'react-router';
import { App, Homepage, NotFound, Login, SignUp, Dashboard, EnsureAuthentication } from './containers';
import { checkAuth as _checkAuth } from './actions/auth-actions';

export default (store) => { // eslint-disable-line

  function checkAuth() {
    return store.dispatch(_checkAuth(cookie.load('token'))); // eslint-disable-line
  }

  return (
    <Route path="/" onEnter={checkAuth} component={App}>
      <IndexRoute component={Homepage} />
      <Route path="sign-up" component={SignUp} />
      <Route path="login" component={Login} />

      <Route component={EnsureAuthentication}>
        <Route path="/dashboard" component={Dashboard} />
      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
