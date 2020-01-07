function replace(routeOptions) {
	uni.redirectTo({
		url: routeOptions.name
	})
}

function push(routeOptions) {
	uni.navigateTo({
		url: routeOptions.name
	})
}

function back() {
	uni.navigateBack({
		delta: 1
	})
}

export default {
	replace,
	push
}
