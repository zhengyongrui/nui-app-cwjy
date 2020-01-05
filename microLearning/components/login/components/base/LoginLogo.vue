<template>
  <div v-if="option" class="login-logo-component">
    <img :src="option.src" :style="option.style"/>
  </div>
</template>

<script>
export default {
  name: 'login-logo',
  props: {
    option: {
      type: Object,
      default() {
        return {
          src: '',
          style: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-logo-component {
  flex: none;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 99px;
    height: 75px;
  }
}
</style>
