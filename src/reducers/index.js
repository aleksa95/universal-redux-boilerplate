import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {CONTACT, CONTACT_SUCCESS, CONTACT_ERROR} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  email: '',
  sentContact: false,
  sendingContact: false
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT:
      return {...state, sendingContact: true, email: action.payload.email, message: action.payload.message};
    case CONTACT_SUCCESS:
      return {...state, sendingContact: false, error: false};
    case CONTACT_ERROR:
      return {...state, sendingContact: false, error: action.payload};

    default:
      return state;
  }
};

module.exports = combineReducers({
  form: formReducer,
  routing: routerReducer,
  contact: contactReducer
});
