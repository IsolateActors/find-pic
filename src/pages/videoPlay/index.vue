<template>
  <view class="video-play">
    <image :src="videoobj.img"></image>

    <!-- 工具栏 -->
    <view class="video-tool">
      <view
        :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']"
        @click="handleMuted"
      ></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <!-- 视频 -->
    <view class="video-wrap">
      <video
        play-btn-position="center"
        :src="videoobj.video"
        object-fit="fill"
        :muted="muted"
      ></video>
    </view>

    <!-- 下载 -->
    <view class="download">
      <view class="download-btn" @click="handleDownload">下载高清</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoobj: {},
      //   静音
      muted: false
    };
  },
  onLoad() {
    // console.log(getApp().globalData);
    this.videoobj = getApp().globalData.video;
  },
  methods: {
    //   声音开关
    handleMuted() {
      this.muted = !this.muted;
    },

    // 下载视频
    async handleDownload() {
      await uni.showLoading({
        title: "下载中..."
      });

      // 保存到内存中
      const { tempFilePath } = (
        await uni.downloadFile({
          url: this.videoobj.video
        })
      )[1];

      //   保存到本地
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });

      uni.hideLoading();
      await uni.showToast({
        title: "下载成功！"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-play {
  position: relative;
  image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;

    // 滤镜
    filter: blur(20px);
  }

  .video-tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      font-size: 50rpx;
      color: #fff;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      margin: 0 10rpx;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .iconzhuanfa {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .video-wrap {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    .download-btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      color: #fff;
      border: 2rpx solid #fff;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
