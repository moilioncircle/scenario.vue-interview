import {find, last} from 'lodash';
import LocalStorageUtil from "../../utils/LocalStorageUtil";
import { routerTo } from "../../router";

function Save2LocalStorage(state) {
  LocalStorageUtil.set('menuTabs', state.tabs);
  LocalStorageUtil.set('curMenuTabName', state.curTabName);
}

export default {
  namespaced: true,
  state: {
    tabs: [],
    curTabName: 'home',
  },
  getters: {
    cacheList(state) {
      return state.tabs.map((t) => t.name);
    },
  },
  mutations: {
    // 对 menu tab 进行排序
    setTabs(state, tabs) {
      state.tabs = tabs;
      Save2LocalStorage(state);
    },
    // 关闭
    remove(state, index) {
      state.tabs.splice(index, 1);
      let tab = find(state.tabs, { name: state.curTabName });
      // 删除的是当前tab
      if (!tab) {
        const curTabIndex = Math.min(index, state.tabs.length - 1);
        tab = state.tabs[curTabIndex];
        state.curTabName = tab.name;
        routerTo(tab.path);
      }
      Save2LocalStorage(state);
    },
    removeOthers(state, tab) {
      state.tabs.length = 0;
      state.curTabName = tab.name;
      state.tabs.push(tab);
      routerTo(tab.path);
      Save2LocalStorage(state);
    },
    restore(state, { tabs, curTabName }) {
      state.tabs = tabs;
      state.curTabName = curTabName;
    },
    onRouterChange(state, to) {
      const tab = find(state.tabs, { name: to.name });
      if (tab) {
        state.curTabName = to.name;
      } else {
        state.tabs.push({ name: to.name, path: to.path, title: to.meta.title});
      }
      Save2LocalStorage(state);
    },
  },
};
