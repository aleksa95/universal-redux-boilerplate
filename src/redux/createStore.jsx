/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
import { routerMiddleware } from 'react-router-redux';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

function createStoreWithReducer(history, data, reducer) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [reduxRouterMiddleware, reduxThunk];

  let finalCreateStore;

  if (process.env.NODE_ENV === 'development' && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      global.devToolsExtension ? global.devToolsExtension() : DevTools.instrument(),
      persistState(global.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  let store = finalCreateStore(reducer, data); // eslint-disable-line

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

function createStore(history, data) {
  return createStoreWithReducer(history, data, require('../reducers'));
}

module.exports = {
  createStore,
};
