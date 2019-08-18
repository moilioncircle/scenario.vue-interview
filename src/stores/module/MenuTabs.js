import {find, last} from 'lodash';
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function Save2LocalStorage(state) {
  LocalStorageUtil.set('menuTabs', state.tabs);
  LocalStorageUtil.set('curMenuTabName', state.curTabName);
}

export default {
  namespaced: true,
  state: {
    tabs: [],
    curTabName: '',
    curTab: {},
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
      state.curTab = find(state.tabs, { name: state.curTabName });
      Save2LocalStorage(state);
    },
    // 点击 side menu
    append(state, tab) {
      state.curTabName = tab.name;

      let curTab = find(state.tabs, { name: tab.name });
      if (!curTab) {
        state.tabs.push(Object.assign({}, tab));
        curTab = last(state.tabs);
      }

      state.curTab = curTab;
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
        state.curTab = tab;
      }
      Save2LocalStorage(state);
    },
    removeOthers(state, tab) {
      state.tabs.length = 0;
      state.curTabName = tab.name;
      state.curTab = tab;
      state.tabs.push(tab);
      Save2LocalStorage(state);
    },
    // 传递path时, 会改变tab的路径. 目的: 解决子路由的还原问题
    active(state, { name, path }) {
      const tab = find(state.tabs, { name });
      if (tab) {
        tab.path = path || tab.path;
        state.curTabName = name;
        state.curTab = tab;
        Save2LocalStorage(state);
      }
    },
    restore(state, { tabs, curTabName }) {
      state.tabs = tabs;
      state.curTabName = curTabName;
      state.curTab = find(state.tabs, { name: curTabName });
    },
  },
};
