import React from 'react';
import ForgotPasswordForm from '../../../components/forgotPasswordForm';
import { connect } from 'react-redux';
import { resetPassword } from '../../../actions/auth-actions';

const FPStyles = require('../_authentication.scss');

let ForgotPassword = ({ resetPassword }) => ( // eslint-disable-line
  <div className={FPStyles['authentication-wrapper']}>
    <div className={FPStyles['authentication-title']}>Reset password</div>

    <ForgotPasswordForm onSubmit={resetPassword}/>
  </div>
);

ForgotPassword.propTypes = {
  loginUser: React.PropTypes.func,
};

export default connect(null, { resetPassword })(ForgotPassword);
