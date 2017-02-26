import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import usersReducer from './reducer-users';
import activeUserReducer from './reducer-active-user';

module.exports = combineReducers({
  users: usersReducer,
  activeUser: activeUserReducer,
  routing: routerReducer,
});
