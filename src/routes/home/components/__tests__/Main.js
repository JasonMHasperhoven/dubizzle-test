/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from '../../../../store/configureStore';
import Main from '../Main';

jest.mock('../../../../store/configureStore');

describe('Main component', () => {
  test('should render No gists to show by default', () => {
    const mockStore = {
      gists: {
        query: '',
        results: [],
        failure: null,
        fetching: false,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    expect(
      main
        .dive()
        .find('Main__Card')
        .render()
        .text(),
    ).toBe('No gists to show');
  });

  test('should render loader when fetching', () => {
    const mockStore = {
      gists: {
        query: '',
        results: [],
        failure: null,
        fetching: true,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    const placeholderTitle = main
      .dive()
      .find('Main__Card')
      .dive()
      .find('Main__PlaceholderTitle');

    expect(placeholderTitle).toHaveLength(1);
  });

  test('should render not found message when failure', () => {
    const mockStore = {
      gists: {
        query: 'userX',
        results: [],
        failure: {
          message: 'Not Found',
        },
        fetching: false,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    expect(
      main
        .dive()
        .find('Main__Card')
        .render()
        .text(),
    ).toContain('Couldn’t find user');
  });

  test('should render error message when unknown failure', () => {
    const mockStore = {
      gists: {
        query: 'userX',
        results: [],
        failure: {
          message: 'random',
        },
        fetching: false,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    expect(
      main
        .dive()
        .find('Main__Card')
        .render()
        .text(),
    ).toContain('Something went wrong');
  });

  test('should render No gists to show when there’s no results', () => {
    const mockStore = {
      gists: {
        query: 'userX',
        results: [],
        failure: null,
        fetching: false,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    expect(
      main
        .dive()
        .find('Main__Card')
        .render()
        .text(),
    ).toContain('No gists to show');
  });

  test('should render gists correctly', () => {
    const mockStore = {
      gists: {
        query: 'userX',
        results: [
          {
            description: 'gist1',
            files: {
              a: {
                filename: 'a',
                language: 'javascript',
              },
            },
            created_at: '2018-06-21T00:53:55Z',
          },
          {
            description: 'gist2',
            files: {
              b: {
                filename: 'b',
                language: 'ruby',
              },
            },
            created_at: '2018-06-28T00:53:55Z',
          },
        ],
        failure: null,
        fetching: false,
      },
    };
    const store = configureStore(mockStore);
    const main = shallow(<Main store={store} />);

    expect(main.dive().find('Main__Card')).toHaveLength(2);
    expect(main.dive().find('Main__GistTitle')).toHaveLength(2);
  });
});
