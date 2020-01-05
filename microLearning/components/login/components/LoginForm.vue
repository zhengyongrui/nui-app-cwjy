<template>
  <div class="login-form-component">
    <div class="main-content">
      <login-logo :option="logoOption"></login-logo>
      <div class="login-input-container">
        <login-input class="input-margin" v-model="userName" :option="userNameOption" @on-enter="userNameEnter"></login-input>
        <login-input class="input-margin" v-model="password" :type="'password'" :option="passwordOption" @on-enter="passwordInputEnter" ref="pwdObj"></login-input>
      </div>
      <login-add-func v-if="showAdditional" class="additional-function-container" :buttonList="additionalButtons" @on-additional-click="additionalButtonClick"></login-add-func>
      <div class="button-primary login-button" @click="handleSubmit">登录</div>
    </div>
  </div>
</template>

<script>
import LoginLogo from './base/LoginLogo';
import LoginInput from './base/LoginInput';
import LoginAddFunc from './base/LoginAddFunc';

export default {
  name: 'login-form-component',
  components: {
    LoginLogo,
    LoginInput,
    LoginAddFunc
  },
  props: {
    logoOption: {
      type: Object,
      default() {
        return {
          src: '',
          style: {}
        }
      }
    },
    options: {
      type: Object,
      default() {
        return {
          userName: { value: '', placeholder: '' },
          password: { value: '', placeholder: '' }
        };
      }
    },
    showAdditional: {
      type: Boolean,
      default: true
    },
    additionalButtons: {
      type: Array,
      default() {
        return [
          { value: 'forgetPassword', text: '忘记密码' },
          { value: 'meetingProblem', text: '遇到问题', svgIcon: 'register' }
        ];
      }
    }
  },
  data() {
    return {
      userNameOption: {
        svgIcon: 'person',
        placeholder: '用户名'
      },
      passwordOption: {
        svgIcon: 'login-password',
        placeholder: '密码'
      },
      userName: '',
      password: ''
    };
  },
  watch: {
    'options.userName.value': {
      handler(newValue) {
        this.userName = newValue;
      },
      deep: true
    },
    'options.password.value': {
      handler(newValue) {
        this.password = newValue;
      },
      deep: true
    }
  },
  methods: {
    initData() {
      if (!this.options) {
        return;
      }
      if (this.options.userName && this.options.userName.value) {
        this.userName = this.options.userName.value;
      }
      if (this.options.password && this.options.password.value) {
        this.password = this.options.password.value;
      }
    },
    userNameEnter() {
      if (!this.userName) {
        return;
      }
      if (!this.password && this.$refs.pwdObj) {
        this.$refs.pwdObj.focus();
        return;
      }
      this.handleSubmit();
    },
    passwordInputEnter() {
      this.handleSubmit();
    },
    additionalButtonClick(item) {
      this.$emit('on-additional-click', item);
    },
    validFormData() {
      if (!this.userName) {
        this.$appUtil.showHint('您好，请输入用户名');
        return false;
      }
      if (!this.password) {
        this.$appUtil.showHint('您好，请输入密码');
        return false;
      }
      return true;
    },
    handleSubmit() {
      let validResult = this.validFormData();
      if (!validResult) {
        return;
      }
      let params = {
        userName: this.userName,
        password: this.password
      };
      this.$emit('on-login', params);
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.login-form-component {
  width: 100%;
  display: flex;

  .main-content {
    flex: 1 1 auto;
    width: 200px;
    padding: 0 20px;
  }

  .login-input-container {
    flex: none;

    .input-margin {
      margin-top: 20px;
    }
  }

  .additional-function-container {
    flex: none;
    margin-top: 15px;
  }

  .login-button {
    margin-top: 35px;
  }
}
</style>
