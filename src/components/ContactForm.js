import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {formGroup, formGroupTextarea }from './contactFormElements';
import {contactValidator} from '../actions/contactActions';

const styles = require('../containers/Contact/contact.scss');

let ContactForm = ({handleSubmit, pristine, submitting, invalid}) => ( // eslint-disable-line
  <form className={styles['contact-form']} onSubmit={handleSubmit}>
    <Field name="email" component={formGroup} placeholder="Email" type="text"
           wrapperClassName={styles['contact-form-input-group']}
           inputClassName={styles['contact-form-input']}
           errorClassName={styles['contact-form-error']}/>

    <Field name="message" component={formGroupTextarea} placeholder="Message"
           wrapperClassName={styles['contact-form-input-group']}
           inputClassName={styles['contact-form-input']}
           errorClassName={styles['contact-form-error']}/>
    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button>
  </form>
);

const validate = contactValidator;

export default reduxForm({form: 'login', validate})(ContactForm);
