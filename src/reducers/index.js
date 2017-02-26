import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import usersReducer from './reducer-users';
import activeUserReducer from './reducer-active-user';
import { reducer as formReducer } from 'redux-form';

module.exports = combineReducers({
  form: formReducer,
  users: usersReducer,
  activeUser: activeUserReducer,
  routing: routerReducer,
});
