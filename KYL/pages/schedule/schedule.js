Page({
  data: {
    isEditing: false,
    level:1,
    tableData: [
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
      { activity: '', push: '', news: '' },
    ],
    editableRow: null,   // 当前行索引
    editable1CellIndex: null // 当前列索引
    
  },

  ReturnLastPage(){/*返回上一页*/
    wx.navigateBack({
      delta: 1 
    });
  },

  onLoad() {
    
    // 页面加载时的逻辑
    wx.request({//页面进入时加载数据
      url: 'url',
      method:'GET',
      data:{
        activity: that.data.tableData.activity,
        push: that.data.tableData.push,
        news:that.data.tableData.news,
        level:that.data.level
      },
      success: function(res) {
        console.log('数据库数据：', res.data);
        that.setData({
          items: res.data // 将获取的数据存储到页面数据中
        });
      },
      fail: function(err) {
        console.error('获取数据失败：', err);
      }
    });
  },

  onCellClick(e) {
    const { index, field } = e.currentTarget.dataset;
    this.setData({
      editableRow: index,
      editableCellIndex: field
    });
  },//点击后可以编辑单元格

   // 开启编辑模式
   startEdit: function() {
    this.setData({
      isEditing: true
    });
  },

  // 提交编辑
  submitEdit: function() {
    console.log('提交编辑');
    this.setData({
      isEditing: false
    });

    wx.request({/*上传修改过后的数据*/
      url: 'https://your-backend-server.com/api/data', // 替换为你的后端 API 地址
      method: 'POST',
      data: {
        activity: that.data.tableData.activity,
        push: that.data.tableData.push,
        news:that.data.tableData.news
      },
      success: function(res) {
        console.log('上传结果：', res.data);
        wx.showToast({
          title: res.data.message,
          icon: 'success'
        });
      },
      fail: function(err) {
        console.error('上传失败：', err);
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
  },

  // 取消编辑
  cancelEdit: function() {
    console.log('取消编辑');
    this.setData({
      isEditing: false
    });
  }
});