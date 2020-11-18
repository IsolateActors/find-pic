module.exports = {
  devServer: {
    proxy: {
      "/image": {
        target: "http://157.122.54.189:9088",
        pathRewrite: {
          "^/image": "/image"
        }
      },
      "/videoimg": {
        target: "http://157.122.54.189:9088",
        pathRewrite: {
          "^/videoimg": "/videoimg"
        }
      }
    }
  }
};
