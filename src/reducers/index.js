import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth-reducer';

module.exports = combineReducers({
  auth: authReducer,
  form: formReducer,
  routing: routerReducer,
});
