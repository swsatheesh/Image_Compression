import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reduxReset from 'redux-reset';
import InitObject from '../../config/config';
import ComposserReducer from '../../reducer/composser_reducer';

// cdloReducerObject is a object containing the reducers used in the experiment cdlo.
export default function createStoreHelper() {
  const store = createStore(ComposserReducer, InitObject, compose(
    applyMiddleware(thunk, createLogger()),
    reduxReset(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}
