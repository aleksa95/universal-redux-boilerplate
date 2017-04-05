import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../../components/singUpForm';
import { signUpUser } from '../../../actions/auth-actions';

const SGUStyles = require('../_authentication.scss');

const SignUp = ({ signUpUser }) => (
  <div className={SGUStyles['authentication-wrapper']}>
    <div className={SGUStyles['authentication-title']}>Sign Up Page</div>
    <SignUpForm onSubmit={ signUpUser } />
  </div>
);

SignUp.propTypes = {
  signUpUser: React.PropTypes.func,
};

export default connect(null, { signUpUser })(SignUp);
