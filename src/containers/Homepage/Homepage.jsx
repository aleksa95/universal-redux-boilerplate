/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import UserList from '../../components/user-list';
import UserDetails from '../../components/user-details';

export default class Homepage extends React.Component {
  render() {
    const styles = require('./_homepage.scss');
    return (
      <div className={ styles.root }>
        Homepage
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
      </div>
    );
  }
}
