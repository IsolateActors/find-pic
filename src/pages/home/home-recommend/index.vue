<template>
  <scroll-view
    class="recommends-view"
    @scrolltolower="handleToLower"
    scroll-y
    v-if="recommends.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recommend-wrap">
      <!-- :url="`/pages/album/index?id=${item.target}`" -->
      <navigator
        url="/pages/album/index?id=5da537d8e7bce739db12355d"
        class="recommend-item"
        v-for="item in recommends"
        :key="item.id"
      >
        <image mode="widthFix" :src="item.thumb" alt="" />
      </navigator>
    </view>
    <!-- 推荐结束 -->

    <!-- 月份 start -->
    <view class="months-wrap">
      <view class="months-title">
        <view class="months-title-info">
          <view class="title-info">
            <text>{{ months.DD }} /</text>
            {{ months.MM }} 月
          </view>
          <view class="months-text">{{ months.title }}</view>
        </view>
        <view class="months-more">更多></view>
      </view>
      <view class="months-content">
        <view
          class="months-item"
          v-for="(item, index) in months.items"
          :key="item.id"
        >
          <go-detail :list="months.items" :index="index">
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
              alt=""
            />
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 月份 end -->

    <!-- 热门 start -->
    <view class="hots-wrap">
      <view class="hots-title">
        <text>热门</text>
      </view>
      <view class="hots-content">
        <view class="hot-item" v-for="(item, index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 end -->
  </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      // 推荐
      recommends: [],
      // 月份
      months: {},
      // 热门
      hots: [],
      // 请求参数
      params: {
        limit: 30,
        skip: 0,
        order: "hot"
      },
      hasMore: true
    };
  },
  methods: {
    // 获取接口数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
        method: "GET"
      })
        .then(result => {
          console.log(result);

          // 第一次请求
          if (this.recommends.length === 0) {
            // 推荐
            this.recommends = result.res.homepage[1].items;
            // 月份
            this.months = result.res.homepage[2];
            // 修改时间戳 => moment.js
            this.months.MM = moment(this.months.stime).format("MM");
            this.months.DD = moment(this.months.stime).format("DD");
          }

          // 是否最后一页数据
          if (result.res.vertical.length === 0) {
            this.hasMore = false;

            uni.showToast({
              title: "已加载全部数据",
              icon: "none"
            });
            return;
          }
          // 热门
          // this.hots = result.res.vertical;
          this.hots = [...this.hots, ...result.res.vertical];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleToLower() {
      console.log("触发触底事件");

      if (this.hasMore) {
        // 1修改参数
        this.params.skip += this.params.limit;
        // 2.重新发送请求
        this.getList();
        // 3.拼接数组
      } else {
        uni.showToast({
          title: "无更多数据了",
          icon: "none"
        });
      }
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "推荐"
    });
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.recommends-view {
  height: calc(100vh - 36px);
}

// 推荐
.recommend-wrap {
  display: flex;
  flex-wrap: wrap;

  .recommend-item {
    width: 50%;
    // border: 3px solid #eee;
    padding: 6rpx;
  }
}

// 月份
.months-wrap {
  .months-title {
    display: flex;
    justify-content: space-between;
    color: $color;
    padding: 20rpx;
    .months-title-info {
      display: flex;
      font-size: 30rpx;
      font-weight: 600;
      .title-info {
        text {
          font-size: 36rpx;
        }
      }

      .months-text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .months-more {
      font-size: 24rpx;
    }
  }

  .months-content {
    display: flex;
    flex-wrap: wrap;

    .months-item {
      width: 33.3%;
      padding: 5rpx;
    }
  }
}

// 热门
.hots-wrap {
  .hots-title {
    padding: 30rpx;
    text {
      border-left: 8rpx solid $color;
      font-size: 34rpx;
      font-weight: 600;
      padding-left: 20rpx;
    }
  }

  .hots-content {
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      width: 33.3%;
      padding: 5rpx;
    }
  }
}
</style>
