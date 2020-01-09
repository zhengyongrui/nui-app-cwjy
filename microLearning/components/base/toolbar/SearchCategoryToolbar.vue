<template>
  <tab-container class="search-category-toolbar-component-class">
    <tab-button v-for="item in buttonList" :key="item.value" :type="'customType'" @click.native="tabClickEvent(item.value)">
      <svg-icon :name="item.iconName" theme-type="primary" size-type="sm"></svg-icon>
      <div class="flex-item-title">{{item.title}}</div>
    </tab-button>
  </tab-container>
</template>

<script>
import TabButton from './base/TabButton';
import TabContainer from './base/TabContainer';

export default {
  name: 'search-category-toolbar',
  components: {
    TabContainer,
    TabButton
  },
  props: {
    buttonList: {
      type: Array,
      default() {
        return [
          { value: 'search', title: '搜索', iconName: 'search' },
          { value: 'category', title: '类别', iconName: 'category-color' }
        ]
      }
    }
  },
  methods: {
    tabClickEvent(buttonValue) {
      this.$emit('tabClickHandler', buttonValue);
    }
  }
}
</script>

<style lang='scss' scoped>
.search-category-toolbar-component-class {
  background-color:#FFF;
  color: #020F17;
  z-index: 10;

  .flex-item-title {
    font-size: 16px;
    color: #020F17;
    padding: 0 0 0 5px;
  }

  /deep/.tab-button-component-class:active {
    background-color: #F2F4F5;
  }

}
</style>
