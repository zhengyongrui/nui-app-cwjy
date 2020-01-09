<template>
  <div class="slide-menu-bar-component">
    <div class="left-menu" ref="lefMenuObj" v-smooth-scroll>
      <div v-for="(item, index) in menuList" ref="menuItem" class="menu-item" :class="{'active-class': isActive(item)}" :key="index" @click="clickMenuItem(item)">{{formatItemText(item)}}</div>
    </div>
    <div v-if="isShowRightBtn" class="right-menu" :class="{'red-dot-class': isShowRedDot}"  @click="clickRightBtn">
      <svg-icon :name="'list'" size-type="sm"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slide-menu-bar',
  props: {
    activeItem: {
      type: Object,
      default() {
        return {};
      }
    },
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    propOption: {
      type: Object,
      default() {
        return {
          idPropName: 'id',
          valuePropName: 'value'
        }
      }
    },
    isShowRedDot: {
      type: Boolean,
      default: false
    },
    // 是否显示右侧按钮
    isShowRightBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      curActiveItem: {}
    }
  },
  mounted() {
    this.curActiveItem = this.activeItem;
  },
  watch: {
    activeItem: {
      handler(newValue) {
        this.curActiveItem = newValue;
      },
      deep: true
    }
  },
  methods: {
    isActive(menuItem) {
      if (Object.keys(menuItem).length === 0) {
        return false;
      }
      if (this.propOption.idPropName && menuItem[this.propOption.idPropName] === this.curActiveItem[this.propOption.idPropName]) {
        return true;
      }
      return false;
    },
    formatItemText(menuItem) {
      if (!this.propOption.valuePropName || !menuItem || !menuItem[this.propOption.valuePropName]) {
        return null;
      }
      let itemText = menuItem[this.propOption.valuePropName];
      if (itemText.length > 5) {
        return itemText.slice(0, 5) + '...';
      }
      return itemText;
    },
    clickMenuItem(menuItem) {
      this.curActiveItem = menuItem;
      this.$emit('on-click-menu', this.curActiveItem);
    },
    clickRightBtn() {
      this.$emit('on-click-more');
    },
    // 定位滚动条位置,传入id,滑动至当前项
    locateById(menuItemId) {
      if (!this.menuList || this.menuList.length === 0 || !menuItemId) {
        return;
      }
      const existIndex = this.menuList.findIndex((item) => {
        return item[this.propOption.idPropName] === menuItemId;
      });
      if (existIndex < 0) {
        return;
      }
      let locationMenuItem = this.$refs.menuItem[existIndex];
      if (!locationMenuItem) {
        return;
      }
      let scorllLeft = 0;
      if (locationMenuItem.offsetLeft - 10 > 0) {
        scorllLeft = locationMenuItem.offsetLeft - 10;
      }
      this.$refs.lefMenuObj.scrollLeft = scorllLeft;
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-menu-bar-component {
  display: flex;
  position: relative;

  .left-menu {
    flex: 1 1 auto;
    width: 100px;
    height: 45px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    background-color: #F7F7FA;
    padding: 0 7px;
    overflow-x: scroll;
    overflow-y: hidden;

    .menu-item {
      flex: none;
      -webkit-flex: none;
      display: inline-block;
      min-width: 40px;
      margin: 0 7px;
      padding: 10px 0;
      white-space: nowrap;
      font-size: $fontSize16;
      text-align: center;
      position: relative;
		}
  }

  .left-menu::-webkit-scrollbar {
    display: none;
  }

  .right-menu {
    flex: none;
    width: 45px;
    border-left: 1px solid #F2F4F5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

}

.active-class {
  color: $font-important-color;
}

.active-class:after {
  content: '';
  height: 2px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-bottom: 2px solid $font-important-color;
}

.slide-menu-bar-component:after {
  content: '';
	position: absolute;
	bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #F2F4F5;
}

.red-dot-class:after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #E62129;
  position: absolute;
  top: 6px;
  right: 8px;
}
</style>
