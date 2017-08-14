/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Homepage, NotFound, AboutUs, Projects, Careers, Contact } from './containers';

export default stores => { // eslint-disable-line

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      <Route path="about-us" component={AboutUs} />
      <Route path="projects" component={Projects} />
      <Route path="careers" component={Careers} />
      <Route path="contact" component={Contact} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
