import { applyMiddleware } from 'redux';
import { init } from '@rematch/core';
import createLogger from './logger';
import models from '../models';

export default function configureStore(initialState) {
  const middleware = [];

  let devtoolOptions = f => f;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    if (process.env.BROWSER && window.devToolsExtension) {
      devtoolOptions = window.devToolsExtension();
    }
  }

  // https://redux.js.org/docs/api/createStore.html
  const store = init({
    redux: {
      initialState,
      enhancers: [applyMiddleware(...middleware)],
      ...(__DEV__
        ? {
            devtoolOptions,
          }
        : {}),
    },
    models,
  });

  return store;
}
