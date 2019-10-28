<template>
  <div class="poup" :class="{ mine }">
    <slot></slot>
    <div class="trangle"></div>
  </div>
</template>

<script>
export default {
  props: ["mine"]
};
</script>

<style lang="less" scoped>
.poup {
  align-self: flex-start;
  margin: 10px 20px;
  position: relative;
  display: inline-block;
  max-width: 500px;
  padding: 20px;
  background-color: aquamarine;
  border-radius: 12px;
  font-size: 28px;
  color: rgb(48, 46, 46);
  text-align: left;
  .trangle {
    position: absolute;
    transform: translate(-98%, -50%);
    top: 40px;
    left: 0;
    border: 18px solid transparent;
    border-right-color: aquamarine;
  }
  &.mine {
    align-self: flex-end;
    .trangle {
      transform: translate(98%, -50%);
      left: auto;
      right: 0;
      border-right-color: transparent;
      border-left-color: aquamarine;
    }
  }
}
</style>
