<template>
  <div class="reset-wrapper cover">
    <app-header v-if="!$isWeixinClient" :title="caption" @on-click-back="goBack"></app-header>
    <div class="reset-box">
      <div class="information-item" v-if="firstPage">
        <div class="item-font">
          <div class="item-title">
            <span>手</span>
            <span>机</span>
            <span>号：</span>
          </div>
        </div>
        <div class="information information-code">
          <input name="phone"  type="text" v-model="formInline.phone" placeholder="请输入手机号码" maxlength="15" required>
          <button ref="timerbtn" class="button-code" @click="sendCode">{{phonecode}}</button>
        </div>
      </div>
      <div class="smallTip" v-if="phoneTips&&firstPage">
        <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div>
        <small v-if="phoneTips===1">请输入有效的手机号码</small>
        <small v-if="phoneTips===2">用户不存在</small>
      </div>
      <div class="information-item" v-if="firstPage">
        <div class="item-font">
          <div class="item-title">
            <span>验</span>
            <span>证</span>
            <span>码</span>
            <span>：</span>
          </div>
        </div>
        <div class="information">
          <input name="code" type="text" v-model="formInline.code" placeholder="请输入手机验证码" maxlength="10" required>
        </div>
      </div>
      <div class="smallTip" v-if="codeTips&&firstPage">
        <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div>
        <small>验证码错误</small>
      </div>
      <div class="information-item" v-if="secondPage">
        <div class="item-font">
          <div class="item-title">
            <span>密</span>
            <span>码</span>
            <span>：</span>
          </div>
        </div>
        <div class="information">
          <login-input class="pwd-input" :isShowLabelIcon="false" v-model="formInline.passWord" :type="'password'" :option="passwordOption"></login-input>
        </div>
      </div>
      <div class="smallTip" v-if="pwdTips!==0&&secondPage">
        <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div>
        <small v-if="pwdTips===1">密码不符合规则</small>
        <small v-if="pwdTips===2">两次密码不一致</small>
      </div>

      <div class="information-item" v-if="secondPage">
        <div class="item-font">
          <div class="item-title">
            <span>确</span>
            <span>认</span>
            <span>密</span>
            <span>码</span>
            <span>：</span>
          </div>
        </div>
        <div class="information">
          <login-input class="pwd-input" :isShowLabelIcon="false" v-model="formInline.confirmPassWord" :type="'password'" :option="passwordOption2"></login-input>
          <div class="pwd-button" @click="changeType2()">
            <svg-icon :name="confirmPwdSvgName" themeType="primary" :width="22" :height="22"></svg-icon>
          </div>
        </div>
      </div>
      <div class="smallTip" v-if="secondPage">
        <small>密码规则：密码长度不少于8位，且至少是2种字符组合（英文字母、数字、符号）</small>
      </div>

      <reset-success v-if="showResetSuccessPage && resetPasswordValue" @click-close-btn="closeResetSuccessPage" :resetPasswordValue="resetPasswordValue"></reset-success>
      <button v-if="firstPage" class="next-step" name="reset" :class="computeClass" @click="next_step">重置密码</button>
      <button v-if="secondPage" class="next-step" name="reset" :class="computeClass2" @click="form_sumbit">提交</button>
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux';
import Vue from 'vue';
import { DES_ENCRYPT_KEY } from '@/appMobileLib/base/constants/baseConst';
import LoginInput from '../components/base/LoginInput'
import ResetSuccess from '../components/ResetSuccess';
import {
  forgetPasswordUpdatePromise,
  forgetPasswordValidateCheckPromise
} from '../services/loginService';

