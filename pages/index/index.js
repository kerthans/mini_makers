//index.js
//获取应用实例
// var app = getApp();
Page({
  data: {
    indexmenu:[],
    imgUrls: [],
    token: ''
  },
  onLoad:function(){
    //生命周期函数--监听页面加载
    this.gettoken();
    this.fetchData();
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  opendoor:function(){
    var that=this;
    var token=wx.getStorageSync('token');
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/56b2a2129160465eb5f053e5503221ad/devices/64e05e0ffa9537791d417565_maker/commands',
      data:'{"service_id": "maker","command_name": "Acontrol","paras": {"control": "1"} }',
      method:'POST',
      header:{"X-Auth-Token": token,"Content-Type": "application/json"},
      success:function(res){
        console.log("成功\n");
        console.log(res);
      },
      fail:function(){
        console.log("失败");
      },
    })
  },
    // 获取Token的方法
    gettoken: function() {
      var that = this;
      wx.request({
        url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
        data: '{"auth": {"identity": {"methods": ["password"],"password": {"user": {"domain": {"name": "kaiser_smith"},"name": "menjin","password": "tuchang123"}}}}}',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        success: function(res) {
          var token = res.header['X-Subject-Token'];
          console.log("获取token=\n" + token);
          that.setData({ token: token });
          wx.setStorageSync('token', token); // 存储Token到本地
        },
        fail: function() {
          console.log("获取token失败\n");
        }
      });
    },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon':'./../../images/icon_01.png',
          'text':'众创空间',
          'url':'space'
        },
        {
          'icon':'./../../images/icon_03.png',
          'text':'服务集市',
          'url':'service'
        },
        {
          'icon':'./../../images/icon_05.png',
          'text':'会议室预定',
          'url':'conference'
        },
        {
          'icon':'./../../images/icon_07.png',
          'text':'云资源申请',
          'url':'resource'
        },
        {
          'icon':'./../../images/icon_09.png',
          'text':'园区问问',
          'url':'question'
        },
        {
          'icon':'./../../images/icon_11.png',
          'text':'物业服务',
          'url':'property'
        },
        {
          'icon':'./../../images/icon_13.png',
          'text':'入驻申请',
          'url':'apply'
        },
        {
          'icon':'./../../images/icon_maker.png',
          'text':'开门',
          'url':'apply'
        }
      ],
      imgUrls: [
        '../../images/banner_02.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    })
  },
  changeRoute:function(url){
    wx.navigateTo({
      url: `../${url}/${url}`
    })
  },
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow :function(){
    //生命周期函数--监听页面显示
    // console.log('onShow');
  },
  onHide :function(){
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload :function(){
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  }
})
