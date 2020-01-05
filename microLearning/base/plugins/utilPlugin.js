import encryptUtil from '../utils/encryptUtil';

/**
 * 添加全局方法或者属性
 * @param { Object } Vue
 */
function initVueGlobalMethods(Vue) {
  Vue.encryptUtil = encryptUtil;
}

/**
 * 定义实例方法
 * @param { Object } Vue
 */
function initVuePrototype(Vue) {
  Vue.prototype.$encryptUtil = encryptUtil;
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
