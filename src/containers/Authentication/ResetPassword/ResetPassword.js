import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { redirect, resetPassword, checkIfResetPasswordTokenIsValid } from '../../../actions/auth/authActionCreators';
import ResetPasswordForm from '../../../components/ResetPasswordForm';

const RPAStyles = require('../_authentication.scss');
const RPSStyles = require('../ForgotPassword/forgotPasswordSuccess.scss');

class ResetPassword extends Component {

  componentWillMount() {
    const resetPasswordToken = this.props.params.token;
    if (!resetPasswordToken ) {
      this.props.redirect('/');
    }

    this.props.checkIfResetPasswordTokenIsValid({token: resetPasswordToken});
  }

  render() {
    return (
      <div>
        { this.props.resetTokenError &&
          <div className={RPSStyles['forgot-password-success-wrapper']}>
            <h3>{ this.props.error }</h3>
          </div>
        }

        { !this.props.resetTokenError && !this.props.resetPasswordSuccess &&
          <div className={RPAStyles['authentication-wrapper']}>
            <div className={RPAStyles['authentication-title']}>Reset password</div>
            <ResetPasswordForm userId={this.props.user._id} onSubmit={this.props.resetPassword.bind(this)}/>
          </div>
        }
        { !this.props.resetTokenError && this.props.resetPasswordSuccess &&
          <div className={RPSStyles['forgot-password-success-wrapper']}>
            <h3>You have successfully reset your password. Go <Link to="/login">Login</Link></h3>
          </div>
        }
      </div>
    );
  }
}

ResetPassword.propTypes = {
  checkIfResetPasswordTokenIsValid: PropTypes.func,
  resetPassword: PropTypes.func,
  userResetEmail: PropTypes.string,
  redirect: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  resetTokenError: PropTypes.bool,
  params: PropTypes.object,
  user: PropTypes.object,
  resetPasswordSuccess: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
    userResetEmail: state.auth.ResetPassword,
    resetTokenError: state.auth.resetTokenError,
    error: state.auth.error,
    user: state.auth.resetPassUser
  };
};

export default connect(mapStateToProps, { redirect, resetPassword, checkIfResetPasswordTokenIsValid })(ResetPassword);
