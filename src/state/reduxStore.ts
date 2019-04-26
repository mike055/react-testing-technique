import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import logger from 'redux-logger'

import reducer from './reducer';

let composeEnhancers = compose;

let middleware: Array<Middleware> = [];

if (process.env.NODE_ENV === "development") {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middleware.push(logger);
}

const newStore = () => {
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  );
};

export default newStore;
