<template>
  <scroll-view scroll-y enable-flex @scrolltolower="handleScrollToLower">
    <view class="video-main">
      <view
        class="video-item"
        v-for="item in videowp"
        :key="item.id"
        @click="handleVideo(item)"
      >
        <image mode="widthFix" :src="item.img"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: ["urlobj"],
  data() {
    return {
      videowp: [],
      hasMore: true
    };
  },
  watch: {
    urlobj: function() {
      //   console.log(this.urlobj);

      //   重置数据
      this.videowp = [];
      this.getList();
    }
  },
  mounted() {
    // console.log(this.urlobj);
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      })
        .then(result => {
          //   console.log(result);
          if (result.res.videowp.length === 0) {
            this.hasMore = false;

            uni.showToast({
              title: "无更多数据",
              icon: "none"
            });
            return;
          }
          this.videowp = [...this.videowp, ...result.res.videowp];
        })
        .catch(err => {});
    },
    handleScrollToLower() {
      //   console.log("底");
      if (this.hasMore) {
        this.urlobj.params.skip += this.urlobj.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
      }
    },
    handleVideo(item) {
      // 存到全局共享中
      getApp().globalData.video = item;

      uni.navigateTo({
        url: "/pages/videoPlay/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-main {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .video-item {
    width: 33.3%;
    padding: 5rpx;
  }
}
</style>
