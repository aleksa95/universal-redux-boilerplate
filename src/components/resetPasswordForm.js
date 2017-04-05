import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';

const FPFStyles = require('../containers/Authentication/_authentication.scss');

let ResetPasswordForm = ({ handleSubmit, pristine, submitting, invalid }) => ( // eslint-disable-line
  <form className={FPFStyles['authentication-form']} onSubmit={ handleSubmit }>
    <Field name="currentPassword" component={formGroup} placeholder="Current password" type="password"
           wrapperClassName={FPFStyles['authentication-form-input-group']}
           inputClassName={FPFStyles['authentication-form-input']}
           errorClassName={FPFStyles['authentication-form-error']}/>

    <Field name="newPassword" component={formGroup} placeholder="New password" type="password"
           wrapperClassName={FPFStyles['authentication-form-input-group']}
           inputClassName={FPFStyles['authentication-form-input']}
           errorClassName={FPFStyles['authentication-form-error']}/>

    <Field name="newPasswordRepeat" component={formGroup} placeholder="Repeat new password" type="password"
           wrapperClassName={FPFStyles['authentication-form-input-group']}
           inputClassName={FPFStyles['authentication-form-input']}
           errorClassName={FPFStyles['authentication-form-error']}/>

    <Field name="userId" component={formGroup} type="hidden"
           wrapperClassName={FPFStyles['authentication-form-input-group']}
           inputClassName={FPFStyles['authentication-form-input']}
           errorClassName={FPFStyles['authentication-form-error']}/>

    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>
  </form>
);

const validate = values => {
  const errors = {};

  if (!values.currentPassword) errors.currentPassword = 'Required';
  if (!values.newPassword) errors.newPassword = 'Required';
  if (!values.newPasswordRepeat) errors.newPasswordRepeat = 'Required';

  else if (values.newPassword !== values.newPasswordRepeat) {
    errors.newPasswordRepeat = 'Passwords do not match';
  }

  return errors;
};

ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  validate
})(ResetPasswordForm);

export default ResetPasswordForm;
