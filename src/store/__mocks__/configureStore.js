import { init } from '@rematch/core';
import models from '../../models';

export default function configureStore(initialState) {
  // https://redux.js.org/docs/api/createStore.html
  const store = init({
    redux: {
      initialState,
    },
    models,
  });

  return store;
}
