/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import UserList from '../components/user-list';
import UserDetails from '../components/user-details';

export default class Home extends React.Component {
  componentDidMount() {

  }


  render() {
    const styles = require('./home.scss');
    return (
      <div className={ styles.root }>
        Home
        {/* <img src={ require("../images/logo.png") } alt=""/>*/}

        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
      </div>
    );
  }
}
