<template>
  <div class="dialog">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.dialog {
  .fcc;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  outline: 1px solid rgba(0, 0, 0, 0.2);
  outline-offset: -1px;
}
</style>
