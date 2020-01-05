<template>
  <div class="reset-success-component">
    <svg-icon class="success-svg-icon" name="success-tip" :width="49" :height="49"></svg-icon>
    <div class="tips">重置密码成功！</div>
    <div class="initial-password">初始密码：{{resetPasswordValue}}</div>
    <div>登录APP后请及时修改初始密码以防被盗</div>
    <div>路径：我的 > 修改密码</div>
    <button class="close-btn" name="reset" @click="clickCloseBtn">关闭</button>
  </div>
</template>

<script>
export default {
  name: 'reset-success-component',
  props: {
    resetPasswordValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickCloseBtn() {
      this.$emit('click-close-btn');
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-success-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $font-info-color;
  font-size: $fontSize14;

  .success-svg-icon {
    margin-top: 50px;
    fill: $theme-color!important;
  }

  .tips {
    margin: 10px 0 20px 0;
  }

  .initial-password {
    color: $font-default-color;
  }

  .close-btn {
    margin: 30px 20px 0 20px;
    background-color: $theme-color;
    border-radius: 4px;
    border: none;
    height: 44px;
    color: #fff;
    font-size: $fontSize16;
    width: 50vw;
  }
}
</style>
