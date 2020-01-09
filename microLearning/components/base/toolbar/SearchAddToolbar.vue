<template>
  <!--管理员权限则显示搜索和新增-->
  <div v-if="hasAuthority" class="search-add-toolbar-component-class">
    <div class="left-container vertical-line">
      <capsule :switchFirst="switchFirst" :switchOption="switchOption" @switchHandler="switchEvent"></capsule>
    </div>
    <div class="right-container">
      <tab-container>
        <tab-button v-for="(item, index) in buttonList" :key="item.value" :type="'customType'" :showSplitLine="index!==buttonList.length-1" @click.native="tabClickEvent(item.value)">
          <svg-icon :name="item.iconName" theme-type="primary" class="tab-icon"></svg-icon>
          <div class="flex-item-title">{{item.title}}</div>
        </tab-button>
      </tab-container>
    </div>
  </div>
  <!--非管理员权限则显示搜索-->
  <search-toolbar v-else :type="'secondType'" :placeholderText="'搜索'" :readOnly="true" @searchClick="searchEvent"></search-toolbar>
</template>

<script>
import Capsule from '@/appMobileLib/base/components/capsule/Capsule';
import TabContainer from './base/TabContainer';
import TabButton from './base/TabButton';

export default {
  name: 'search-add-toolbar',
  components: {
    Capsule,
    TabContainer,
    TabButton
  },
  props: {
    switchFirst: {
      type: Boolean,
      default: true
    },
    hasAuthority: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonList: [
        { value: 'search', title: '搜索', iconName: 'search' },
        { value: 'add', title: '新增', iconName: 'plus-sign' }
      ]
    }
  },
  methods: {
    switchEvent(switchValue) {
      this.$emit('switchHandler', switchValue);
    },
    tabClickEvent(buttonValue) {
      this.$emit('tabClickHandler', buttonValue);
    },
    searchEvent() {
      this.$emit('searchClick');
    }
  }
}
</script>

<style lang='scss' scoped>
.search-add-toolbar-component-class {
  display: flex;
  align-items: center;
  background-color: #F2F4F5;
  height: 44px;
  z-index: 10;

  .left-container {
    flex: none;
    padding: 0 8px;
    position: relative;
  }

  .vertical-line:after {
    content: '';
    background-color: #DFE1E3;
    height: 28px;
    width: 1px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .right-container {
    flex: 1 1 auto;
    width: 200px;

    .flex-item-title {
      font-size: 14px;
      color: #020F17;
      padding: 0 0 0 5px;
    }

    .tab-icon {
      width: 18px;
      height: 18px;
    }
  }

}
</style>
