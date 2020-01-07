/**
 * 显示toast
 * @param { Object|String } toastParam
 * @param { Function } onHideCallback
 */
function showToast(toastParam, onHideCallback) {
	let toastOptions = {
		position: 'center',
		icon: 'none',
		mask: true,
		duration: 1000
	};
	if (typeof toastParam === 'string') {
		toastOptions.title = toastParam;
	} else if (typeof toastParam === 'object') {
		toastOptions = Object.assign({}, toastOptions, toastParam);
	}
	if (onHideCallback) {
		toastOptions.complete = onHideCallback;
	}
	uni.showToast(toastOptions);
}

/**
 * 显示加载动画
 * @param { Object|String } loadingParam
 */
function showLoading(loadingParam) {
	let loadingOptions = {
		title: '加载中...',
		mask: true,
	};
	if (typeof loadingParam === 'string') {
		loadingOptions.title = toastParam;
	} else if (typeof toastParam === 'object') {
		loadingOptions = Object.assign({}, loadingOptions, toastParam);
	}
	uni.showLoading(loadingOptions);
}

/**
 * 隐藏加载动画
 */
function hideLoading() {
	uni.hideLoading()
}

export default {
	showToast,
	showLoading,
	hideLoading
}
