<template>
  <view class="home">
    <view class="home-tab">
      <view class="home-title">
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
      <view class="home-content">
        <view v-if="current === 0">
          <homeRecommend></homeRecommend>
        </view>
        <view v-if="current === 1">
          <homeCategory></homeCategory>
        </view>
        <view v-if="current === 2">
          <homeAlbum></homeAlbum>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album";
import homeCategory from "./home-category";
import homeRecommend from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    homeAlbum,
    homeCategory,
    homeRecommend,
    uniSegmentedControl
  },
  data() {
    return {
      items: [{ title: "推荐" }, { title: "分类" }, { title: "专辑" }],
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
  // onLoad() {
  //   this.request({
  //     url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
  //     data: {
  //       limit: 30,
  //       skip: 0,
  //       order: "hot"
  //     },
  //     method: "GET"
  //   })
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
</script>

<style lang="scss">
.home {
  .home-tab {
    .home-title {
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
  }
}
</style>
