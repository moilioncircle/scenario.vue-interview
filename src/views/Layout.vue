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
  import {forEach, get} from 'lodash';
  import {mapState, mapGetters} from "vuex";
  import {routes} from '../router';
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
      } else {
        forEach(this.$route.matched, (r) => {
          const name = get(r, 'name');
          if (name) {
            this.$store.commit('menuTab/append', { title: r.meta.title, name, path: r.path });
            return false;
          }
          return true;
        });
      }
    },

    computed: {
      ...mapState('menuTab', ['tabs', 'curTabName', 'curTab']),
      ...mapGetters('menuTab', ['cacheList']),
    },

    watch: {
      curTab(to, from) {
        if (this.$route.path !== this.curTab.path) {
          this.$router.push(this.curTab.path);
        }
        this.activeMenuName = this.curTab.title;
      }
    },

    methods: {
      onClickMenu(menu) {
        this.$store.commit('menuTab/append', menu);
      }
    },

    beforeRouteUpdate(to, from, next) {
      // 处理点击浏览器前进, 后退时menu的同步问题

      // 找到tab, 更新path (可以还原子路由)

      forEach(to.matched, (r) => {
        const name = get(r, 'name');
        if (name) {
          this.$store.commit('menuTab/active', { name, path: to.path });
          return false;
        }
        return true;
      });

      next();
    }

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
