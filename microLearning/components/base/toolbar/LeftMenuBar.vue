<template>
  <div class="left-menu-bar-component" v-smooth-scroll>
    <div v-for="item in menuDataList" :key="itemPrimay(item)" class="menu-item-btn" :class="{'menu-selected': menuSelectKey === itemPrimay(item)}" @click="selectButton(item)">
      <svg-icon class="menu-bg" :name="menuBgName" :width="90" :height="42"></svg-icon>
      <span class="menu-text" :style="fontSizeStyle(item.name)">{{getItemName(item.name)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu-bar',
  model: {
    prop: 'menuSelectKey',
    event: 'onChange',
  },
  props: {
    menuDataList: Array,
    menuSelectKey: {
      type: String,
      default: ''
    },
    itemPrimayKey: {
      type: String,
      default: 'orgGid'
    },
    menuBgName: {
      type: String,
      default: 'menu-bg1'
    }
  },
  mounted() {
    if (this.menuDataList && this.menuDataList.length > 0) {
      this.selectButton(this.menuDataList[0]);
    }
  },
  methods: {
    selectButton(item) {
      this.$emit('onChange', this.itemPrimay(item));
    },
    itemPrimay(item) {
      return item[this.itemPrimayKey];
    },
    fontSizeStyle(itemName) {
      let result = {};
      if (itemName.length > 4 && itemName.length <= 6) {
        result['font-size'] = '12px'
        result['padding-top'] = '2px'
      }
      return result;
    },
    getItemName(itemName) {
      let result = itemName;
      if (itemName.length > 6) {
        result = result.substr(0, 6) + '...'
      }
      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu-bar-component {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100px;
  padding-top: 10px;
  background: linear-gradient(90deg, $bg-info-color 66%, $bg-default-color 66%);
  .menu-item-btn {
    width: 100px;
    height: 42px;
    padding-top: 5px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    position: relative;

    .menu-bg {
      background-color: $bg-default-color;
      fill: $left-menu-default-border-color !important;
      position: absolute;
      top: 0;
      left: 0;
    }

    .menu-text {
      font-size: 14px;
      margin-right: 10px;
      color: $left-menu-default-text-color;
      z-index: 10;
    }

    &.menu-selected {

      .menu-bg {
        fill: $left-menu-select-border-color !important;
      }

      .menu-text {
        color: $left-menu-select-text-color;
      }
    }
  }
}
</style>
