import Vue from 'vue';
import Vuex from 'vuex';
import menuTab from './module/MenuTabs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menuTab,
  }
});
