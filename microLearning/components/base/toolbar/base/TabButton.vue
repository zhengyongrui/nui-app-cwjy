<template>
  <div class="tab-button-component-class" :class="tabButtonClass" @click="buttonClickEvent">
    <template v-if="type==='default' && buttonItem">
      <div class="flex-item-title">
        <span class="title-text">{{buttonItem.title}}</span>
        <span v-if="buttonItem.showCount" class="count-text">({{buttonItem.count}})</span>
      </div>
      <div v-if="buttonItem.showRedDot" class="red-dot"></div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'tab-button',
  props: {
    type: {
      type: String,
      default: 'default'  // 支持default和customType
    },
    buttonItem: {
      type: Object,
      default: null   // demo:{ title: '搜索', value: 'search', showCount: true, count: 0, showRedDot: false }
    },
    activeValue: {
      type: [String, Number],
      default: null
    },
    showSplitLine: {
      type: Boolean,
      default: false
    },
    activeButtonStyleType: {
      type: String,
      default: 'default'  // 目前支持default, whiteType
    }
  },
  computed: {
    isActive() {
      if (this.buttonItem) {
        return this.activeValue === this.buttonItem.value;
      }
      return false;
    },
    tabButtonClass() {
      return {
        'vertical-right-line': this.showSplitLine,
        'tab-button-active-class': this.isActive,
        'tab-button-active-white-class': this.isActive && this.activeButtonStyleType === 'whiteType'
      };
    }
  },
  methods: {
    buttonClickEvent() {
      if (this.buttonItem) {
        this.$emit('onButtonClick', this.buttonItem.value);
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$greenActiveColor: $tabbar-select-font-color;
$whiteActiveColor: #FFF;

.tab-button-component-class {
  flex: 1 1 auto;
  -webkit-flex: 1;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 14px;

  .flex-item-title {
    height: 100%;
    padding: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
          
    .title-text {
      white-space: nowrap;
    }

    .count-text {
      font-size: 14px;
    }
  }

  .red-dot {
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #DE101D;
    position: relative;
    bottom: 8px;
    left: -6px;
    z-index: 10;
  }

}

.tab-button-active-class {
  font-size: 16px;
  color: $greenActiveColor;

  .flex-item-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: $greenActiveColor;
  }

  .red-dot {
    bottom: 10px;
  }
}

.tab-button-active-white-class {
  color: $whiteActiveColor;

  .flex-item-title:after {
    background-color: $whiteActiveColor;
  }
}

.vertical-right-line:after {
  content: '';
  background-color: $tabbar-line-color;
  height: 28px;
  width: 1px;
  position: absolute;
  right: 0;
  top: 8px;
}
</style>

