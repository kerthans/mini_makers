Page({
  data: {
    // 默认信息
    realName: '猫猫××',
    contact: '1234567890',
    signature: '不是哥们你',
    avatarUrl:'',//存储头像URL
  },
  onLoad: function() {
    this.fetchAvatar();  // 页面加载时请求头像
  },

  // 向后端请求头像 URL
  fetchAvatar: function() {
    wx.request({
      url: 'https://your-api-endpoint.com/get-avatar',  // 后端接口地址
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.avatarUrl) {
          this.setData({
            avatarUrl: res.data.avatarUrl,  // 更新头像 URL
          });
        } else {
          wx.showToast({
            title: '获取头像失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none',
        });
      }
    });
  },
  editAvatar: function() {
    wx.chooseImage({
      count: 1,  // 选择图片数量，1张
      sizeType: ['original', 'compressed'],  // 可以选择原图或压缩图
      sourceType: ['album', 'camera'],  // 从相册或拍照选择
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];  // 获取选择的图片路径

        // 上传图片到服务器
        wx.uploadFile({
          url: 'https://your-api-endpoint.com/upload-avatar',  // 上传图片的后端接口
          filePath: tempFilePath,
          name: 'avatar',  // 后端接收的文件字段名
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);  // 解析返回的 JSON 数据
            if (data && data.avatarUrl) {
              // 更新头像 URL
              this.setData({
                avatarUrl: data.avatarUrl,  // 更新页面显示的头像
              });

              wx.showToast({
                title: '头像更新成功',
                icon: 'success',
              });
            } else {
              wx.showToast({
                title: '头像更新失败',
                icon: 'none',
              });
            }
          },
          fail: () => {
            wx.showToast({
              title: '上传失败，请稍后再试',
              icon: 'none',
            });
          }
        });
      },
      fail: () => {
        wx.showToast({
          title: '选择图片失败，请重试',
          icon: 'none',
        });
      }
    });
  },
  // 更新真实姓名
  updateRealName: function (e) {
    this.setData({
      realName: e.detail.value
    });
  },

  // 更新联系方式
  updateContact: function (e) {
    this.setData({
      contact: e.detail.value
    });
  },

  // 更新个人签名
  updateSignature: function (e) {
    this.setData({
      signature: e.detail.value
    });
  },

  // 保存更改
  saveChanges: function () {
    // 模拟保存数据的逻辑
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
    setTimeout(() => {
      // 返回上一页面
      wx.navigateBack({
        delta: 1 // 返回上一页面
      });
    }, 2000); // 3秒后跳转

    // 在这里你可以处理保存的数据（比如发送到服务器）
  },
  goBack() {
    wx.navigateBack({
      delta: 1  // 返回上一页
    });
  },

  // 编辑头像功能
  editAvatar() {
    wx.showToast({
      title: '编辑头像功能待实现',
      icon: 'none',
    });
  },
});
