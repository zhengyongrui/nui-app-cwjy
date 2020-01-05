<template>
  <div class="login-add-func-component">
    <div v-for="item in buttonList" :key="item.value" class="additional-item" @click="additionalButtonClick(item)">
      <svg-icon v-if="item.svgIcon" :name="item.svgIcon" themeType="primary" :width="18" :height="18"></svg-icon>
      <div class="item-text">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-add-func',
  props: {
    buttonList: {
      type: Array,
      default() {
        return [
          { value: 'forgetPassword', text: '忘记密码' },
          { value: 'meetingProblem', text: '遇到问题', svgIcon: 'register' }
        ];
      }
    }
  },
  methods: {
    additionalButtonClick(item) {
      this.$emit('on-additional-click', item);
    }
  }
}
</script>

<style lang="scss" scoped>
.login-add-func-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8c9194;
  font-size: 14px;

  .additional-item {
    padding: 5px 8px;
    display: flex;
    align-items: center;

    .item-icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
