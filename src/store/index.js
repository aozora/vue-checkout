import Vue from 'vue';
import Vuex from 'vuex';

import json from './products.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    results: {}
  },

  mutations: {
    SET_IS_LOADING: (state, loading) => {
      /* eslint-disable no-param-reassign */
      state.isLoading = loading;
    },

    SET_SEARCH_RESULTS: (state, results) => {
      /* eslint-disable no-param-reassign */
      state.results = results;
    }
  },

  actions: {
    FETCH_RESULTS: ({ commit, state }, query) => {
      // console.log(`action FETCH_RESULTS: query = ${query}`);

      commit('SET_SEARCH_QUERY', query);
      commit('SET_IS_LOADING', true);

      if (query) {
        const p = new Promise((resolve, reject) => {
          /* eslint-disable arrow-body-style   */
          setTimeout(() => {
            return resolve(json);
          }, delay);
        });

        return p.then((result) => {
          // console.log('Fetch Promise OK! mutating state...');
          commit('SET_SEARCH_RESULTS', result);
          commit('SET_IS_LOADING', false);

          // if (result === '') {
          //   commit('SET_NORESULTS', true);
          // }
        });
      }

      commit('SET_IS_LOADING', false);
      return Promise.reject();
    }
  }
});

export default store;
