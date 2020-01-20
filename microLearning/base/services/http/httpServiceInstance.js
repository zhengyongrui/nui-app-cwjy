import httpServiceConfig from '@/configs/services/http/httpServiceConfig.js'
import localStorageUtil from '@/base/utils/localStorageUtil.js'
import { USER_STORAGE_KEY } from '@/configs/services/account/accountConfig.js'

/**
 * 表单提交方法
 * @param { String } url
 * @param { Object| String } data
 * @param { Object } config
 * @returns
 */
function postFormData(url, data, config) {
	let defaultRequestConfig = {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	};
	let requestConfig = Object.assign(defaultRequestConfig, config);
	return new Promise((resolve, reject) => {
		uni.request(Object.assign(requestConfig, {
			url: httpServiceConfig.baseURL + url,
			method: 'POST',
			data: data,
			success: (res) => {
				processResponseData(res, resolve, reject)
			},
			fail: (error) => {
				reject(error);
			}
		}));
	})
}

/**
 * get提交方法
 * @param { String } url
 * @param { Object } data
 * @param { Object } config
 * @returns
 */
function get(url, data, config) {
	let defaultRequestConfig = {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	};
	let requestConfig = Object.assign(defaultRequestConfig, config);
	return new Promise((resolve, reject) => {
		uni.request(Object.assign(
			requestConfig, {
				url: httpServiceConfig.baseURL + url,
				method: 'GET',
				data: data,
				success: (res) => {
					processResponseData(res, resolve, reject)
				},
				fail: (error) => {
					reject(error);
				}
			},
		));
	})
}

/**
 * post提交方法
 * @param { String } url
 * @param { Object } data
 * @param { Object } config
 * @returns
 */
function post(url, data, config) {
	let defaultRequestConfig = {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	};
	let requestConfig = Object.assign(defaultRequestConfig, config);
	return new Promise((resolve, reject) => {
		uni.request(Object.assign(requestConfig, {
			url: httpServiceConfig.baseURL + url,
			method: 'POST',
			data: data,
			success: (res) => {
				processResponseData(res, resolve, reject)
			},
			fail: (error) => {
				reject(error);
			}
		}));
	})
}

function processResponseData(response, resolve, reject) {
	const errorHandler = (error) => {
		console.error(error);
		reject(error);
	};
	if (response.statusCode === 200) {
		const responseData = response.data;
		if (responseData.code === 0) {
			if (responseData.body) {
				response.data = responseData.body;
				resolve(response)
				return
			}
			resolve(responseData)
		} else {
			errorHandler(responseData);
		}
	} else {
		errorHandler(response, reject)
	}
}

function transferHttpRequestConfig(requestConfig) {
	if (requestConfig) {
		var userInfo = localStorageUtil.get(USER_STORAGE_KEY);
		if (userInfo && userInfo.ecsToken) {
			requestConfig.header = Object.assign({}, requestConfig.header, {
				ecsToken: userInfo.ecsToken
			})
		}
	}
}

export default {
	get,
	post,
	postFormData
}
