<template>
  <view>
    <view class="video-tab">
      <view class="video-title">
        <view class="title-inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v => v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <!-- <view class="iconfont iconsearch"></view> -->
      </view>
      <view class="video-content">
        <view v-if="current < 4">
          <video-main
            :urlobj="{ url: items[current].url, params: items[current].params }"
          ></video-main>
        </view>
        <!-- <view v-if="current === 4">
          <video-category></video-category>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import videoMain from "./video-main";
// import videoCategory from "./video-category";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    uniSegmentedControl,
    videoMain,
    // videoCategory
  },
  data() {
    return {
      items: [
        {
          title: "推荐",
          url: "/videoimg/v1/videowp/featured",
          params: {
            limit: 30,
            order: "hot",
            skip: 0
          }
        },
        {
          title: "娱乐",
          url: "/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
          params: {
            limit: 30,
            order: "new",
            skip: 0
          }
        },
        {
          title: "最新",
          url: "/videoimg/v1/videowp/videowp",
          params: {
            limit: 30,
            order: "new",
            skip: 0
          }
        },
        {
          title: "热门",
          url: "/videoimg/v1/videowp/videowp",
          params: {
            limit: 30,
            order: "hot",
            skip: 0
          }
        },
        // {
        //   title: "分类",
        //   url: "/videoimg/v1/videowp/category",
        //   params: {}
        // }
      ],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.video-tab {
  .video-title {
    position: relative;
    .title-inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .video-content {
  }
}
</style>
