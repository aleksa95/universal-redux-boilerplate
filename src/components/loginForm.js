import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';

const styles = require('../containers/Authentication/_authentication.scss');

let LoginForm = ({ handleSubmit, pristine, submitting }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} placeholder="Email" type="text"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <Field name="password" component={formGroup} placeholder="Password" type="password"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <Field name="rememberMe" id="rememberMe" component={formGroup} placeholder="Password" type="checkbox"
           showLabel="true" labelText="Remember me" labelClass={styles['authentication-form-remember-me-label']}
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-checkbox']}/>

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

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
