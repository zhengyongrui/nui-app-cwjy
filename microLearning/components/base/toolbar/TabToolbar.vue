<template>
  <div class="tab-toolbar-component-class" :style="toolbarStyle">
    <tab-container>
      <tab-button v-for="(buttonItem, index) in tabButtonList" :key="index" :buttonItem="buttonItem" :activeButtonStyleType="activeButtonStyleType" :activeValue="currentTabValue" :showSplitLine="processSplitLine(index)" @onButtonClick="tabButtonClickEvent"></tab-button>
    </tab-container>
  </div>
</template>

<script>
import TabButton from './base/TabButton';
import TabContainer from './base/TabContainer';

export default {
  name: 'tab-toolbar',
  components: {
    TabContainer,
    TabButton
  },
  props: {
    activeTabValue: { // 支持sync同步
      type: [String, Number],
      default: null
    },
    tabButtonList: {
      type: Array,
      default() {
        // demo:{ title: '搜索', value: 'search', showCount: true, count: 0, showRedDot: false }
        return [];
      }
    },
    toolbarStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    showSplitLine: {
      type: Boolean,
      default: true
    },
    activeButtonStyleType: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      currentTabValue: ''
    }
  },
  mounted() {
    if (!this.activeTabValue && this.tabButtonList && this.tabButtonList.length > 0 && this.tabButtonList[0]) {
      this.currentTabValue = this.tabButtonList[0].value;
    } else if (this.activeTabValue) {
      this.currentTabValue = this.activeTabValue;
    }
  },
  watch: {
    currentTabValue() {
      this.$emit('update:activeTabValue', this.currentTabValue);
    },
    activeTabValue() {
      if (this.activeTabValue) {
        this.currentTabValue = this.activeTabValue;
      }
    }
  },
  methods: {
    processSplitLine(index) {
      if (this.showSplitLine === false || index === this.tabButtonList.length - 1) {
        return false;
      }
      return true;
    },
    tabButtonClickEvent(buttonValue) {
      this.currentTabValue = buttonValue;
      this.$emit('tabClickHandler', buttonValue);
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-toolbar-component-class {
  font-size: 14px;
  z-index: 10;
  color: $font-info-color;
  background-color: $bg-info-color;
}
</style>

