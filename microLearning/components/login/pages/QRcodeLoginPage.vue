<template>
  <div class="qrcode-login-page page">
    <login-form :logoOption="logoOption" :additionalButtons="additionalButtons" :options="loginOptions" @on-additional-click="additionalClick" @on-login="loginSubmit"></login-form>
    <router-view class="cover" @getPhone="getPhone"></router-view>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm';
import { QRCodeLoginRouteParamConfig } from '../constants/loginConst';

export default {
  name: 'qrcode-login-page',
  components: {
    LoginForm
  },
  data() {
    return {
      defaultLogo: require('@/assets/img/weixuexi/logo.png'),
      loginOptions: {
        userName: { value: '', placeholder: '' },
        password: { value: '', placeholder: '' }
      },
      additionalButtons: [
        { value: 'forgetPassword', text: '忘记密码' },
        { value: 'register', text: '注册', svgIcon: 'register' }
      ],
      caption: '',
      toRouteName: '',
      routeParamConfigValue: QRCodeLoginRouteParamConfig
    }
  },
  mounted() {
    document.title = this.caption;
    this.toRouteName = this.$route.params.toRouteName;
  },
  computed: {
    logoOption() {
      if (!this.toRouteName || !this.routeParamConfigValue[this.toRouteName]) {
        return {};
      }
      return {
        src: this.routeParamConfigValue[this.toRouteName].logo || this.defaultLogo,
        style: { width: '100px', height: '75px' }
      };
    }
  },
  watch: {
    $route(to) {
      if (this.$isWeixinClient && to.name === this.$route.name) {
        document.title = this.caption;
      }
    }
  },
  methods: {
    getPhone(phone) {
      this.loginOptions.userName.value = phone;
    },
    additionalClick(item) {
      if (!item) {
        return;
      }
      if (item.value === 'forgetPassword') {
        this.toResetPasswordPage();
        return;
      }
      if (item.value === 'register') {
        this.register();
      }
    },
    toResetPasswordPage() {
      this.$router.push({ name: 'qrcodeLoginPage_resetPwd', query: { local: true } });
    },
    register() {
      this.$router.push({ name: 'qrcodeLoginPage_register', query: { local: true } });
    },
    loginSubmit(params) {
      let username = params.userName;
      let password = params.password;
      this.$appUtil.showLoading('登录中...');
      this.$loginService.login(username, password).then((res) => {
        this.$appUtil.hideLoading();
        this.loginDataProcess(res);
      }, (error) => {
        this.$appUtil.hideLoading();
        if (error !== null) {
          this.loginFailureCallback();
        }
      });
    },
    loginDataProcess(res) {
      let user = res.data;
      if (user && user.errorCode === 0) {
        this.$loginService.setLoginUserInfo(user);
        this.toHomePageForBusinessType();
        return;
      }
      if (user && user.errorMessage) {
        this.$appUtil.showHint(user.errorMessage);
      } else {
        this.loginFailureCallback();
      }
    },
    loginFailureCallback() {
      this.$appUtil.showHint('登录失败，请检查用户名或者密码是否正确');
    },
    toHomePageForBusinessType() { // 跳转主页
      if (!this.toRouteName || !this.routeParamConfigValue[this.toRouteName] || !this.routeParamConfigValue[this.toRouteName].path) {
        this.$appUtil.showHint('跳转的主页未设置，请检查');
        return;
      }
      const routePath = this.translateRoutePath();
      this.$router.replace({ path: routePath });
    },
    translateRoutePath() {
      let configValue = this.routeParamConfigValue[this.toRouteName];
      let routePath = configValue.path;
      let params = configValue.queryParams;
      if (params) {
        let replaceStr;
        let routeQueryValue = this.$route.query;
        for (let i = 0, len = params.length; i < len; i++) {
          replaceStr = '{{' + params[i] + '}}';
          if (typeof routeQueryValue[params[i]] === 'undefined') {
            console.error('参数' + params[i] + '未设置，请检查');
            continue;
          }
          routePath = this.$stringUtil.replaceAll(routePath, replaceStr, routeQueryValue[params[i]]);
        }
      }
      return routePath;
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-login-page {
  overflow: hidden;
  padding-top: 60px;
}
</style>