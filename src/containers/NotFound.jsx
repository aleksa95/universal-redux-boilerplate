/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
export default class NotFound extends React.Component {

  render() {
    const styles = require('./notFound.scss');
    return <div className={styles.bla}>NotFound</div>;
  }
}