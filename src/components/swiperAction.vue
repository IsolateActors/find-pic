<template>
  <!-- 封装滑动事件返回滑动方向 -->
  <view @touchstart="handleTouchstar" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 按下时间
      startTime: 0,
      // 按下坐标
      startX: 0,
      startY: 0
    };
  },
  methods: {
    handleTouchstar(event) {
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    handleTouchend(event) {
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      // 判断按下时长
      if (endTime - this.startTime > 2000) {
        return;
      }

      //   滑动方向
      let direction = "";

      // 先判断距离合法，后判断方向
      if (
        Math.abs(endX - this.startX) > 10 &&
        Math.abs(endY - this.startY) < 10
      ) {
        // 方向
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }

      //   合法滑动操作,返回对象方便动态修改
      this.$emit("swiperAction", { direction });
    }
  }
};
</script>

<style></style>
