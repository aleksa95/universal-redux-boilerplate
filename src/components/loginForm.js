import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';
import { authFormsValidator } from '../actions/auth-actions';

const styles = require('../containers/Authentication/_authentication.scss');

let LoginForm = ({ handleSubmit, pristine, submitting, invalid }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} placeholder="Email" type="text"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>

    <Field name="password" component={formGroup} placeholder="Password" type="password"
           wrapperClassName={styles['authentication-form-input-group']}
           inputClassName={styles['authentication-form-input']}
           errorClassName={styles['authentication-form-error']}/>
    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>
  </form>
);

const validate = authFormsValidator;

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
