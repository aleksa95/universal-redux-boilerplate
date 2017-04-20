/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

export default class App extends React.Component {
  render() {
    return <div className={require('./../index.scss').app}><Header />{this.props.children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.any,
};
