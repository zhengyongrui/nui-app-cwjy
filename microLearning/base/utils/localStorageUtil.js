/**
 * 写缓存信息
 * @param { String } key
 * @param { Object } value
 */
function set(key, value) {
  let tempValue = value;
  if (tempValue) {
    tempValue = JSON.stringify(value);
  }
  uni.setStorageSync(key, tempValue);
}

/**
 * 读缓存信息
 * @param { String } key
 */
function get(key) {
  if (!key) {
    return null;
  }
  let value = uni.getStorageSync(key);
  if (value && value !== 'undefined' && value !== 'null') {
    return JSON.parse(value);
  }
  return null;
}

/**
 * 根据关键字清除缓存信息
 * @param { String } key
 */
function remove(key) {
  uni.removeStorageSync(key);
}

/**
 * 清空本地缓存信息
 */
function clear() {
  uni.clearStorage();
}

export default {
  get,
  set,
  remove,
  clear
}
