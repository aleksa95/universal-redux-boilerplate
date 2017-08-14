import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logoutUser } from '../../actions/auth-actions';
import PropTypes from 'prop-types';

class Header extends Component {

  render() {
    const styles = require('./_header.scss');
    return (
      <header className={ styles.header }>
        <div className="left-section">
          <Link to="/">Logo</Link>
        </div>
        {!this.props.isUserAuthenticated &&
        <div className="right-section">
          <Link to="/login">Login</Link>
          <Link to="/sign-up" className={ styles['sign-up-link'] }>Sign Up</Link>
        </div> }
        {this.props.isUserAuthenticated &&
        <div className="right-section">
          <div className={ styles['sign-out-btn'] } onClick={ this.props.logoutUser }>Logout</div>
        </div> }
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
  isUserAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    location: state.routing.locationBeforeTransitions.location,
    isUserAuthenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
