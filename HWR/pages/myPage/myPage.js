Page({
  data: {
    isMyPage: true, // 标记当前页面是否是 "我的" 页面
    isAssociationMember:true, // 判断是否是协会成员
    textToCopy: '这是要复制的文本',//用于复制的文本
    myIconSrc:"data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E%3Csvg width='23' height='23' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 20C27.866 20 31 16.866 31 13C31 9.13401 27.866 6 24 6C20.134 6 17 9.13401 17 13C17 16.866 20.134 20 24 20Z' fill='%2300ADB5' stroke='%2300ADB5' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 40.8V42H42V40.8C42 36.3196 42 34.0794 41.1281 32.3681C40.3611 30.8628 39.1372 29.6389 37.6319 28.8719C35.9206 28 33.6804 28 29.2 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8Z' fill='%2300ADB5' stroke='%2300ADB5' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",// 存储当前“我的”图标的图片路径
    catIconSrc:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='47' height='36.18348693847656' viewBox='0 0 47 36.18348693847656' fill='none'%3E %3Cpath d='M42.43 11.4335L35.5 2.68349L30.53 8.68349L14.76 8.68349L11.5 2.68349L3.57 12.4335C2.19761 14.1455 1.5 16.3186 1.5 18.6835L1.5 24.6835C1.5 30.2063 5.97715 34.6835 11.5 34.6835L35.5 34.6835C41.0228 34.6835 45.5 30.2063 45.5 24.6835L45.5 18.6835C45.5 15.8299 44.3472 13.2554 42.43 11.4335Z' stroke='rgba(255, 255, 255, 1)' stroke-width='3' fill-rule='evenodd' fill='%23B49F7A' fill-opacity='0'%3E %3C/path%3E %3Ccircle cx='14' cy='17.183486938476562' r='2.5' fill='%23FFFFFF' %3E %3C/circle%3E %3Cpath d='M34.5 17.1835C34.5 18.5642 33.3807 19.6835 32 19.6835C30.6193 19.6835 29.5 18.5642 29.5 17.1835C29.5 15.8028 30.6193 14.6835 32 14.6835C33.3807 14.6835 34.5 15.8028 34.5 17.1835Z' fill='%23FFFFFF' %3E %3C/path%3E %3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='1.5' d='M17.5 21.6835L20 23.1835L23 21.6835L25.5 23.1835L28.5 21.6835'%3E %3C/path%3E %3C/svg%3E" , // 存储当前猫猫图标的图片路径
    userInfo:{
      name: '小 鳄 鱼',          // 用户名
      phone: '',         // 用户电话
      signature: '',     // 个性签名
    },
      userPoints:'49',//用户积分
  },
  onLoad: function (options) {
    // 判断当前页面路径是否是 "我的" 页面
    const currentPage = getCurrentPages(); // 获取当前页面栈
    const page = currentPage[currentPage.length - 1]; // 获取当前页面
    const isMyPage = page.route === 'pages/index/index'; // 判断是否是"我的"页面
    
    // 模拟通过 API 获取是否是协会成员
    wx.request({
      url: 'https://your-api-url', // 假设的 API URL
      method: 'GET',
      success: (res) => {
        //设置用户状态
        this.setData({
          isAssociationMember: res.date.isAssociationMember, 
        });
        
        // 根据是否是“我的”页面设置图标的图片路径
        this.setIcons(isMyPage); // 调用 setIcons() 来设置图标
      }
    });
// 获取用户信息，包括用户名、电话、个性签名、积分
  this.fetchUserData();
},

// 获取用户数据并更新页面内容
fetchUserData: function () {
  //发起网络请求获取用户信息
  wx.request({
    url: 'https://your-api-url/userinfo', // 假设的 API URL要替换为实际API
    method: 'GET',//使用GET请求方法获取数据
    success: (res) => {// 请求成功时的回调函数
      // 检查响应的状态码是否为 200，表示请求成功
      if (res.statusCode === 200) {
        // 从返回的数据中解构出用户的相关信息
        const { name, phone, signature, points } = res.data;
       //更新页面中的用户信息
        this.setData({
          'userInfo.name': name,//更新用户的名字
          'userInfo.phone': phone,//更新用户的电话
          'userInfo.signature': signature,//更新用户的个性签名
          userPoints: points,//更新用户的积分
        });
      } else {
        //如果状态码不是200，显示获取用户信息失败的提示
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none',//不显示任何图标，只显示文字
        });
      }
    },
    fail: () => {//请求失败时的回调函数
      //网络请求失败时，展示错误提示
      wx.showToast({
        title: '网络请求失败',//提示内容
        icon: 'none',//不显示图标
      });
    }
  });
},
  // 根据当前页面是否是"我的"页面设置图标的图片
  setIcons: function (isMyPage) {
      //如果当前是“我的”页面，“我的”图标为填充样式
    if (isMyPage) {
      this.setData({
        myIconSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='47' height='36.18348693847656' viewBox='0 0 47 36.18348693847656' fill='none'%3E %3Cpath d='M42.43 11.4335L35.5 2.68349L30.53 8.68349L14.76 8.68349L11.5 2.68349L3.57 12.4335C2.19761 14.1455 1.5 16.3186 1.5 18.6835L1.5 24.6835C1.5 30.2063 5.97715 34.6835 11.5 34.6835L35.5 34.6835C41.0228 34.6835 45.5 30.2063 45.5 24.6835L45.5 18.6835C45.5 15.8299 44.3472 13.2554 42.43 11.4335Z' stroke='rgba(255, 255, 255, 1)' stroke-width='3' fill-rule='evenodd' fill='%23B49F7A' fill-opacity='0'%3E %3C/path%3E %3Ccircle cx='14' cy='17.183486938476562' r='2.5' fill='%23FFFFFF' %3E %3C/circle%3E %3Cpath d='M34.5 17.1835C34.5 18.5642 33.3807 19.6835 32 19.6835C30.6193 19.6835 29.5 18.5642 29.5 17.1835C29.5 15.8028 30.6193 14.6835 32 14.6835C33.3807 14.6835 34.5 15.8028 34.5 17.1835Z' fill='%23FFFFFF' %3E %3C/path%3E %3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='1.5' d='M17.5 21.6835L20 23.1835L23 21.6835L25.5 23.1835L28.5 21.6835'%3E %3C/path%3E %3C/svg%3E", // 填充模式的图标路径
      });
      //如果不是“我的”页面，“我的”页面为正常样式
    } else {
      this.setData({
        myIconSrc:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30.9300537109375' height='30.92999267578125' viewBox='0 0 30.9300537109375 30.92999267578125' fill='none'%3E %3Cpath d='M15.47 0.5C7.20445 0.5 0.5 7.20547 0.5 15.47C0.5 23.737 7.20445 30.43 15.47 30.43C23.7371 30.43 30.43 23.737 30.43 15.47C30.43 7.20547 23.7371 0.5 15.47 0.5ZM15.39 7.6C17.9193 7.6 19.97 9.65066 19.97 12.18C19.97 14.7102 17.9193 16.76 15.39 16.76C12.8606 16.76 10.81 14.7102 10.81 12.18C10.81 9.6507 12.8606 7.6 15.39 7.6ZM23.84 27.22C21.4843 28.9033 18.6057 29.91 15.49 29.91C12.4104 29.91 9.56016 28.9354 7.22 27.29C7.12199 26.7732 7.07 26.2442 7.07 25.7C7.07 21.0291 10.8582 17.24 15.53 17.24C20.2 17.24 23.98 21.0291 23.98 25.7C23.98 26.2228 23.9294 26.7248 23.84 27.22Z' stroke='rgba(0, 173, 181, 1)' stroke-width='1' fill='%2300ADB5' %3E %3C/path%3E %3C/svg%3E", // 描边模式的图标路径
      });
    }
  
    // 根据页面的变化设置猫猫图标
    if (isMyPage) {
      // 如果是“我的”页面，猫猫图标为白色
      this.setData({
        catIconSrc:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='47' height='36.18348693847656' viewBox='0 0 47 36.18348693847656' fill='none'%3E %3Cpath d='M42.43 11.4335L35.5 2.68349L30.53 8.68349L14.76 8.68349L11.5 2.68349L3.57 12.4335C2.19761 14.1455 1.5 16.3186 1.5 18.6835L1.5 24.6835C1.5 30.2063 5.97715 34.6835 11.5 34.6835L35.5 34.6835C41.0228 34.6835 45.5 30.2063 45.5 24.6835L45.5 18.6835C45.5 15.8299 44.3472 13.2554 42.43 11.4335Z' stroke='rgba(255, 255, 255, 1)' stroke-width='3' fill-rule='evenodd' fill='%23B49F7A' fill-opacity='0'%3E %3C/path%3E %3Ccircle cx='14' cy='17.183486938476562' r='2.5' fill='%23FFFFFF' %3E %3C/circle%3E %3Cpath d='M34.5 17.1835C34.5 18.5642 33.3807 19.6835 32 19.6835C30.6193 19.6835 29.5 18.5642 29.5 17.1835C29.5 15.8028 30.6193 14.6835 32 14.6835C33.3807 14.6835 34.5 15.8028 34.5 17.1835Z' fill='%23FFFFFF' %3E %3C/path%3E %3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='1.5' d='M17.5 21.6835L20 23.1835L23 21.6835L25.5 23.1835L28.5 21.6835'%3E %3C/path%3E %3C/svg%3E" 
      });
    } else {
      // 否则，猫猫图标为灰色
      this.setData({
        catIconSrc: "data:image/svg+xml,svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='47' height='36.1834716796875' viewBox='0 0 47 36.1834716796875' fill='none'%3E %3Cpath d='M42.43 11.4335L35.5 2.68347L30.53 8.68347L14.76 8.68347L11.5 2.68347L3.57 12.4335C2.19761 14.1455 1.5 16.3186 1.5 18.6835L1.5 24.6835C1.5 30.2063 5.97715 34.6835 11.5 34.6835L35.5 34.6835C41.0228 34.6835 45.5 30.2063 45.5 24.6835L45.5 18.6835C45.5 15.8299 44.3472 13.2554 42.43 11.4335Z' stroke='rgba(34, 40, 49, 1)' stroke-width='3' fill-rule='evenodd' fill='%23B49F7A' fill-opacity='0'%3E %3C/path%3E %3Ccircle cx='14' cy='17.1834716796875' r='2.5' fill='%23222831' %3E %3C/circle%3E %3Cpath d='M34.5 17.1835C34.5 18.5642 33.3807 19.6835 32 19.6835C30.6193 19.6835 29.5 18.5642 29.5 17.1835C29.5 15.8028 30.6193 14.6835 32 14.6835C33.3807 14.6835 34.5 15.8028 34.5 17.1835Z' fill='%23222831' %3E %3C/path%3E %3Cpath stroke='rgba(34, 40, 49, 1)' stroke-width='1.5' d='M17.5 21.6835L20 23.1835L23 21.6835L25.5 23.1835L28.5 21.6835'%3E %3C/path%3E %3C/svg%3E ", // 灰色猫猫图标
      });
    }
  },

  // 复制文本到剪贴板
  copyText: function () {
    // 使用 wx.setClipboardData 方法将指定的文本复制到剪贴板
    wx.setClipboardData({
      data: this.data.textToCopy,//需要复制的文本，从页面的data中获取
      success: () => {//复制成功时的回调函数
        //显示复制成功的提示
        wx.showToast({
          title: '复制成功',//提示内容
          icon: 'success',//显示成功图标
          duration: 2000//提示显示时长，单位为毫秒
        });
      },
      fail: () => {//复制失败时的回调函数
        //显示复制失败的提示
        wx.showToast({
          title: '复制失败',//提示内容
          icon: 'none',//不显示图标
          duration: 2000//提示显示时长
        });
      }
    });
  },
  //页面跳转到编辑页面的函数
  goToEditPage: function () {
    // 使用 wx.navigateTo 方法跳转到编辑页面
    wx.navigateTo({
      url: '/pages/editPage/editPage',  // 跳转到编辑页面
    });
  },
  //页面跳转到积分页面的函数
  goToPointsPage: function () {
    wx.navigateTo({
      url: '/pages/points/points',  // 跳转到积分页面
    });
  },
  //页面跳转到借物页面的函数
  goToBorrowPage: function () {
    wx.navigateTo({
      url: '/pages/borrow/borrow',  // 跳转到我的借物页面
    });
  },
  //页面跳转到项目页面的函数
  goToProjectPage: function () {
    wx.navigateTo({
      url: '/pages/project/project',  // 跳转到我的项目页面
    });
  },
  //页面跳转到我的场地页面的函数
  goToVenuePage: function () {
    wx.navigateTo({
      url: '/pages/venue/venue',  // 跳转到我的场地页面
    });
  },
  //页面跳转到协会工作页面的函数
  goToWorkPage: function () {
    wx.navigateTo({
      url: '/pages/work/work',  // 跳转到协会工作页面
    });
  },
  //页面跳转到荣誉墙页面的函数
  goToHonorWallPage: function () {
    wx.navigateTo({
      url: '/pages/honor-wall/honor-wall',  // 跳转到荣誉墙页面
    });
  },
});

