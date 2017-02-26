/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import UserList from '../../components/user-list';
import UserDetails from '../../components/user-details';

export default class Homepage extends React.Component {
  render() {
    const styles = require('./_homepage.scss');
    // const divStyle = {
    //   background: 'url(' + require('../../images/logo.png') + ') no-repeat center center',
    //   backgroundSize: '100% 100%',
    // };
    return (
      <div className={ styles.homepage }>
        <div className={ styles['homepage-header'] }>
          <h1>Short Description</h1>
        </div>

        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
      </div>
    );
  }
}
