import httpService from '../services/http/httpService.js';

/**
 * 添加全局方法或者属性
 * @param { Object } Vue
 */
function initVueGlobalMethods(Vue) {
  Vue.httpService = httpService;
  Vue.http = httpService.getHttpInstance();
}

/**
 * 定义实例方法
 * @param { Object } Vue
 */
function initVuePrototype(Vue) {
  Vue.prototype.$http = httpService.getHttpInstance();
}

/**
 * 初始化
 * @param { Object } Vue
 */
function init(Vue) {
  // 添加全局方法或者属性
  initVueGlobalMethods(Vue);
  // 配置全局工具类
  initVuePrototype(Vue);
}

const plugin = {
  install(Vue) {
    init(Vue);
  }
}

export default plugin
export const install = plugin.install