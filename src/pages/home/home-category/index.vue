<template>
  <scroll-view scroll-y enable-flex class="home-category">
    <navigator
      :url="`/pages/imgCategory/index?id=${item.id}`"
      class="category-item"
      v-for="item in category"
      :key="item.id"
    >
      <image class="image" mode="aspectFill" :src="item.cover"></image>
      <text class="category-name">{{ item.name }}</text>
    </navigator>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      category: []
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类"
    });

    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category"
      })
        .then(result => {
          // console.log(result);
          this.category = result.res.category;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.home-category {
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: wrap;
  .category-item {
    width: 33.33%;
    height: calc(750rpx / 3);
    position: relative;
    border: 4rpx solid #fff;
    .image {
      width: 100%;
      height: 100%;
    }

    .category-name {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: 20rpx;
      color: #fff;
      // font-size: 30rpx;

      width: 100%;
      height: 40rpx;
      line-height: 40rpx;

      // 渐变
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0)
      );
    }
  }
}
</style>
