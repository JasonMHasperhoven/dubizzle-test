import axios, { CancelToken, isCancel } from 'axios';

let cancelTokens = [];

export default {
  state: {
    query: '',
    results: [],
    fetching: false,
    failure: false,
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
        failure: false,
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

    async fetchRequest(username) {
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
        .catch(error => !isCancel(error) && this.fetchFailure(error));
    },

    fetchCancel() {
      cancelTokens.forEach(cancelToken => cancelToken());
      cancelTokens = [];
    },

    async fetchForksRequest(payload) {
      payload.forEach(gist => {
        this.fetchForkRequest(gist);
      });
    },

    async fetchForkRequest(gist) {
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
              forks: error,
            }),
        );
    },
  },
};
