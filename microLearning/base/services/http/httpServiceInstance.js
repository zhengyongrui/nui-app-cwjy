import httpServiceConfig from '../../../configs/services/http/httpServiceConfig.js'

/**
 * 表单提交方法
 * @param { String } url
 * @param { Object| String } data
 * @param { Object } config
 * @returns
 */
function postFormData(url, data, config) {
	let postFormConfig = {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	};
	postFormConfig = Object.assign(postFormConfig, config);
	return new Promise((resolve, reject) => {
		uni.request(Object.assign(postFormConfig,
		{
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
	debugger
	return new Promise((resolve, reject) => {
		debugger
		uni.request(Object.assign(
			config, {
				url: httpServiceConfig.baseURL + url,
				method: 'GET',
				data: data,
				success: (res) => {
					processResponseData(res, resolve, reject)
				},
				fail: (error) => {
					reject(error);
				}
			}
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
	return new Promise((resolve, reject) => {
		uni.request(Object.assign(
			config, {
				url: httpServiceConfig.baseURL + url,
				method: 'POST',
				data: data,
				success: (res) => {
					processResponseData(res, resolve, reject)
				},
				fail: (error) => {
					reject(error);
				}
			}
		));
	})
}

function processResponseData(response, resolve, reject) {
	debugger
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

export default {
	get,
	post,
	postFormData
}
