import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../../../components/loginForm';
import { loginUser } from '../../../actions/auth-actions';

const LGStyles = require('../_authentication.scss');

const Login = ({ loginUser }) => (
  <div className={LGStyles['authentication-wrapper']}>
    <div className={LGStyles['authentication-title']}>Login</div>
    <LoginForm onSubmit={ loginUser } />
  </div>
);

Login.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, { loginUser })(Login);
