<template>
  <div class="register-wrapper cover">
    	<app-header v-if="!$isWeixinClient" :title="caption" @on-click-back="goBack"></app-header>
      <div class="register-box">
      		<div class="information-item">
      			<div class="item-font">
      			      <span style="text-align: left;">姓</span><span style="margin-left: 10px;">名：</span>
      			 </div>
      			 <div class="information">
      			 	   <input name="username" type="text" v-model="formInline.userName" placeholder="请输入姓名">
      			 </div>
      	 </div>
      		<div class="information-item">
      			  <div class="item-font">
      			  	<span style="text-align: left;width: 15px;">手</span><span style="text-align: left;width: 15px;margin-left:5px;">机</span><span style="margin-left: 5px;">号：</span>
      			  </div>
      			  <div class="information information-code">
      			  	<input name="phone" type="text" v-model="formInline.phone" placeholder="请输入手机号码">
      			  	<button ref="timerbtn" class="button-code" @click="sendCode">{{phonecode}}</button>
      			  </div>
      	 </div>
      	 <div class="smallTip" v-if="phoneTips !==0">
                <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div>
                <small v-if="phoneTips===1">请输入有效的手机号码</small>
                <small v-if="phoneTips===2">此手机号码已注册</small>
          </div>
      		<div class="information-item">
      		   <div class="item-font" style="width: 90px;"> 
      		   	  <span style="text-align: left;width: 15px;">验</span><span style="text-align: left;width: 15px;margin-left:5px;">证</span><span style="margin-left: 5px;">码：</span>
      		   </div>
      		   <div class="information">
      		   		<input name="code" type="text" v-model="formInline.code" placeholder="请输入手机验证码">
      		   </div>
      	  </div>
      	  <div class="smallTip" v-if="codeTips"> 
                <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div><small>验证码错误</small>
          </div>
      		<div class="information-item">
      			<div class="item-font">
      				<span style="text-align: left;">密</span><span style="margin-left: 10px;">码：</span>
      			</div>
      			<div class="information">
      				<x-input class="x-input" name="password" :type="this.registration_data.pwdType" v-model="formInline.passWord" placeholder="请输入密码" @keyup.enter="enter"></x-input>
      				<div class="pwd-button" @click="changeType">
                <svg-icon :name="passwordTypeSvgName" themeType="primary" :width="22" :height="22"></svg-icon>
              </div>
      			</div>
      	 </div>
      	 <div class="smallTip" v-if="pwdTips!==0">
                <div><img :src="require('@/assets/img/weixuexi/login_error.png')" class="img-tips"></div>
                <small v-if="pwdTips===1">密码不符合规则</small>
                <small v-if="pwdTips===2">两次密码不一致</small>
          </div>
      	 <div class="information-item">
      		 <div class="item-font">
      		 	<span style="width: 70px;">确认密码：</span>
      		 </div>
      		 <div class="information">
                <x-input class="x-input" name="confirmPassWord" :type="this.registration_data2.pwdType" v-model="formInline.confirmPassWord" placeholder="请再次输入密码" @keyup.enter="enter"></x-input>
                <div class="pwdOpen" @click="changeType2()" v-if="pwdPicTip2"></div>
                <div class="pwdClose" @click="changeType2()" v-if="!pwdPicTip2"></div>
            </div>
      	</div>
        <div class="smallTip">
                <small>密码规则：密码长度不少于8位，且至少是2种字符组合（英文字母、数字、符号）</small>
        </div>
        <button name="register" :class="computeClass" @click="form_sumbit">注册</button>
      </div>
    </div>
</template>

<script>
import { XInput } from 'vux';

