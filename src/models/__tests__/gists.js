/* eslint-env jest */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { init } from '@rematch/core';
import gists from '../gists';

describe('gists model', () => {
  let store;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    store = init({
      models: {
        gists,
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('reducers', () => {
    test('fetchLoading should set fetching and query', () => {
      store.dispatch.gists.fetchLoading('randomvalue');

      expect(store.getState().gists.fetching).toBe(true);
      expect(store.getState().gists.query).toBe('randomvalue');
    });

    test('fetchSuccess should set results and fetching and failure to false', () => {
      store.dispatch.gists.fetchSuccess(['holla']);

      expect(store.getState().gists.fetching).toBe(false);
      expect(store.getState().gists.results).toEqual(['holla']);
    });

    test('fetchFailure should set results and fetching and failure', () => {
      store.dispatch.gists.fetchFailure({ message: 'whoops' });

      expect(store.getState().gists.fetching).toBe(false);
      expect(store.getState().gists.results).toEqual([]);
      expect(store.getState().gists.failure.message).toBe('whoops');
    });

    test('fetchForkSuccess should append forks into the right gist result', () => {
      const initialState = {
        gists: {
          query: '',
          results: [
            {
              id: 1,
            },
          ],
          failure: null,
          fetching: false,
        },
      };
      store = init({
        redux: {
          initialState,
        },
        models: {
          gists,
        },
      });

      store.dispatch.gists.fetchForkSuccess({ id: 1, forks: ['holla'] });

      expect(
        store.getState().gists.results.find(gist => gist.id === 1).forks,
      ).toEqual(['holla']);
    });

    test('fetchForkFailure should append forksError into the right gist result', () => {
      const initialState = {
        gists: {
          query: '',
          results: [
            {
              id: 1,
            },
          ],
          failure: null,
          fetching: false,
        },
      };
      store = init({
        redux: {
          initialState,
        },
        models: {
          gists,
        },
      });

      store.dispatch.gists.fetchForkFailure({ id: 1, error: 'whoops' });

      expect(
        store.getState().gists.results.find(gist => gist.id === 1).forksError,
      ).toEqual('whoops');
    });
  });

  describe('effects', () => {
    test('fetchGistsByUsername set results correctly', done => {
      store = init({
        models: {
          gists,
        },
      });

      store.dispatch.fetchRequest = jest.fn().mockResolvedValue([]);

      mock.onGet('https://api.github.com/users/userX/gists').reply(200, [
        {
          id: 1,
          forks_url:
            'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
        },
        {
          id: 2,
          forks_url:
            'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
        },
      ]);

      mock
        .onGet(
          'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
        )
        .reply(200, [
          {
            id: 1,
            forks_url:
              'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
          },
          {
            id: 2,
            forks_url:
              'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
          },
        ]);

      store.dispatch.gists.fetchGistsByUsername('userX');

      setTimeout(() => {
        expect(store.getState().gists.results).toEqual([
          {
            id: 1,
            forks_url:
              'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
            forks: [
              {
                id: 1,
                forks_url:
                  'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
              },
              {
                id: 2,
                forks_url:
                  'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
              },
            ],
          },
          {
            id: 2,
            forks_url:
              'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
            forks: [
              {
                id: 1,
                forks_url:
                  'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
              },
              {
                id: 2,
                forks_url:
                  'https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d',
              },
            ],
          },
        ]);
        done();
      }, 300);
    });
  });
});
