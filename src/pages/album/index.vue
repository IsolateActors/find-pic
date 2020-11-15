<template>
  <view v-if="Object.keys(this.album).length !== 0">
    <!-- 专辑背景 s-->
    <view class="album-bg">
      <image mode="widthFix" :src="album.cover"></image>
      <view class="album-info">
        <view class="album-name">{{ album.name }}</view>
        <view class="album-btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑背景 end-->

    <!-- 专辑作者 s-->
    <view class="album-author">
      <view class="album-author-info">
        <image :src="album.user.avatar" mode="widthFix"></image>
        <view class="author-name">{{ album.user.name }}</view>
      </view>
      <view class="album-author-desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <!-- 专辑作者 e-->

    <!-- 列表 s -->
    <view class="album-list">
      <view
        class="album-item"
        v-for="(item, index) in wallpaper"
        :key="item.id"
      >
        <go-detail :list="wallpaper" :index="index">
          <image
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></image>
        </go-detail>
      </view>
    </view>
    <!-- 列表 e -->
  </view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        // 是否第一次请求
        first: 1
      },
      id: -1,
      album: {},
      wallpaper: [],
      // 分页
      hasMore: true,
      // 第一次触底且无数据
      isFirstToBottom: true
    };
  },
  methods: {
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      })
        .then(result => {
          // console.log(result);

          if (Object.keys(this.album).length === 0) {
            this.album = result.res.album;

            this.params.first = 0;
          }

          if (result.res.wallpaper.length === 0) {
            this.hasMore = false;

            uni.showToast({
              title: "已加载全部数据",
              icon: "none"
            });
            this.isFirstToBottom = false;

            return;
          }
          this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
        })
        .catch(err => {});
    }
  },
  onLoad(options) {
    console.log(options);
    this.id = options.id;
    // this.id = "5e59075ae7bce73965512bd6";
    this.getList();
  },
  onReachBottom() {
    // console.log("到底");
    if (this.hasMore) {
      this.params.skip += this.params.limit;
      this.getList();
    } else if (this.isFirstToBottom) {
      uni.showToast({
        title: "已加载全部数据",
        icon: "none"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.album-bg {
  position: relative;
  image {
    // height: 360rpx;
  }

  .album-info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: space-around;
    height: 80rpx;
    // line-height: 80rpx;
    align-items: center;
    .album-name {
      font-size: 40rpx;
    }

    .album-btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      text-align: center;
      line-height: 60rpx;
      border-radius: 10rpx;
    }
  }
}

.album-author {
  padding: 10rpx;
  .album-author-info {
    padding: 10rpx 0;
    display: flex;
    align-items: center;
    image {
      width: 50rpx;
    }

    .author-name {
      color: #000;
      margin-left: 15rpx;
    }
  }

  .album-author-desc {
  }
}

.album-list {
  display: flex;
  flex-wrap: wrap;
  .album-item {
    width: 33.3%;
    padding: 3rpx;
    image {
      height: calc(710rpx / 3);
    }
  }
}
</style>
