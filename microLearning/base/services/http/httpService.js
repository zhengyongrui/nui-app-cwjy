import httpServiceInstance from './httpServiceInstance.js'

let httpInstance = null;

/**
 * 获取http实例
 */
function getHttpInstance() {
	if (httpInstance === null) {
		initHttpInstance()
	}
	return httpInstance;
}

/**
 * 初始化http实例
 */
function initHttpInstance() {
	httpInstance = httpServiceInstance;
	return httpInstance;
}

export default {
	getHttpInstance,
	initHttpInstance
}
