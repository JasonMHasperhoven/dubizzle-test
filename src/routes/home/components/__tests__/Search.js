/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from '../../../../store/configureStore';
import Search from '../Search';

jest.mock('../../../../store/configureStore');

const mockStore = {
  gists: {},
};

describe('Search component', () => {
  const store = configureStore(mockStore);
  const fetchGistsByUsernameSpy = jest.spyOn(
    store.dispatch.gists,
    'fetchGistsByUsername',
  );
  const search = shallow(<Search store={store} />);

  test('should render properly', () => {
    expect(search).toHaveLength(1);
  });

  test('should debounce fetchGistsByUsername onSearchInputChange', done => {
    const input = search
      .dive()
      .find('Search__Input')
      .dive()
      .find('input');

    input.simulate('change', {
      target: {
        value: 'somevalue',
      },
    });

    setTimeout(() => {
      expect(fetchGistsByUsernameSpy).toHaveBeenCalledWith('somevalue');
      done();
    }, 350);
  });
});
