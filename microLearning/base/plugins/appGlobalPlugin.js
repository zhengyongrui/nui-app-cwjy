import servicePlugin from './servicePlugin.js';
import utilPlugin from './utilPlugin.js';

/**
 * 初始化
 * @param { Object } Vue
 */
function init(Vue) {
	Vue.use(servicePlugin);
	Vue.use(utilPlugin);
}

const plugin = {
	/* eslint-disable no-unused-vars */
	install(Vue, options) {
		init(Vue);
	}
}

export default plugin
export const install = plugin.install
