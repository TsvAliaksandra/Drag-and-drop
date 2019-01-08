import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

export default createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(promise(), thunk))
);