export default {
  name: 'reset',
  components: {
    ResetSuccess,
    XInput,
    LoginInput
  },
  data() {
    return {
      show: false,
      phonecode: '发送验证码',
      phoneTips: false,
      codeTips: false,
      pwdPicTip: false,
      pwdPicTip2: false,
      pwdTips: 0,
      firstPage: true,
      secondPage: false,
      showResetSuccessPage: false,
      text: 'Processing',
      isreset: false,
      formInline: {
        userName: '',
        passWord: '',
        confirmPassWord: '',
        phone: '',
        code: ''
      },
      time: 60,
      caption: '忘记密码',
      goBackToNative: true,
      resetPasswordValue: '',
      passwordOption: {
        svgIcon: 'login-password',
        placeholder: '请输入密码'
      },
      passwordOption2: {
        svgIcon: 'login-password',
        placeholder: '请再次输入密码'
      },
    };
  },
  mounted() {
    if (this.$isWeixinClient && this.$route.name === 'resetPwd') {
      document.title = this.caption;
    }
  },
  watch: {
    $route(to) {
      if (this.$isWeixinClient && to.name === 'resetPwd') {
        document.title = this.caption;
      }
    }
  },
  computed: {
    computeClass() {
      return !this.next_check() ? 'default-bg' : 'active-bg';
    },
    computeClass2() {
      return !this.form_check() ? 'default-bg' : 'active-bg';
    },
    pwdSvgName() {
      return this.pwdPicTip ? 'eye-open' : 'eye-close';
    },
    confirmPwdSvgName() {
      return this.pwdPicTip2 ? 'eye-open' : 'eye-close';
    }
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time--;
        this.phonecode = this.time + 's后重发';
        setTimeout(this.timer, 1000);
      } else {
        this.phonecode = '发送验证码';
        this.time = 60;
      }
    },
    checkPhone() {
      let flag = false;
      const telReg = /^\d{11}$/;
      flag = telReg.test(this.formInline.phone);
      return flag;
    },
    checkPwd() {
      let flag = false;
      // 密码规则：密码长度不少于8位，且至少是2种字符组合（英文字母、数字、符号）
      const pwdReg = /^(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{8,20}$/;
      flag = pwdReg.test(this.formInline.passWord);
      return flag;
    },
    // 发送验证码
    sendCode() {
      // 手机号有误则不发送
      if (this.checkPhone()) {
        this.phoneTips = 0;
        if (this.time === 60) {
          this.timer();
          this.phonecode = this.time + 's后重发';
          let self = this;
          const phone = encodeURIComponent(this.formInline.phone);
          const functional = encodeURIComponent('retrieve');
          const param = 'phone=' + phone + '&functional=' + functional;
          this.$http.get('/smartBase/forgetPasswordValidateSend?' + param).then(
            response => {
              const message = response.data;
              // 获取验证码
              // 如果账号不存在
              if (message.code === 1) {
                this.phoneTips = 2;
                this.time = 0;
              }
              self.isreset = false;
              self.$vux.loading.hide();
            },
            () => {
              self.$vux.alert.show({ content: '网络繁忙请稍后重试', buttonText: '我知道了' });
              self.loading(false);
              this.time = 0;
            }
          );
        }
      } else {
        this.phoneTips = 1;
      }
    },
    next_step() {
      let self = this;
      const phone = Vue.encryptUtil.encrypt(this.formInline.phone, DES_ENCRYPT_KEY)
      const validateCode = this.formInline.code;
      forgetPasswordValidateCheckPromise(phone, validateCode).then(
        response => {
          if (response.data.code === 1) {
            // 参数为空
            this.codeTips = true;
          } else if (response.data.code === 2) {
            // 验证失败
            this.codeTips = true;
          } else if (response.data.code === 0) {
            // 服务器验证码校验成功 跳去修改页
            this.codeTips = false;
            // 重置密码
            self.$vux.loading.show();
            this.resetPassword();
          }
        },
        () => {
          self.$vux.loading.hide();
          self.$vux.alert.show({ content: '网络繁忙请稍后重试', buttonText: '我知道了' });
        }
      );
    },
    resetPassword() {
      const phone = Vue.encryptUtil.encrypt(this.formInline.phone, DES_ENCRYPT_KEY)
      const newPW = Vue.encryptUtil.encrypt('1234', DES_ENCRYPT_KEY);
      let self = this;
      forgetPasswordUpdatePromise(phone, newPW).then(
        res => {
          if (res && res.data) {
            this.firstPage = false;
            this.caption = '重置密码'
            this.showResetSuccessPage = true;
            this.resetPasswordValue = res.data;
          } else {
            self.$vux.alert.show({ content: '重置密码失败', buttonText: '我知道了' });
          }
          self.$vux.loading.hide();
        },
        () => {
          self.$vux.loading.hide();
          self.$vux.alert.show({ content: '重置密码失败', buttonText: '我知道了' });
        }
      );
    },
    closeResetSuccessPage() {
      this.$emit('getPhone', this.formInline.phone);
      if (!this.$nativeService.exitApp()) {
        this.backProcess();
      } else {
        this.$nativeService.exitApp();
      }
    },
    // 表单提交
    form_sumbit() {
      if (this.form_check()) {
        if (!this.checkPwd()) {
          // 密码规则错误
          this.pwdTips = 1;
          return;
        }
        if (!(this.formInline.confirmPassWord === this.formInline.passWord)) {
          // 两次密码不一致
          this.pwdTips = 2;
          return;
        }
        let self = this;
        const phone = Vue.encryptUtil.encrypt(this.formInline.phone, DES_ENCRYPT_KEY)
        const _password = Vue.encryptUtil.encrypt(this.formInline.passWord, phone);
        forgetPasswordUpdatePromise(phone, _password).then(
          response => {
            const message = response.data;
            self.isreset = false;
            self.$vux.loading.hide();
            if (message.code === 0) {
              self.$vux.toast.show({
                text: '密码修改成功',
                type: 'text',
                time: 3000,
                onHide: () => {
                  this.$emit('getPhone', this.formInline.phone);
                  if (!self.$nativeService.exitApp()) {
                    this.backProcess();
                  } else {
                    self.$nativeService.exitApp();
                  }
                }
              });
            } else {
              self.$vux.alert.show({ content: '密码修改失败', buttonText: '我知道了' });
            }
            self.$vux.loading.hide();
          },
          () => {
            self.$vux.alert.show({ content: '网络繁忙请稍后重试', buttonText: '我知道了' });
          }
        );
      } else {
        this.$vux.alert.show({ content: '您好，信息未完成填写，请继续填写', buttonText: '我知道了' });
      }
    },
    enter(event) {
      if (event.keyCode === 13) {
        this.form_sumbit(this.formInline);
      }
    },
    goBack() {
      if (this.goBackToNative) {
        if (!this.$nativeService.exitApp()) {
          this.backProcess();
        }
      } else {
        this.backProcess();
      }
    },
    backProcess() {
      this.$router.back(-1);
    },
    // 表单验证
    form_check() {
      let formTf = true;
      formTf = this.formInline.passWord && this.formInline.confirmPassWord;
      return formTf;
    },
    // 下一步验证
    next_check() {
      let formTf = true;
      formTf = this.formInline.phone && this.formInline.code;
      return formTf;
    },
  }
};
</script>
<style lang="scss">
.pwd-input {
  margin-top: 20px;
}

