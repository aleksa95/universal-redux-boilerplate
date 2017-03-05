import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';

const styles = require('../containers/Authentication/_authentication.scss');

let SignUpForm = ({ handleSubmit, pristine, submitting }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} type="text" placeholder="Email"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <Field name="password" component={formGroup} type="password" placeholder="Password"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <button type="submit" disabled={pristine || submitting}>Submit</button>
  </form>
);

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

SignUpForm = reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);

export default SignUpForm;
