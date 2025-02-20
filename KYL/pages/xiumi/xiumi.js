// pages/submit/submit.js
Page({
  data: {
    link: '', // 用于存储输入的链接
  },

  onLoad() {
  
    // 页面加载时的逻辑
  },

  ReturnLastPage(){
    wx.navigateBack({
      delta: 1 // 返回的页面数，1 表示返回到上一个页面
    });
  },

  // 输入框内容变化时更新数据
  onInput(e) {
    this.setData({
      link: e.detail.value,
    });
  },

  // 提交按钮点击事件
  onSubmit() {
    const { link } = this.data;
    if (!link) {
      wx.showToast({
        title: '请输入链接',
        icon: 'none',
      });
      return;
    }

    // 提交逻辑
    wx.request({
      url: 'url',
      data:{
        link:this.data.link
      },
      success: (res) => {
        console.log('数据上传成功：', res.data);
        this.setData({
          message: '数据上传成功！',
        });
      },
      fail: (err) => {
        console.error('数据上传失败：', err);
        this.setData({
          message: '数据上传失败，请稍后重试！'
        });
      }
    })
  },
});