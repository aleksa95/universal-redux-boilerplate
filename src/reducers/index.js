import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

module.exports = combineReducers({
  form: formReducer,
  routing: routerReducer,
});
