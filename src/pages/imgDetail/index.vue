<template>
  <view>
    <!-- 用户信息 s -->
    <view class="user-info" v-if="imgDetail.user">
      <view class="user-icon">
        <image :src="imgDetail.user.avatar" mode="widthFix"></image>
      </view>
      <view class="user-desc">
        <view class="user-name">{{ imgDetail.user.name }}</view>
        <view class="user-time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <!-- 用户信息 e -->

    <!-- 大图 s-->
    <view class="high-img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix" :src="imgDetail.thumb"></image>
      </swiper-action>
    </view>
    <!-- 大图 e-->

    <!-- 点赞收藏 s -->
    <view class="user-rank">
      <view class="rank">
        <text class="iconfont icondianzan"></text>
        <text class="icon-text">{{ imgDetail.rank }}</text>
      </view>
      <view class="collect">
        <text class="iconfont iconshoucang"></text>
        <text class="icon-text">收藏</text>
      </view>
    </view>
    <!-- 点赞收藏 e -->

    <!-- 专辑 s -->
    <view class="album-wrap" v-if="album.length > 0">
      <view class="album-title">相关</view>
      <view class="album-list">
        <view class="album-item" v-for="item in album" :key="item.id">
          <view class="album-cover">
            <image mode="aspectFill" :src="item.cover"></image>
          </view>
          <view class="album-info">
            <view class="info-text">专辑</view>
            <view class="info-name">{{ item.name }}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 专辑 e -->

    <!-- 最热评论 s-->
    <view class="comment-hot" v-if="hot.length">
      <view class="comment-title">
        <text class="iconfont iconhot1"></text>
        <text class="title-text">最热评论</text>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in hot" :key="item.id">
          <view class="comment-user">
            <view class="user-icon">
              <image mode="widthFix" :src="item.user.avatar"></image>
            </view>

            <view class="user-name">
              <view class="user-nickname">{{ item.user.name }}</view>
              <view class="user-time">{{ item.atime | cnTime }}</view>
            </view>

            <view class="user-badge">
              <image
                v-for="itemchild in item.user.title"
                :key="itemchild.icon"
                :src="itemchild.icon"
              ></image>
            </view>
          </view>

          <view class="comment-desc">
            <view class="comment-content">{{ item.content }}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 e-->

    <!-- 最新评论 s-->
    <view class="comment-new" v-if="comment.length">
      <view class="comment-title">
        <text class="iconfont iconpinglun"></text>
        <text class="title-text">最新评论</text>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in comment" :key="item.id">
          <view class="comment-user">
            <view class="user-icon">
              <image mode="widthFix" :src="item.user.avatar"></image>
            </view>

            <view class="user-name">
              <view class="user-nickname">{{ item.user.name }}</view>
              <view class="user-time">{{ item.atime | cnTime }}</view>
            </view>

            <view class="user-badge">
              <image
                v-for="itemchild in item.user.title"
                :key="itemchild.icon"
                :src="itemchild.icon"
              ></image>
            </view>
          </view>

          <view class="comment-desc">
            <view class="comment-content">{{ item.content }}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 e-->

    <!-- 下载 -->
    <view class="download">
      <view class="download-btn" @click="handleDownload">下载图片</view>
    </view>
    <!-- 下载 -->
  </view>
</template>

