<template>
  <div class="tab-container-component-class">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tab-container'
}
</script>

<style lang='scss' scoped>
.tab-container-component-class {
  width: 100%;
  height: 44px;
  padding: 0;
  display: flex;
  display: -webkit-flex; 
  align-items: center;
}
</style>

