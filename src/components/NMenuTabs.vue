<template>
  <div>
    <draggable
        class="n-menu-tabs n-no-select"
        tag="div"
        v-model="tabs"
        v-bind="dragOptions"
        @start="dragging = true"
        @end="dragging = false"
    >
      <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
        <div class="n-menu-tab n-flex"
             :class="{'active': tab.name === curTabName}"
             v-for="(tab, index) in tabs"
             :key="tab.name"
             @click="onClickTab(tab)"
             @contextmenu.prevent="onContextMenu($event, tab)"
        >
          <div class="n-menu-tab-status"></div>
          {{tab.title}}
          <Icon class="n-menu-tab-close ml-1" type="md-close" v-if="tabs.length > 1"
                @click.stop="onCloseTab(tab, index)"/>
        </div>
      </transition-group>
    </draggable>

    <n-context-menu :context-event="contextEvent" @click="onClickMenuOption">
      <DropdownItem name="closeOthers">Close Others</DropdownItem>
    </n-context-menu>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import {mapState} from "vuex";
  import NContextMenu from './NContextMenu';

  export default {
    name: 'NMenuTabs',
    components: {
      draggable, NContextMenu
    },
    data() {
      return {
        contextEvent: {},
        targetTab: {},
        dragging: false,
        dragOptions: {
          animation: 200,
          group: 'description',
          disabled: false,
        },
      }
    },
    computed: {
      ...mapState('menuTab', ['curTabName']),
      tabs: {
        get() {
          return this.$store.state.menuTab.tabs;
        },
        set(tabs) {
          this.$store.commit('menuTab/setTabs', tabs);
        },
      }
    },
    methods: {
      onClickTab(tab) {
        this.$store.commit('menuTab/active', {name: tab.name});
      },
      onCloseTab(tab, index) {
        this.$store.commit('menuTab/remove', index);
      },
      onContextMenu(event, tab) {
        this.contextEvent = event;
        this.targetTab = tab;
      },
      onClickMenuOption(name) {
        if (name === 'closeOthers') {
          this.$store.commit('menuTab/removeOthers', this.targetTab);
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .n-menu-tabs {
    padding: 5px 15px;
    background-color: #f3f3f3;
    box-shadow: 0px 0px 6px 0px #65656563;

    & > span {
      display: flex;
      align-items: center;
    }

    .n-menu-tab {
      margin: 0 5px 0 0;
      height: 35px;
      padding: 5px 12px 4px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      background-color: white;
      min-width: 85px;
      cursor: pointer;

      &-status {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ddd;
        margin-right: 10px;
      }

      &-close {
        padding: 5px;
        color: #999;
      }

      &-close:hover {
        color: #555;
        font-weight: bold;
      }
    }

    .n-menu-tab:hover {
      background-color: #fafafa;
      border-color: #ccc;
    }

    .active {
      /*border-color: #2d8cf0;*/
      /*color: #2d8cf0;*/

      .n-menu-tab-status {
        background-color: #2d8cf0;
      }
    }
  }
</style>