<script>
import swiperAction from "@/components/swiperAction";
import moment from "moment";
// 时间中文
moment.locale("zh-cn");
export default {
  components: {
    swiperAction
  },
  data() {
    return {
      imgDetail: {},
      // 专辑
      album: [],
      // 最热评论
      hot: [],
      // 最新
      comment: [],
      // 当前索引
      currentIndex: 0
    };
  },
  filters: {
    cnTime(atime) {
      if (!atime) return "";
      return moment(atime * 1000).fromNow();
    }
  },
  onLoad() {
    // console.log(getApp().globalData);
    const { imgIndex } = getApp().globalData;

    this.currentIndex = imgIndex;
    this.getData();
  },
  methods: {
    // 当前页面数据
    getData() {
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.currentIndex];

      // xxx年前
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();

      // 图片id=>this.imgDetail.id
      this.getComments(this.imgDetail.id);
    },
    getComments(id) {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
        .then(result => {
          // console.log(result);
          this.album = result.res.album;
          this.hot = result.res.hot;
          this.comment = result.res.comment;
        })
        .catch(err => {});
    },

    // 滑动事件
    handleSwiperAction(e) {
      // console.log(e);
      // 左划 index++
      // 右划 index--
      // 判断数组越界
      // 左划 e.derection === "left"&&this.currentIndex < imgList.length -1
      // 右划 e.derection === "right"&&this.currentIndex > 0

      const { imgList } = getApp().globalData;
      if (e.direction === "left" && this.currentIndex < imgList.length - 1) {
        // console.log(e.direction);
        // 加载下一页
        this.currentIndex++;
        this.getData();
      } else if (e.direction === "right" && this.currentIndex > 0) {
        // console.log(e.direction);

        // 加载上一页
        this.currentIndex--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    },

    // 下载图片 tempFilePath
    async handleDownload() {
      await uni.showToast({
        title: "下载中..."
      });

      // 下载到内存中
      const result = await uni.downloadFile({
        url: this.imgDetail.img
      });
      const { tempFilePath } = result[1];

      // 小程序内存中的图片下载到本地
      const res = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath
      });
      // console.log(res);

      uni.hideLoading();
      // 提示下载成功
      await uni.showToast({
        title: "下载成功"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  padding: 20rpx;
  display: flex;
  .user-icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
    }
  }

  .user-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .user-name {
      color: #000;
      font-weight: 600;
    }

    .user-time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}

.user-rank {
  display: flex;
  height: 80rpx;
  text-align: center;
  border-bottom: 5rpx solid #eee;
  font-size: 30rpx;
  .rank {
    flex: 1;
    line-height: 80rpx;
  }

  .collect {
    flex: 1;
    line-height: 80rpx;
  }

  .icon-text {
    padding-left: 10rpx;
  }
}
.high-img {
  image {
    border-bottom: 1px solid #eee;
  }
}

.album-wrap {
  padding: 20rpx;
  .album-title {
    padding: 10rpx 0;
  }

  .album-list {
    .album-item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;
      .album-cover {
        flex: 1;
        image {
          width: 100rpx;
          height: 100rpx;
        }
      }

      .album-info {
        flex: 3;
        padding-left: 20rpx;
        .info-text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          text-align: center;
          line-height: 50rpx;
        }

        .info-name {
          padding: 10rpx 0;
          color: #888;
        }

        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
          color: #888;
        }
      }
    }
  }
}

.comment-hot,
.comment-new {
  .comment-title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }

    .title-text {
      font-size: 28rpx;
      font-weight: 600;
      color: #666;
      margin-left: 10rpx;
    }
  }

  .comment-list {
    .comment-item {
      padding: 10rpx;
      border-bottom: 15rpx solid #eee;
      .comment-user {
        display: flex;
        .user-icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }

        .user-name {
          flex: 1;
          padding-left: 10rpx;
          .user-nickname {
            color: #777;
          }

          .user-time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }

        .user-badge {
          display: flex;
          image {
            width: 40rpx;
            height: 40rpx;
            // display: inline-block;
          }
        }
      }

      .comment-desc {
        display: flex;
        padding: 30rpx;
        .comment-content {
          flex: 1;
          padding-left: 15%;
        }

        .comment-like {
          text-align: right;
          .iconfont {
            padding-left: 30rpx;
          }
        }
      }
    }
  }
}

.comment-new {
  .iconpinglun {
    color: aqua !important;
  }
}

.download {
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download-btn {
    width: 90%;
    height: 70%;
    background-color: $color;
    color: #fff;
    font-size: 30rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
