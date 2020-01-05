/**
 * 登录服务类方法
 * @author linjianqun
 * @version 2018-04-24
 */
import Vue from 'vue';

const thisVue = Vue;

const USER_STORAGE_KEY = 'userInfo';

const IS_USER_INFO_ENCRYPT_KEY = 'isUserInfoEncrypt';

const USER_INFO_ENCRYPT_KEY = 'home';

const loginApi = {
  login: 'login',
  logOut: 'login/logout',
  weixinLogin: 'smartWeixinQyh/getWeixinUserByCompany',
  tokenLogin: 'login/accessTokenLogin',
  forgetPasswordUpdate: 'smartBase/forgetPasswordUpdate',
  forgetPasswordValidateCheck: 'smartBase/forgetPasswordValidateCheck'
};

// 更新用户信息
const updateUserInfoObj = {
  isUpdate: false,
  updated() {
    this.updateCallback();
    this.isUpdate = false;
  },
  updateCallback: () => {}
};

/**
 * 原来的登录接口
 * @param {*} userName
 * @param {*} password
 * @returns
 */
function loginPromise(userName, password) {
  let params = {
    userName: userName,
    password: password,
    loginType: 1,
    deviceId: '00%3A15%3A5d%3A04%3A0f%3A00'
  };
  return thisVue.http.postFormData(loginApi.login, params, { accessToken: '' });
}

/**
 * 统一的登录方法
 * @param { String } userName
 * @param { String } password
 */
function login(userName, password) {
  const _userName = encodeURIComponent(userName);
  const _password = encodeURIComponent(thisVue.encryptUtil.encrypt(password, userName));
  return loginPromise(_userName, _password);
}

/**
 * 微信客户端登录
 * @param { String } params
 */
function loginWeixinClient(params) {
  return thisVue.http.get(loginApi.weixinLogin, { 'params': params }, { accessToken: '' });
}

/**
 * 根据新的token信息进行登录
 * @param { String } newAccseeToken
 */
function loginByAccessToken(newAccseeToken) {
  let params = {
    accessToken: newAccseeToken
  };
  return thisVue.http.postFormData(loginApi.tokenLogin, params);
}

 /**
  * 设置登录用户信息
  * @param { Object } userInfo
  */
function setLoginUserInfo(userInfo) {
  if (!userInfo) {
    return;
  }
  const encryptString = encodeURIComponent(JSON.stringify(userInfo));
  const encryptUserInfo = thisVue.encryptUtil.encrypt(encryptString, USER_INFO_ENCRYPT_KEY);
  thisVue.localStorageUtil.set(USER_STORAGE_KEY, encryptUserInfo);
  thisVue.localStorageUtil.set(IS_USER_INFO_ENCRYPT_KEY, '1');
}

/**
 * 获取登录用户信息
 */
function getLoginUserInfo() {
  const isUserInfoEncrypt = thisVue.localStorageUtil.get(IS_USER_INFO_ENCRYPT_KEY);
  let userInfoString = thisVue.localStorageUtil.get(USER_STORAGE_KEY);
  if (isUserInfoEncrypt === '1' && userInfoString && typeof userInfoString === 'string') {
    userInfoString = thisVue.encryptUtil.decrypt(userInfoString, USER_INFO_ENCRYPT_KEY);
    userInfoString = decodeURIComponent(userInfoString);
    try {
      userInfoString = JSON.parse(userInfoString);
    } catch (e) {
      userInfoString = {};
    }
  }
  return userInfoString;
}

/**
 * 获取登录用户信息回调
 */
function getLoginUserInfoPromise() {
  let callback = (resolve) => {
    let value = getLoginUserInfo();
    resolve(value);
  };
  return new Promise((resolve) => {
    if (updateUserInfoObj.isUpdate) {
      updateUserInfoObj.updateCallback = () => {
        callback(resolve);
      }
    } else {
      callback(resolve);
    }
  })
}

/**
 * 设置用户信息更新标志
 * @param { Boolean } isUpdate
 */
function setUserInfoUpdateStatus(isUpdate) {
  updateUserInfoObj.isUpdate = isUpdate;
}

/**
 * 更新用户信息
 * @param { Object } userInfo
 */
function updateUserInfo(userInfo) {
  setLoginUserInfo(userInfo);
  updateUserInfoObj.updated();
}

/**
 * 退出登录
 */
function logOut() {
  thisVue.http.get(loginApi.logOut);
}

/**
 * 更新登录上下文
 */
function updateLoginContext(newInfo) {
  if (newInfo && typeof newInfo === 'object') {
    let userInfo = getLoginUserInfo();
    userInfo = Object.assign(userInfo, newInfo);
    setLoginUserInfo(userInfo);
  }
}

/**
 * 更新登录上下文
 */
function forgetPasswordUpdatePromise(phone, newPassword) {
  let params = {
    phone,
    newPassword
  }
  return thisVue.http.get(loginApi.forgetPasswordUpdate, { params });
}

function forgetPasswordValidateCheckPromise(phone, validateCode) {
  let params = {
    phone,
    validateCode
  }
  return thisVue.http.get(loginApi.forgetPasswordValidateCheck, { params });
}

export default {
  login,
  logOut,
  loginWeixinClient,
  loginByAccessToken,
  setLoginUserInfo,
  getLoginUserInfo,
  getLoginUserInfoPromise,
  setUserInfoUpdateStatus,
  updateUserInfo,
  loginPromise,
  updateLoginContext,
}

export {
  forgetPasswordUpdatePromise,
  forgetPasswordValidateCheckPromise,
}
