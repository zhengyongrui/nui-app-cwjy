<template>
  <div class="login-input-component">
    <div class="icon-container" v-if="isShowLabelIcon">
      <svg-icon v-if="option.svgIcon" :name="option.svgIcon" themeType="primary" :width="22" :height="22"></svg-icon>
      <img v-else class="icon-img" :src="option.src">
    </div>
    <template v-if="type==='password' && !showPasswordValue">
      <input type="password" name="password" class="input-class" :value="value" :placeholder="option.placeholder" @keyup.enter="enterEvent" @input="changeEvent($event)" autocomplete="off" ref="inputObj">
    </template>
    <template v-else>
      <input type="text" name="loginName" class="input-class" :value="value" :placeholder="option.placeholder" @keyup.enter="enterEvent" @input="changeEvent($event)" autocomplete="off" ref="inputObj">
    </template>
    <div v-if="type==='password'" class="icon-container password-show-type-icon" @click="changePasswordShowType">
      <svg-icon :name="passwordShowTypeIcon" themeType="primary" :width="22" :height="22"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-input',
  props: {
    type: {
      type: String,
      default: 'text'  // 支持text、password
    },
    value: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default() {
        return {
          svgIcon: 'person',
          placeholder: ''
        }
      }
    },
    isShowLabelIcon: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      showPasswordValue: false, // 针对密码输入框
    }
  },
  computed: {
    passwordShowTypeIcon() {
      if (this.showPasswordValue) {
        return 'eye-open';
      }
      return 'eye-close';
    }
  },
  methods: {
    enterEvent() {
      this.$emit('on-enter');
    },
    changeEvent($event) {
      this.$emit('input', $event.target.value);
    },
    focus() {
      if (this.$refs.inputObj) {
        this.$refs.inputObj.focus();
      }
    },
    changePasswordShowType() {
      this.showPasswordValue = !this.showPasswordValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.login-input-component {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border-dark-color;
  position: relative;

  .icon-container {
    flex: none;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-img {
      width: 22px;
      height: 22px;
    }
  }

  .password-show-type-icon {
    cursor: pointer;
  }

  .input-class {
    flex: 1 1 auto;
    width: 100px;
    height: 100%;
    border: none;
    color: $font-default-color;
  }

}
</style>
