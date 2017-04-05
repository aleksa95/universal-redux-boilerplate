import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';

const FPFStyles = require('../containers/Authentication/_authentication.scss');

let ForgotPasswordForm = ({ handleSubmit, pristine, submitting, invalid }) => ( // eslint-disable-line
  <form className={FPFStyles['authentication-form']} onSubmit={ handleSubmit }>
    <Field name="email" component={formGroup} placeholder="Email" type="text"
           wrapperClassName={FPFStyles['authentication-form-input-group']}
           inputClassName={FPFStyles['authentication-form-input']}
           errorClassName={FPFStyles['authentication-form-error']}/>

    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>
  </form>
);

const validate = values => {
  const errors = {};

  if (!values.email) errors.email = 'Required';

  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  validate
})(ForgotPasswordForm);

export default ForgotPasswordForm;
