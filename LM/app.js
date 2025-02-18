// app.js
App({
  onLaunch() {
    wx.loadFontFace({
      family: 'siyuanheiti',
      global: true,
      source: 'url("/assets/font-family/siyuanheiti.otf")',  //此处需替换为真实字体地址
      success(res) {
        console.log(res.status)
      },
      fail: function (res) {
        console.log(res.status)
      },
      complete: function (res) {
        console.log(res.status)
      }
    });
  },
// 数据都是根据当前机型进行计算，这样的方式兼容大部分机器
globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
}
})
