// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

import Vue from 'vue'

const thisVue = Vue;

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
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
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const login = function(UserInfo) {
	return thisVue.http.postFormData('/login', UserInfo);
}

export default {
	getUsers,
	addUser,
	login
}
