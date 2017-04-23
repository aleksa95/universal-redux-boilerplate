import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';
import { Link } from 'react-router';
import classNames from 'classnames';
import { authFormsValidator } from '../actions/auth/authActionCreators';

const LGFStyles = require('../containers/Authentication/_authentication.scss');

let LoginForm = ({ handleSubmit, pristine, submitting, invalid, facebookLogin }) => ( // eslint-disable-line
  <form className={classNames(LGFStyles['authentication-form'], 'login-form')} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} placeholder="Email" type="text"
           wrapperClassName={LGFStyles['authentication-form-input-group']}
           inputClassName={LGFStyles['authentication-form-input']}
           errorClassName={LGFStyles['authentication-form-error']}/>

    <Field name="password" component={formGroup} placeholder="Password" type="password"
           wrapperClassName={LGFStyles['authentication-form-input-group']}
           inputClassName={LGFStyles['authentication-form-input']}
           errorClassName={LGFStyles['authentication-form-error']}/>

    <div className={LGFStyles['forgot-password-wrapper']}>
      <Field name="rememberMe" component={formGroup} type="checkbox"
             showLabel="true" labelText="Remember me" id="rememberMe"
             wrapperClassName={LGFStyles['authentication-form-remember-me-wrapper']}
             inputClassName={LGFStyles['authentication-form-checkbox']}/>

      <Link to="/forgot-password">Forgot password?</Link>
    </div>
    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>

    <a href="http://localhost:3000/api/auth/facebook"><button type="button">Facebook</button></a>
  </form>
);

const validate = authFormsValidator;

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
