<template>
  <view>
    <view class="category-tab">
      <view class="category-title">
        <view class="title-inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v => v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
      </view>
      <scroll-view
        scroll-y
        enable-flex
        @scrolltolower="handleScrollToLower"
      >
	  <view class="category-content">
		  <view
		    class="cate-item"
		    v-for="(item, index) in vertical"
		    :key="item.id"
		  >
		    <go-detail :list="vertical" :index="index">
		      <image mode="widthFix" :src="item.thumb"></image>
		    </go-detail>
		  </view>
	  </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import goDetail from "@/components/goDetail";
export default {
  components: {
    uniSegmentedControl,
    goDetail
  },
  data() {
    return {
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" }
      ],
      current: 0,
      params: {
        limit: 30,
        order: "new",
        skip: 0
      },
      id: -1,

      // 图片列表
      vertical: [],

      hasMore: true
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        this.params.order = this.items[e.currentIndex].order;
        this.params.skip = 0;
        this.vertical = [];
        this.hasMore = true;
        this.getList();
      }
    },
    getList() {
      this.request({
        url: `/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      })
        .then(result => {
          // console.log(result);
          if (result.res.vertical.length === 0) {
            this.hasMore = false;

            uni.showToast({
              title: "无更多数据",
              icon: "none"
            });
            return;
          }
          this.vertical = [...this.vertical, ...result.res.vertical];
        })
        .catch(err => {});
    },
    handleScrollToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.category-tab {
  .category-title {
    position: relative;
    .title-inner {
      width: 60%;
      margin: 0 auto;
    }
  }
  .category-content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .cate-item {
      width: 33.3%;
      padding: 5rpx;
    }
  }
}
</style>
