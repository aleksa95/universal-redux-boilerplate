import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirect } from '../../../actions/auth-actions';

const FPSStyles = require('./forgotPasswordSuccess.scss');

class ForgotPasswordSuccess extends Component {
  componentWillMount() {
    if (!this.props.userResetEmail) {
      this.props.redirect('/');
    }
  }

  render() {
    return (
      <div className={FPSStyles['forgot-password-success-wrapper']}>
        <h3>An e-mail has been sent to <strong>{ this.props.userResetEmail }</strong> with further instructions.</h3>
      </div>
    );
  }
}

ForgotPasswordSuccess.propTypes = {
  userResetEmail: PropTypes.string,
  redirect: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    userResetEmail: state.auth.userResetEmail,
  };
};

export default connect(mapStateToProps, { redirect })(ForgotPasswordSuccess);
