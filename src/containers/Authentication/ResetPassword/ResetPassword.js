import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirect, resetPassword, checkIfResetPasswordTokenIsValid } from '../../../actions/auth-actions';

const RPAStyles = require('../_authentication.scss');

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
          <div>{ this.props.error }</div>
        }

        { !this.props.resetTokenError &&
          <div className={RPAStyles['authentication-wrapper']}>
            <div className={RPAStyles['authentication-title']}>Reset password</div>
          </div>
        }
      </div>
    );
  }
}

ResetPassword.propTypes = {
  checkIfResetPasswordTokenIsValid: PropTypes.func,
  userResetEmail: PropTypes.string,
  redirect: PropTypes.func,
  error: PropTypes.string,
  resetTokenError: PropTypes.bool,
  params: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userResetEmail: state.auth.ResetPassword,
    resetTokenError: state.auth.resetTokenError,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { redirect, resetPassword, checkIfResetPasswordTokenIsValid })(ResetPassword);
