import {CONTACT, CONTACT_SUCCESS, CONTACT_ERROR} from '../actions/types'; // eslint-disable-line

const contactValidator = values => {
  const errors = {};

  if (!values.email) errors.email = 'Required';

  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.message) errors.message = 'Required';

  return errors;
};

const sendContact = ({ email, message }) => {
  return (dispatch) => {
    dispatch({type: CONTACT, payload: { email, message }});
  };
};


module.exports = {
  contactValidator, sendContact
};
