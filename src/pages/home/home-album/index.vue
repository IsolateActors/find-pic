<template>
  <view>
    <!-- 
      1. 自动轮播 autoplay
      2.指示器 indicator-dots
      3.衔接滑动 circular
     -->
    <!-- 轮播图 start -->
    <view class="album-swiper">
      <swiper class="swiper" autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image class="image" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图 end -->

    <!-- 列表 start -->
    <scroll-view class="album-list" scroll-y @scrolltolower="handleToLower">
      <navigator
        :url="`/pages/album/index?id=${item.id}`"
        class="album-item"
        v-for="item in album"
        :key="item.id"
      >
        <view class="album-img">
          <image class="image" mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="album-info">
          <view class="album-name">{{ item.name }}</view>
          <view class="album-desc">{{ item.desc }}</view>
          <view class="album-btn">
            <view class="album-attention">+ 关注</view>
          </view>
        </view>
      </navigator>
    </scroll-view>
    <!-- 列表 end -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0
      },
      // 轮播图
      banner: [],
      // 列表
      album: [],

      // 分页
      hasMore: true,
      // 第一次触底且无数据
      isFirstToBottom: true
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑"
    });

    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "/image/v1/wallpaper/album",
        data: this.params
      })
        .then(result => {
          // console.log(result);
          if (this.banner.length === 0) {
            this.banner = result.res.banner;
            // this.album = result.res.album;
          }

          if (result.res.album.length === 0) {
            this.hasMore = false;

            uni.showToast({
              title: "无更多数据",
              icon: "none"
            });
            this.isFirstToBottom = false;
            return;
          }
          this.album = [...this.album, ...result.res.album];
        })
        .catch(err => {});
    },
    handleToLower() {
      // console.log("到底了");
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else if (this.isFirstToBottom) {
        uni.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
        this.isFirstToBottom = false;
      }
    }
  }
};
</script>

<style lang="scss">
.album-swiper {
  .swiper {
    height: 360rpx;
    .image {
      height: 100%;
    }
  }
}

.album-list {
  height: calc(100vh - 36px - 360rpx);
  padding: 10rpx;
  .album-item {
    display: flex;
    padding: 10rpx 0;
    border-bottom: 1rpx solid #ccc;
    .album-img {
      flex: 1;
      padding: 10rpx;
      .image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album-info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .album-name {
        flex: 1;
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album-desc {
        flex: 1;
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album-btn {
        padding: 10rpx;
        flex: 2;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .album-attention {
          color: $color;
          border: 1rpx solid $color;
          border-radius: 10%;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
