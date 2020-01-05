<template>
  <div class="login-page page">
    <!--生产模式下显示系统提示页面-->
    <template v-if="isShowHintInfo">
      <app-header title="提示" @on-click-back="goBack"></app-header>
      <common-hint hintText="数据加载异常，请稍后再试"></common-hint>
    </template>
    <template v-else>
       <login-form class="login-form-margin" :logoOption="logoOption" :options="loginOptions" @on-additional-click="additionalClick" @on-login="loginSubmit"></login-form>
    </template>
    <router-view class="cover"></router-view>
  </div>
</template>

<script>
import routerBackMixin from '@/appMobileLib/business/mixins/routerBackMixin';
import LoginForm from '../components/LoginForm';

export default {
  name: 'login-page',
  mixins: [routerBackMixin],
  components: {
    LoginForm
  },
  data() {
    return {
      logoOption: {
        src: require('customizeImagePath/logo.jpg'),
        style: { width: '120px', height: '115px' }
      },
      loginOptions: {
        userName: { value: '', placeholder: '' },
        password: { value: '', placeholder: '' }
      },
      toRouteName: 'appHomePage'
    }
  },
  mounted() {
    if (this.$route.params.toRouteName) {
      this.toRouteName = this.$route.params.toRouteName;
    }
  },
  computed: {
    isShowHintInfo() {
      return this.$isProductMode;
    }
  },
  methods: {
    additionalClick(item) {
      if (!item) {
        return;
      }
      if (item.value === 'forgetPassword') {
        this.toResetPasswordPage();
        return;
      }
      if (item.value === 'meetingProblem') {
        this.meetingProblem();
      }
    },
    toResetPasswordPage() {
      this.$router.push({ name: 'outer_resetPwd', query: { local: true } });
    },
    meetingProblem() {
      this.$appUtil.showToast('您好，该功能待开发');
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
    toHomePage() {
      this.$router.replace({ name: this.toRouteName });
    },
    loginDataProcess(res) {
      let user = res.data;
      if (user && (user.userId || (this.$isMicroServer && user.userGid))) {
        this.$loginService.setLoginUserInfo(user);
        this.toHomePage();
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
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  overflow: hidden;

  .login-form-margin {
    margin-top: 60px;
  }
}
</style>