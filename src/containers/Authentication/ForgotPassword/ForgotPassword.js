import React from 'react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../../../components/forgotPasswordForm';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/auth/authActionCreators';

const FPStyles = require('../_authentication.scss');

let ForgotPassword = ({ forgotPassword }) => ( // eslint-disable-line
  <div className={FPStyles['authentication-wrapper']}>
    <div className={FPStyles['authentication-title']}>Reset password</div>

    <ForgotPasswordForm onSubmit={forgotPassword}/>
  </div>
);

ForgotPassword.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, { forgotPassword })(ForgotPassword);
