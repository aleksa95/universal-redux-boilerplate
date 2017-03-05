/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

export default class Homepage extends React.Component {
  render() {
    const styles = require('./_homepage.scss');
    return (
      <div className={ styles.homepage }>
        <div className={ styles['homepage-header'] }>
          <h1>Homepage</h1>
        </div>
      </div>
    );
  }
}
