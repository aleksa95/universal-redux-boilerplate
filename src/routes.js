/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Homepage, NotFound, Login, SignUp } from './containers';

export default (store) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      <Route path="sign-up" component={SignUp} />
      <Route path="login" component={Login} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
