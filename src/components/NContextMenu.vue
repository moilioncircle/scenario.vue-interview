<template>
  <Dropdown ref="dropdown" trigger='click' placement="bottom-start"
            @on-click="onClick"
            @on-visible-change="onVisibleChange"
            :style="style">
    <DropdownMenu slot="list">
      <slot></slot>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { isEmpty } from 'lodash';

export default {
  name: 'NContextMenu',
  data() {
    return {
      left: 0,
      top: 0,
    };
  },
  props: {
    contextEvent: null,
  },
  computed: {
    style() {
      return {
        position: 'fixed', left: `${this.left}px`, top: `${this.top}px`, zIndex: 10,
      };
    }
  },
  methods: {
    onClick(name) {
      if (name) {
        this.$emit('click', name);
      }
    },
    onVisibleChange(visible) {
      this.$emit('onVisibleChange', visible);
    }
  },
  watch: {
    contextEvent() {
      if (this.contextEvent && !isEmpty(this.contextEvent)) {
        this.left = this.contextEvent.clientX;
        this.top = this.contextEvent.clientY;
        this.$refs.dropdown.currentVisible = true;
      }
    }
  },
}
</script>

<style scoped lang="scss">
</style>
