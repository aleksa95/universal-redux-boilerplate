import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../../components/singUpForm';
import { signUpUser } from '../../../actions/auth/authActionCreators';

const SGUStyles = require('../_authentication.scss');

const SignUp = ({ signUpUser, signUpError, error }) => (
  <div>
    { !signUpError &&
    <div className={SGUStyles['authentication-wrapper']}>
      <div className={SGUStyles['authentication-title']}>Sign up</div>
      <SignUpForm onSubmit={ signUpUser } />
    </div> }

    { signUpError && <div className={SGUStyles['authentication-error-wrapper']}>ERROR { error } </div> }
  </div>
);

SignUp.propTypes = {
  signUpUser: PropTypes.func,
  signUpError: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const mapStateToProps = (state) => {
  return {
    signUpError: state.auth.signUpError,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { signUpUser })(SignUp);
