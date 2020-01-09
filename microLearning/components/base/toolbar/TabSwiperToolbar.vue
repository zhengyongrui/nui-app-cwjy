<template>
  <app-swiper ref="tabSwiperObj" class="tab-swiper-toolbar-component" :value="currentIndex" :options="swiperOption">
    <div class="swiper-slide tab-button" :class="{'tab-button-active':activeIndex===index}" v-for="(item, index) in tabButtonList" :key="item.value" @click="tabItemClick(index)">
			<div class="tab-text">
        {{item.text}}
      </div>
		</div>
  </app-swiper>
</template>

<script>
export default {
  name: 'tab-swiper-toolbar',
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    tabButtonList: {
      type: Array,
      default() {
        return []
      }
    },
    slidesPerView: { // 一个面板显示的数量
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  mounted() {
    this.activeIndex = this.currentIndex;
  },
  computed: {
    swiperOption() {
      let slidesPerView = this.slidesPerView;
      if (this.tabButtonList.length < this.slidesPerView) {
        slidesPerView = this.tabButtonList.length;
      }
      return {
        slidesPerView: slidesPerView
      };
    }
  },
  methods: {
    tabItemClick(index) {
      this.activeIndex = index;
      let item = this.tabButtonList[index];
      this.$emit('on-tab-click', item);
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-swiper-toolbar-component {
  flex: none;
  background-color: #F2F4F5;

  .tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 16px;
    height: 40px;
    position: relative;

    .tab-text {
      text-align: center;
      max-height: 36px;
      padding: 4px 2px;
    }

  }

  .tab-button-active {

    .tab-text {
      color: $font-important-color;
    }

    .tab-text:after {
      content: '';
      height: 2px;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      border-bottom: 2px solid $font-important-color;
    }

  }
}
</style>
