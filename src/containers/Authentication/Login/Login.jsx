import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../../../components/loginForm';
import { loginUser, facebookLogin } from '../../../actions/auth/authActionCreators';

const LGStyles = require('../_authentication.scss');

const Login = ({ loginUser, facebookLogin }) => (
  <div className={LGStyles['authentication-wrapper']}>
    <div className={LGStyles['authentication-title']}>Login</div>
    <LoginForm onSubmit={ loginUser } facebookLogin={ facebookLogin } />
  </div>
);

Login.propTypes = {
  loginUser: PropTypes.func,
  facebookLogin: PropTypes.func
};

export default connect(null, { loginUser, facebookLogin })(Login);
