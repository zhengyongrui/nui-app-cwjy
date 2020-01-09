<template>
  <div class="capsule-component-class" @click="switchEvent(!switchFirst)" ref="capsuleCmpObj">
    <div v-if="switchFirst" class="switch-container">
      <div class="switch-item active-item">
        <span>{{switchOption.firstLongText}}</span>
      </div>
      <div class="switch-item default-item">
        <span>{{switchOption.secondShortText}}</span>
      </div>
    </div>
    <div v-else class="switch-container">
      <div class="switch-item default-item">
        <span>{{switchOption.firstShortText}}</span>
      </div>
      <div class="switch-item active-item">
        <span>{{switchOption.secondLongText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'capsule',
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
    }
  },
  methods: {
    getWidth() {
      if (this.$refs.capsuleCmpObj) {
        return this.$refs.capsuleCmpObj.clientWidth;
      }
      return 0;
    },
    switchEvent(switchValue) {
      this.$emit('switchHandler', switchValue);
    }
  }
}
</script>

<style lang='scss'>
	
.capsule-component-class {
  flex: none;
  font-size: 14px;

  .switch-container {
    height: 22px;
    padding: 2px;
    background-color: #FFF;
    border: 1px solid #DFE1E3;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .switch-item {
    flex: none;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .active-item {
    padding: 0 6px;
    background-color: $font-select-color;
    border-radius: 100px;
    color: #FFF;
  }

  .default-item {
    padding: 0 2px;
    color: #DFE1E3;
  }
}
</style>
