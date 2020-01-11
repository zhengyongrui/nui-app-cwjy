import Vue from 'vue';

const thisVue = Vue;

const DISPLAYTYPE_KEY = 'cache_examinationMainDisplayType';
const EXAMINEPLANID_KEY = 'cache_examinationMainPlanId';
const PRACTICE_CHOOSENID_KEY = 'practice_ChoosenId_';

function getExaminationMainDisplayType() {
  return thisVue.appService.getParamValue('displayType', 'all', true, DISPLAYTYPE_KEY);
}

function getExaminationMainPlanId() {
  return thisVue.appService.getParamValue('examinePlanId', '', true, EXAMINEPLANID_KEY);
}

function removeExaminationMainCache() {
  sessionStorage.removeItem(DISPLAYTYPE_KEY);
  sessionStorage.removeItem(EXAMINEPLANID_KEY);
}

function getPracticeChoosenIDKey() {
  let userInfo = thisVue.loginService.getLoginUserInfo();
  if (!userInfo || !userInfo.userId) {
    return PRACTICE_CHOOSENID_KEY;
  }
  return PRACTICE_CHOOSENID_KEY + userInfo.userId;
}

function getPracticeChoosenID() {
  let key = getPracticeChoosenIDKey();
  return thisVue.localStorageUtil.get(key);
}

function setPracticeChoosenID(practiceCategoryId) {
  if (!practiceCategoryId) {
    return;
  }
  let key = getPracticeChoosenIDKey();
  thisVue.localStorageUtil.set(key, practiceCategoryId);
}

function removePracticeChoosenID() {
  let key = getPracticeChoosenIDKey();
  thisVue.localStorageUtil.remove(key);
}

// 在列表中搜索是否存在本地缓存对应的分类对象， 存在则返回， 不存在则返回列表中的第一个
function getPracticeCategoryItem(practiceCategoryList) {
  if (!practiceCategoryList || practiceCategoryList.length === 0) {
    return {
      categoryId: '',
      categoryName: '',
    };
  }
  let cachePracticeCategoryId = getPracticeChoosenID();
  if (!cachePracticeCategoryId) {
    return practiceCategoryList[0];
  }
  let selectedCategoryItem;
  let item;
  let secondItem;
  let existItem = false;
  for (let i = 0, len = practiceCategoryList.length; i < len; i++) {
    item = practiceCategoryList[i];
    if (cachePracticeCategoryId === item.categoryId) {
      existItem = true;
      selectedCategoryItem = item;
      break;
    }
    // 存在二级类别
    if (item.topicCategoryVos && item.topicCategoryVos.length > 0) {
      for (let j = 0, secondLen = item.topicCategoryVos.length; j < secondLen; j++) {
        secondItem = item.topicCategoryVos[j];
        if (cachePracticeCategoryId === secondItem.categoryId) {
          existItem = true;
          selectedCategoryItem = secondItem;
          break;
        }
      }
    }
    if (existItem) {
      break;
    }
  }
  if (!existItem) {
    selectedCategoryItem = practiceCategoryList[0];
  }
  return selectedCategoryItem;
}

export default {
  // 获取提能考核首页显示的类型，默认是all
  getExaminationMainDisplayType() {
    return getExaminationMainDisplayType();
  },
  getExaminationMainPlanId() {
    return getExaminationMainPlanId();
  },
  removeExaminationMainCache() {
    removeExaminationMainCache();
  },
  getPracticeChoosenID() {
    return getPracticeChoosenID();
  },
  setPracticeChoosenID(practiceCategoryId) {
    setPracticeChoosenID(practiceCategoryId);
  },
  removePracticeChoosenID() {
    removePracticeChoosenID();
  },
  getPracticeCategoryItem(practiceCategoryList) {
    return getPracticeCategoryItem(practiceCategoryList);
  }
}
