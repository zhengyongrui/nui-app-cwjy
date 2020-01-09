<template>
  <div class="custom-toolbar-component-class">
    <div v-if="showCapsule" class="left-container" :class="{'vertical-line':showSplitLine}">
      <capsule :switchFirst="switchFirst" :switchOption="switchOption" @switchHandler="switchEvent"></capsule>
    </div>
    <div class="right-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Capsule from '@/components/base/capsule/Capsule.vue';

export default {
  name: 'custom-toolbar',
  components: {
    Capsule
  },
  props: {
    switchFirst: {
      type: Boolean,
      default: true
    },
    switchOption: {
      type: Object,
      default() {
        return {
          firstLongText: '全部',
          firstShortText: '全',
          secondLongText: '我的',
          secondShortText: '我'
        }
      }
    },
    // 显示胶囊按钮
    showCapsule: {
      type: Boolean,
      default: true
    },
    // 显示分割线
    showSplitLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    switchEvent(switchValue) {
      this.$emit('switchHandler', switchValue);
    }
  }
}
</script>

<style lang='scss' scoped>
.custom-toolbar-component-class {
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
  }

}
</style>
