import React from 'react';
import { Field, reduxForm } from 'redux-form';
import formGroup from './authenticationFormGroup';
import classNames from 'classnames';
import { authFormsValidator } from '../actions/auth/authActionCreators';

const styles = require('../containers/Authentication/_authentication.scss');
const icons = require('../styles/font-awesome.scss');

let SignUpForm = ({ handleSubmit, pristine, submitting, invalid }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>

    <a className={styles['social-media-auth-link']} href="http://localhost:3000/api/auth/facebook">
      <button className={styles['facebook-button']} type="button">
        <i className={classNames(styles['facebook-logo'], icons.fa, icons['fa-facebook'])}></i>
        Sign up with Facebook
      </button>
    </a>

    <a className={styles['social-media-auth-link']} href="http://localhost:3000/api/auth/twitter">
      <button className={styles['twitter-button']} type="button">
        <i className={classNames(styles['twitter-logo'], icons.fa, icons['fa-twitter'])}></i>
        Sign up with Twitter
      </button>
    </a>

    <div className={styles['auth-separator']}>OR</div>

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

const validate = authFormsValidator;
SignUpForm = reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);

export default SignUpForm;
