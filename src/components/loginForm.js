import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && ((error && <span>{error}</span>))}
  </div>
);

let LoginForm = ({ handleSubmit, pristine, submitting }) => ( // eslint-disable-line
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" component={renderField} type="text"/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <Field name="password" component={renderField} type="password"/>
    </div>
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
