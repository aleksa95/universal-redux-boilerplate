import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';
import { Link } from 'react-router';
import classNames from 'classnames';
import { authFormsValidator } from '../actions/auth/authActionCreators';

const LGFStyles = require('../containers/Authentication/_authentication.scss');
const LGFIcons = require('../styles/font-awesome.scss');

let LoginForm = ({ handleSubmit, pristine, submitting, invalid, facebookLogin }) => ( // eslint-disable-line
  <form className={classNames(LGFStyles['authentication-form'], 'login-form')} onSubmit={handleSubmit}>

    <a className={LGFStyles['social-media-auth-link']} href="http://localhost:3000/api/auth/facebook">
      <i className={classNames(LGFStyles['facebook-logo'], LGFIcons.fa, LGFIcons['fa-facebook'])}></i>
      <button className={LGFStyles['facebook-button']} type="button">Login with Facebook</button>
    </a>

    <a className={LGFStyles['social-media-auth-link']} href="http://localhost:3000/api/auth/twitter">
      <i className={classNames(LGFStyles['twitter-logo'], LGFIcons.fa, LGFIcons['fa-twitter'])}></i>
      <button className={LGFStyles['twitter-button']} type="button">Login with Twitter</button>
    </a>

    <div className={LGFStyles['auth-separator']}>OR</div>

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
  </form>
);

const validate = authFormsValidator;

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
