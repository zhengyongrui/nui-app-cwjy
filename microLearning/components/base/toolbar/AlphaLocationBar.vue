<template>
  <div class="alpha-location-bar-component">
    <div class="alpha-key" v-for="(alpha, index) in alphaList" :key="index" @click.stop="onAlphaItemClick(index, alpha)">{{alpha}}</div>
  </div>
</template>

<script>
export default {
  name: 'alpha-location-bar',
  props: {
    alphaList: {
      type: Array,
      default() {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
      }
    }
  },
  methods: {
    onAlphaItemClick(index, alpha) {
      this.$emit('on-alpha-click', index, alpha);
    }
  }
}
</script>

<style lang="scss" scoped>
.alpha-location-bar-component {
  position: fixed;
  right: 0;
  top: 50px;
  bottom: 6px;
  width: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;

  .alpha-key {
    height: 18px;
    width: 18px;
    border-radius: 100%;
    line-height: 1.3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: $font-info-color;
    margin-bottom: 2px;
  }

  .alpha-key:active {
    color: #FFF;
    background-color: $font-select-color;
  }
}

@media screen and (max-width: 320px) {
  .alpha-location-bar-component {
    .alpha-key {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
