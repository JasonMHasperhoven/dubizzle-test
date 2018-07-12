import axios, { CancelToken, isCancel } from 'axios';

let cancelTokens = [];

export default {
  state: {
    query: '',
    results: [],
    fetching: false,
    failure: null,
  },

  reducers: {
    fetchLoading(state, payload) {
      return {
        ...state,
        query: payload,
        fetching: true,
      };
    },

    fetchSuccess(state, payload) {
      return {
        ...state,
        results: payload,
        fetching: false,
        failure: null,
      };
    },

    fetchFailure(state, payload) {
      return {
        ...state,
        results: [],
        fetching: false,
        failure: payload,
      };
    },

    fetchForkSuccess(state, payload) {
      return {
        ...state,
        results: state.results.findAndReplace(
          gist => gist.id === payload.id,
          gist => ({
            ...gist,
            forks: payload.forks,
          }),
        ),
      };
    },

    fetchForkFailure(state, payload) {
      return {
        ...state,
        results: state.results.findAndReplace(
          gist => gist.id === payload.id,
          gist => ({
            ...gist,
            forksError: payload.error,
          }),
        ),
      };
    },
  },

  effects: {
    fetchGistsByUsername(username) {
      if (cancelTokens.length) {
        this.fetchCancel();
      }

      this.fetchLoading(username);
      this.fetchRequest(username);
    },

    fetchRequest(username) {
      return axios({
        method: 'get',
        url: `https://api.github.com/users/${username}/gists`,
        cancelToken: new CancelToken(cancel => {
          cancelTokens.push(cancel);
        }),
        headers: {
          Authorization: 'token c2ae30fae68543e211e663725907eb3f9afb1425',
        },
      })
        .then(
          resp =>
            this.fetchSuccess(resp.data) && this.fetchForksRequest(resp.data),
        )
        .catch(
          error => !isCancel(error) && this.fetchFailure(error.response.data),
        );
    },

    fetchCancel() {
      cancelTokens.forEach(cancelToken => cancelToken());
      cancelTokens = [];
    },

    fetchForksRequest(payload) {
      payload.forEach(gist => {
        this.fetchForkRequest(gist);
      });
    },

    fetchForkRequest(gist) {
      return axios({
        method: 'get',
        url: gist.forks_url,
        cancelToken: new CancelToken(cancel => {
          cancelTokens.push(cancel);
        }),
        headers: {
          Authorization: 'token c2ae30fae68543e211e663725907eb3f9afb1425',
        },
      })
        .then(resp =>
          this.fetchForkSuccess({
            id: gist.id,
            forks: resp.data,
          }),
        )
        .catch(
          error =>
            !isCancel(error) &&
            this.fetchForkFailure({
              id: gist.id,
              error: error.response.data,
            }),
        );
    },
  },
};
