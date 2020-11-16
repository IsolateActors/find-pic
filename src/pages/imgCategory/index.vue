<template>
  <view id="category">
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
      <view class="category-content">
        <view v-if="current === 0">
          1
        </view>
        <view v-if="current === 1">
          2
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    uniSegmentedControl
  },
  data() {
    return {
      items: [{ title: "最新" }, { title: "热门" }],
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

<style lang="scss">
#category {
  .category-tab {
    .category-title {
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
    .category-content {
    }
  }
}
</style>