.reset-box .vux-x-input .weui-icon {
  display: none;
}
.reset-box .weui-input {
  margin-top: 20px;
}
.reset-box input {
  margin-top: 20px;
  border-width: 1px;
  border-color: #f2f4f5;
}
</style>

<style scoped lang="scss">
.reset-box a {
  margin-left: 20px;
  margin-top: 10px;
  text-decoration: none;
  color: grey;
  font-size: $fontSize14;
}

.reset-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  .default-bg {
    background-color: #DFE1E3 !important;
  }

  .active-bg {
    background-color: $button-primary-bg-color !important;
  }
}

.reset-box .pwd-button {
  position: absolute;
  right: 10px;
  top: 30px;
}

.reset-wrapper img {
  width: 40%;
}

.reset-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 10px;
}

.reset-box .information {
  // position: relative;
  // margin-right: 10px;
  flex: 1 1 200px;
  display: flex;
}

.reset-box .smallTip {
  display: -webkit-inline-flex;
  margin: 5px 15px 0px 120px;
  color: #666666;
  font-size: 14px;
}

.reset-box input {
  height: 30px;
  border-left: none;
  border-right: none;
  border-top: none;
  margin: 30px 20px 0 10px;
  outline-style: none;
  font-size: 1.4rem;
  padding-left: 3px;
  flex: 1 1 200px;
}

.reset-box .x-input {
  height: 30px;
  border-left: none;
  border-right: none;
  border-top: none;
  margin: 10px 20px 0 10px;
  outline-style: none;
  font-size: 1.4rem;
  padding-left: 3px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
}

.reset-box .button-code {
  position: absolute;
  right: 10px;
  margin-right: 0;
  top: 34px;
  display: block;
  width: 80px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: $font-select-color;
  border: 1px solid $font-select-color;
  background-color: #fff;
}

.reset-box .next-step {
  margin: 30px 20px 0 20px;
  background-color: $button-primary-bg-color;
  border-radius: 4px;
  border: none;
  height: 44px;
  color: #fff;
  font-size: $fontSize16;
}

.reset-box .img-tips {
  width: 16px;
  height: 16px;
}

.reset-box .information {
  position: relative;
  margin-right: 10px;
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  box-flex: 1;
}

.reset-box .information-item {
  display: flex;
  .item-font {
    padding: 34px 0px 0px 20px;
    display: flex;
    align-items: center;
    .item-title {
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
      color: #666666;
      width: 90px;
    }
  }
}
</style>
