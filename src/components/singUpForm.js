import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';
import { authFormsValidator } from '../actions/auth/authActionCreators';

const styles = require('../containers/Authentication/_authentication.scss');

let SignUpForm = ({ handleSubmit, pristine, submitting, invalid }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} type="text" placeholder="Email"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <Field name="password" component={formGroup} type="password" placeholder="Password"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>
  </form>
);

const validator = authFormsValidator;

SignUpForm = reduxForm({
  form: 'signUp',
  validator
})(SignUpForm);

export default SignUpForm;
