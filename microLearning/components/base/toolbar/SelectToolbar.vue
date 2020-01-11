<template>
  <div v-if="selectItem" class="select-toolbar-container" @click="selectClickEvent" ref="searchToolbarObj">
    <div class="select-type-title" :class="titleClass">
      <span>{{selectItemText}}</span>
    </div>
    <div v-if="showArrowIcon && selectItemValue" class="select-arrow-icon">
      <!-- <triangle-icon :themeType="triangleIconType"></triangle-icon> -->
    </div>
    <div v-if="isShowSelectListPanel" class="select-list-panel" :style="selectListPanelStyle" @click.stop="hideSelectListPanel">
      <div v-if="selectList" class="select-list-content">
        <div class="select-list-item" :class="{'is-selected': isSelected(item)}"
          v-for="item in selectList" :key="item[itemPropName.valueName]" @click.stop="onSelectItemClick(item)">
          <div class="text">{{item[itemPropName.textName]}}</div>
          <svg-icon :class="{'checked-hidden': !isSelected(item)}"  name="tick" themeType="primary" :width="20" :height="20"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	
// import TriangleIcon from '@/components/base/icons/TriangleIcon';

export default {
  name: 'select-toolbar',
  components: {
    // TriangleIcon
  },
  props: {
    selectItem: {
      type: Object,
      default() {
        return {
          text: '',
          value: ''
        };
      }
    },
    selectList: { // 配置了该项下拉选择数据
      type: Array,
      default: null
    },
    isUseDropdownList: {
      type: Boolean,
      default: true
    },
    propName: {
      type: Object,
      default() {
        return {
          textName: 'text',
          valueName: 'value'
        }
      }
    },
    showArrowIcon: {
      type: Boolean,
      default: true
    },
    selectTypeColor: {
      type: String,
      default: 'green' // 选项颜色 green, black, white
    }
  },
  data() {
    return {
      isShowSelectListPanel: false,
      selectListPanelTop: 44
    }
  },
  computed: {
    selectListPanelStyle() {
      return {
        top: this.selectListPanelTop + 'px'
      }
    },
    itemPropName() {
      return Object.assign({
        textName: 'text',
        valueName: 'value'
      }, this.propName || {});
    },
    titleClass() {
      return {
        'black-font-title': this.selectTypeColor === 'black',
        'white-font-title': this.selectTypeColor === 'white'
      };
    },
    triangleIconType() {
      if (this.selectTypeColor === 'green') {
        return 'primary';
      }
      return this.selectTypeColor;
    },
    selectItemText() {
      if (this.selectItem) {
        return this.selectItem[this.itemPropName.textName];
      }
      return '';
    },
    selectItemValue() {
      if (this.selectItem) {
        return this.selectItem[this.itemPropName.valueName];
      }
      return '';
    }
  },
  methods: {
    setSelectListPanelTop() {
      this.$nextTick(() => {
        if (this.$refs.searchToolbarObj) {
          let rect = this.$refs.searchToolbarObj.getBoundingClientRect();
          if (rect) {
            this.selectListPanelTop = rect.bottom;
          }
        }
      });
    },
    isSelected(item) {
      return item[this.itemPropName.valueName] === this.selectItemValue;
    },
    selectClickEvent() {
      if (this.selectList && this.selectList.length > 0) {
        if (this.isUseDropdownList) {
          this.showDropdownList();
        } else {
          if (this.isShowSelectListPanel) {
            this.hideSelectListPanel();
          } else {
            this.isShowSelectListPanel = true;
            this.setSelectListPanelTop();
          }
        }
        return;
      }
      this.$emit('selectHandler');
    },
    hideSelectListPanel() {
      this.isShowSelectListPanel = false;
    },
    onSelectItemClick(item) {
      const selectedItem = Object.assign({}, item);
      this.selectDropDownItem(selectedItem);
      this.hideSelectListPanel();
    },
    getDropdownListData() {
      const dropDownList = this.selectList.map(item => {
        return {
          value: item[this.itemPropName.valueName],
          label: item[this.itemPropName.textName],
          checked: this.selectItem[this.itemPropName.valueName] === item[this.itemPropName.valueName]
        }
      });
      return dropDownList;
    },
    showDropdownList() {
      const _this = this
      this.$appUtil.showActionSheet({
        menus: this.getDropdownListData(),
        clickMenu(data) {
          setTimeout(() => {
            const selectedItem = {};
            selectedItem[_this.itemPropName.valueName] = data.value;
            selectedItem[_this.itemPropName.textName] = data.label;
            _this.selectDropDownItem(selectedItem);
          }, 100);
        }
      });
    },
    selectDropDownItem(selectedItem) {
      // 如果selectItem设置了.sync则自动更新
      this.$emit('update:selectItem', selectedItem);
      this.$emit('on-select-change', selectedItem);
    }
  }
}
</script>

<style lang='scss' scoped>
.select-toolbar-container {
  width: 100%;
  height: 100%;
  font-size: 18px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  z-index: 10;

  .select-type-title {
    padding: 0 5px;
    text-align: right;
    min-width: 30px;
    max-width: 90%;
    color: $font-important-color;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .black-font-title {
    color: #020F17;
  }

  .white-font-title {
    color: #FFF;
  }

  .select-arrow-icon {
    flex: none;
    width: 16px;
    height: 16px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .select-list-panel {
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);

    .select-list-content {
      background-color: #FFF;
      max-height: 60vh;
      overflow-x: hidden;
      overflow-y: auto;

      .select-list-item {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        font-size: $fontSize16;
        border-bottom: 1px solid $border-default-color;

        .text {
          flex: 1 1 auto;
          width: 100px;
        }

        .checked-hidden {
          margin-left: 10px;
          visibility: hidden;
        }
      }

      .select-list-item:active {
        background-color: $border-default-color;
      }

      .is-selected {
        color: $theme-color;
      }
    }
  }
}
</style>
