<template>
  <div class="layout">
    <Layout style="background: inherit !important;">
      <Header class="header">
        <Row type="flex">
          <Col style="flex: 1"><span class="title">Vue Interview Test</span></Col>
          <Col> Admin</Col>
        </Row>
      </Header>
    </Layout>
    <Layout :style="{minHeight: '100vh'}">
      <Sider :collapsed-width="78">
        <Menu theme="dark" width="auto"
              :active-name="activeMenuName"
        >
          <MenuItem class="menu-item" :name="menu.title" v-for="menu in menus" :key="menu.title">
            <div class="p-submenu-title" @click="onClickMenu(menu)">
              {{menu.title}}
            </div>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <n-menu-tabs></n-menu-tabs>
        <Card :style="{margin: '15px', minHeight: '500px'}" dis-hover>
          <keep-alive :include="cacheList">
            <router-view></router-view>
          </keep-alive>
        </Card>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {forEach, get, find} from 'lodash';
  import {mapState, mapGetters, mapMutations} from "vuex";
  import {routerTo, routes} from '../router';
  import NMenuTabs from "../components/NMenuTabs";
  import LocalStorageUtil from "../utils/LocalStorageUtil";

  export default {
    name: 'layout',
    components: {NMenuTabs},
    data() {
      return {
        activeMenuName: 'Home',
        menus: [],
      }
    },

    created() {
      routes.forEach((route) => {
        this.menus.push({
          title: route.meta.title,
          name: route.name,
          path: route.path,
        });
      });

      const curTabName = LocalStorageUtil.get('curMenuTabName');
      if (curTabName) {
        this.$store.commit('menuTab/restore', {
          tabs: LocalStorageUtil.get('menuTabs'),
          curTabName,
        });
      }
    },

    computed: {
      ...mapState('menuTab', ['tabs', 'curTabName']),
      ...mapGetters('menuTab', ['cacheList']),
    },

    watch: {
      curTabName: {
        handler(to, from) {
          const tab = find(this.tabs, { name: to });
          if (tab) {
            this.activeMenuName = tab.title;
          }
        },
        immediate: true,
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.onRouterChange(to);
      });
    },

    beforeRouteUpdate(to, from, next) {
      this.onRouterChange(to);
      next();
    },

    methods: {
      ...mapMutations('menuTab', ['onRouterChange']),
      onClickMenu(menu) {
        routerTo(menu.path);
      }
    },

  }
</script>

<style scoped lang="scss">
  .layout-con {
    height: 100%;
    width: 100%;
  }

  .header {
    background-color: white;
    padding: 0 20px;
    z-index: 1;

    .ivu-row {
      height: 100%;
    }

    .title {
      font-size: 1.5rem;
    }
  }

  .menu-item{
    height: 50px;
  }

  .p-submenu-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding-left: 42px;
    display: flex;
    align-items: center;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  /deep/ .collapsed-menu .ivu-menu-submenu-title-icon {
    display: none;
  }
</style>
