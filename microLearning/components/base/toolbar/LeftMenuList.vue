<template>
  <div class="left-menu-list-component" v-smooth-scroll>
    <div v-for="(item, index) in menuList" :key="index" class="menu-item" :class="{'menu-item-active': isActive(item),'menu-smaller':item.name && item.name.length>4}" @click="clickMenuItem(item)">
      <span class="menu-text">{{memuItemName(item)}}</span>
      <div v-if="isShowRedPoint(item)" class="red-dot" :class="{'smaller-red-point':item.name && item.name.length>4}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu-list',
  props: {
    curActiveItemId: {
      type: String,
      default: ''
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    propOption: {
      type: Object,
      default() {
        return {
          idPropName: 'id',
          valuePropName: 'value',
          redDotPropName: 'isShowRedDot'
        }
      }
    },
  },
  data() {
    return {}
  },
  methods: {
    memuItemName(menuItem) {
      if (this.propOption && this.propOption.valuePropName && menuItem && menuItem[this.propOption.valuePropName]) {
        return menuItem[this.propOption.valuePropName];
      }
      return '';
    },
    isActive(menuItem) {
      if (this.propOption && this.propOption.idPropName && menuItem && menuItem[this.propOption.idPropName]) {
        return this.curActiveItemId === menuItem[this.propOption.idPropName];
      }
      return false;
    },
    isShowRedPoint(menuItem) {
      if (this.propOption && this.propOption.redDotPropName && menuItem && menuItem[this.propOption.redDotPropName]) {
        return menuItem[this.propOption.redDotPropName];
      }
      return false;
    },
    clickMenuItem(menuItem) {
      this.$emit('on-click-menu', menuItem);
    },
  }
}
</script>

<style lang="scss" scoped>
.left-menu-list-component {
  width: 90px;
  padding-bottom: 20px;
  background: #f2f4f5;
  font-size: $fontSize16;
  overflow-y: auto;
  overflow-x: hidden;

  .menu-item {
    font-size: $fontSize14;
    display: flex;
    justify-content: center;
    padding: 12px 4px;
  }
  
  .menu-smaller {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; // 限制快级元素的文本行数
    overflow: hidden;
    position: relative;
  }

  .menu-text {
    overflow: hidden;
    display: block;
  }

  .red-dot {
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #de101d;
    position: relative;
    bottom: 2px;
    left: 0px;
    z-index: 10;
  }

  .smaller-red-point {
    position: absolute;
    bottom: auto;
    left: auto;
    right: 6px;
    top: 12px;
  }
  
  .menu-item-active {
    background: white;
  }
}
</style>
