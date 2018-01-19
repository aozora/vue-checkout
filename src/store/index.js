import Vue from 'vue';
import Vuex from 'vuex';

import json from './products.json';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: debug,

  state: {
    isLoading: false,
    cart: [],
    products: {}
  },

  getters: {
    allProducts: state => state.products, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.products) ? state.products.length : 0,
    cartProducts: state => {
      return state.cart.map(({ id, quantity }) => {
        const product = state.products.find(p => p.id === id)

        return {
          name: product.name,
          price: product.price,
          quantity
        }
      })
    }
  },

  mutations: {
    SET_IS_LOADING: (state, loading) => {
      /* eslint-disable no-param-reassign */
      state.isLoading = loading;
    },

    SET_PRODUCTS: (state, products) => {
      /* eslint-disable no-param-reassign */
      state.products = products;
    },

    ADD_TO_CART: (state, { id }) => {
      const record = state.cart.find(p => p.id === id);

      if (!record) {
        state.cart.push({
          id,
          quantity: 1
        });
      } else {
        record.quantity++;
      }
    }

  },

  actions: {
    FETCH_PRODUCTS: ({ commit, state }, query) => {
      // console.log(`action FETCH_PRODUCTS: query = ${query}`);

      // commit('SET_SEARCH_QUERY', query);
      commit('SET_IS_LOADING', true);

      if (query) {
        const p = new Promise((resolve, reject) => {
          /* eslint-disable arrow-body-style   */
          setTimeout(() => {
            return resolve(json);
          }, delay);
        });

        return p.then((products) => {
          // console.log('Fetch Promise OK! mutating state...');
          commit('SET_PRODUCTS', products);
          commit('SET_IS_LOADING', false);

          // if (result === '') {
          //   commit('SET_NORESULTS', true);
          // }
        });
      }

      commit('SET_IS_LOADING', false);
      return Promise.reject();
    },

    ADD_TO_CART: ({ commit }, product) => {
      commit('ADD_TO_CART', {
        id: product.id
      });
    }
  }
});

export default store;
