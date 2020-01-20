// 管理账号信息
import { USER_STORAGE_KEY } from '@/configs/services/account/accountConfig.js'

import Vue from 'vue'

const thisVue = Vue;

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USER_STORAGE_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USER_STORAGE_KEY, JSON.stringify(users));
}

const login = function(UserInfo) {
	return thisVue.http.postFormData('/login', UserInfo);
}

export default {
	getUsers,
	addUser,
	login
}
