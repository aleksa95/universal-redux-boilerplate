/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0 */
import React from 'react';

export default class App extends React.Component {
  render() {
    return <div className={require('./../index.scss').app}>{this.props.children}</div>;
  }
}

App.propTypes = {
  children: React.PropTypes.any,
};
