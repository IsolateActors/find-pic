<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  mounted() {
    // console.log(this.list);
    // console.log(this.index);
  },
  methods: {
    handleClick() {
      // 数据缓存下来
      // 全局
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;

      //   点击跳转
      uni.navigateTo({
        url: "/pages/imgDetail/index"
      });
    }
  }
};
</script>

<style></style>
