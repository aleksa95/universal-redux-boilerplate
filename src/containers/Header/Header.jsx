import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logoutUser } from '../../actions/auth-actions';

const HStyles = require('./_header.scss');

const Header = ({ isUserAuthenticated, isUserAuthenticating, logoutUser }) => (
  <header className={ HStyles.header }>
    <div className="left-section">
      <Link to="/">Logo</Link>
    </div>

    {!isUserAuthenticated && !isUserAuthenticating &&
    <div className="right-section">
      <Link to="/login">Login</Link>
      <Link to="/sign-up" className={ HStyles['sign-up-link'] }>Sign Up</Link>
    </div> }

    {isUserAuthenticated && !isUserAuthenticating &&
    <div className="right-section">
      <div className={ HStyles['sign-out-btn'] } onClick={ logoutUser }>Logout</div>
    </div> }
  </header>
);

Header.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  isUserAuthenticating: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.authenticated,
    isUserAuthenticating: state.auth.authenticating
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
