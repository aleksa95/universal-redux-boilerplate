import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactForm from '../../components/ContactForm';
import { sendContact } from '../../actions/contactActions';
import PropTypes from 'prop-types';

class Contact extends Component {
  submit(values) {
    return this.props.sendContact(values);
  }

  render() {
    return (
      <div>
      	<h1>Contact</h1>
        <ContactForm onSubmit={this.submit.bind(this)} />
      </div>
    );
  }
}

Contact.propTypes = {
  sendContact: PropTypes.func,
};

export default connect(null, { sendContact })(Contact);