export default {
  name: 'register',
  components: {
    XInput
  },
  data() {
    return {
      show: false,
      text: 'Processing',
      phonecode: '发送验证码',
      phoneTips: 0,
      codeTips: false,
      pwdPicTip: false,
      pwdPicTip2: false,
      pwdTips: 0,
      isregister: false,
      verification: '',
      time: 60,
      formInline: {
        userName: '',
        passWord: '',
        confirmPassWord: '',
        phone: '',
        code: ''
      },
      registration_data: {
        pwdType: 'password'
      },
      registration_data2: {
        pwdType: 'password'
      },
      caption: '注册'
    }
  },
  mounted() {
    if (this.$isWeixinClient && this.$route.name === 'register') {
      document.title = this.caption;
    }
  },
  computed: {
    computeClass() {
      return !this.form_check() ? 'default-bg' : 'active-bg';
    },
    passwordTypeSvgName() {
      return this.pwdPicTip ? 'eye-open' : 'eye-close';
    }
  },
  watch: {
    $route(to) {
      if (this.$isWeixinClient && to.name === 'register') {
        document.title = this.caption;
      }
    }
  },
  methods: {
    handleSubmit() {
      const self = this
      const userName = encodeURIComponent(this.formInline.userName)
      const passWord = encodeURIComponent(this.$encryptUtil.encrypt(this.formInline.passWord, this.formInline.userName))
      self.isregister = true
      const param = 'userName=' + userName + '&password=' + passWord + '&registerCode=&registerType=1&deviceId=00%3A15%3A5d%3A04%3A0f%3A00'
      self.$vux.loading.show({ text: '注册中' })
      this.$http.post('/register', param).then((response) => {
        const user = response.data
        self.isregister = false
        if (user.code === 0) {
          self.$router.back(-1);
        } else {
          // console.log('error')
        }
        self.$vux.loading.hide()
      }, () => {
        self.$vux.loading.hide()
        self.$vux.toast.show({ text: '登录失败', type: 'text' });
      })
    },
    // 时间倒数器
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
        const telReg = /^1[3|4|5|7|8|9]\d{9}$/;
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
              let self = this;
              const phone = encodeURIComponent(this.formInline.phone);
              const functional = encodeURIComponent('register');
              const param = 'phone=' + phone + '&functional=' + functional;
              this.$http.get('/smartBase/validate?' + param).then((response) => {
              const message = response.data
              // 获取验证码
              this.verification = message.result.verification;
              const status = message.result.message;
              if (status === 'validate.fail') {
                this.phoneTips = 2;
              } else {
                  this.timer();
                  this.phonecode = this.time + 's后重发';
              }
              self.isreset = false
              if (message.errorCode === 0) {
                self.$loginService.setLoginUserInfo(message);
              }
                self.$vux.loading.hide()
              }, () => {
                self.$vux.alert.show({ content: '提交信息失败', buttonText: '我知道了' });
                self.loading(false);
              });
              }
        } else {
          this.phoneTips = 1;
        }
    },
    changeType() {
      this.registration_data.pwdType = this.registration_data.pwdType === 'password' ? 'text' : 'password';
      this.pwdPicTip = !this.pwdPicTip;
    },
    changeType2() {
      this.registration_data2.pwdType = this.registration_data2.pwdType === 'password' ? 'text' : 'password';
      this.pwdPicTip2 = !this.pwdPicTip2;
    },
    // 表单提交
      form_sumbit() {
       // 检测所有信息是否输入
       if (this.form_check()) {
          // 检测验证是否有误
          if (!(this.verification === this.formInline.code)) {
              this.codeTips = true;
              return;
          }
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
          const userName = this.formInline.userName
          const phone = this.formInline.phone
          const confirmPassWord = encodeURIComponent(this.formInline.confirmPassWord)
          const passWord = encodeURIComponent(this.formInline.passWord)
          const param = {
              'realname': userName,
              'password': passWord,
              'affirmPassword': confirmPassWord,
              'phone': phone
          }
          this.$http.post('/smartBase/register', param).then((response) => {
          const user = response.data;
          self.isregister = false
          if (user.code === 0) {
             self.$vux.toast.show({ text: '注册成功', type: 'text' });
             this.$emit('getPhone', this.formInline.phone);
             this.$router.back(-1);
          }
          self.$vux.loading.hide()
          }, () => {
            self.$vux.alert.show({ content: '提交信息失败', buttonText: '我知道了' });
//          self.loading(false);
          });
        } else {
          this.$vux.alert.show({ content: '您好，信息未完成填写，请继续填写。', buttonText: '我知道了' });
        }
      },
    enter(event) {
      if (event.keyCode === 13) {
        this.form_sumbit(this.formInline)
      }
    },
    goRegister() {
      const self = this;
      self.$router.push({ path: '/home/0/register' });
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
        formTf = (this.formInline.userName && this.formInline.phone && this.formInline.code && this.formInline.passWord && this.formInline.confirmPassWord);
        return formTf;
     }
  }
}
</script>
<style lang="scss">
.register-box .vux-x-input .weui-icon {
    display: none;
}
.register-box .weui-input {
    margin-top: 20px;
}
.register-box input {
    margin-top: 20px;
    border-width: 1px;
    border-color: #F2F4F5;
}
</style>

<style scoped lang="scss">
.register-box a {
  margin-left: 20px;
  margin-top: 10px;
  text-decoration: none;
  color: grey;
  font-size: $fontSize14;
}
 
.register-box .pwd-button {
    position: absolute;
    right: 10px;
    top: 30px;
}

.register-wrapper {
  /*padding-top: 60px;*/
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

.register-wrapper img {
  width: 40%;
}

.register-box .img-tips{
    width: 16px;
    height: 16px;
}

.register-box {
  
  /*position: relative;
  top:0;*/ 
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}

.register-box .information{
	position: relative;
	margin-right: 10px;
	-moz-box-flex:1;
	-webkit-box-flex:1;
	box-flex:1;
}
.register-box .button-code{
    position: absolute;
    right: 0;
    margin-right: 0;
    top: 3px;
    display: block;
    width: 80px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: $font-select-color;
    border: 1px solid $font-select-color;
    background-color: #fff;
    font-size: 14px;
}

.register-box span{
	  font-size: 1.4rem;
    color: #666666;
    margin-left: 20px;
    display: inline-block;
    width: 30px;
    text-align: right;
}

.register-box .smallTip{
  display: -webkit-inline-flex;
    margin-left: 110px;
    /*margin-top: 10px;*/
    color: #666666;
    font-size: 14px;
}

.register-box input {
    height: 30px;
    border-left: none;
    border-right: none;
    border-top: none;
    margin: 30px 20px 0 20px;
    outline-style: none;
    font-size: 1.4rem;
    padding-left: 3px;
    width: 100%;
}

.register-box .x-input {
    height: 30px;
    border-left: none;
    border-right: none;
    border-top: none;
    margin: 10px 20px 0 20px;
    outline-style: none;
    font-size: 1.4rem;
    padding-left: 3px;
    width: 100%;
    border-bottom: 1px solid #F2F4F5;
}

.register-box button {
  margin: 30px 20px 0 20px;
  background-color: $button-primary-bg-color;
  border-radius: 4px;
  border: none;
  height: 44px;
  color: #fff;
  font-size: $fontSize16;
}

.slide-fade-leave-active {
  transition: all .8s;
}

.slide-fade-leave-to {
  transform: translateX(-500px);
}

.register-box .information{
	position: relative;
	margin-right: 10px;
	-moz-box-flex:1;
	-webkit-box-flex:1;
	box-flex:1;
}

.register-box .information-item {
	display: -webkit-inline-box;
}

.register-box .item-font{
	padding-top: 34px;
}
</style>
