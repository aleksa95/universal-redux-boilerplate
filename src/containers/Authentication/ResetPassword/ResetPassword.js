import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirect, resetPassword, checkIfResetPasswordTokenIsValid } from '../../../actions/auth-actions';
import ResetPasswordForm from '../../../components/ResetPasswordForm';

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
            <ResetPasswordForm initialValues={{userId: this.props.user._id}} onSubmit={this.props.resetPassword.bind(this)}/>
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
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userResetEmail: state.auth.ResetPassword,
    resetTokenError: state.auth.resetTokenError,
    error: state.auth.error,
    user: state.auth.resetPassUser
  };
};

export default connect(mapStateToProps, { redirect, resetPassword, checkIfResetPasswordTokenIsValid })(ResetPassword);
