// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {
//       avatarUrl: defaultAvatarUrl,
//       nickName: '',
//     },
//     hasUserInfo: false,
//     canIUseGetUserProfile: wx.canIUse('getUserProfile'),
//     canIUseNicknameComp: wx.canIUse('input.type.nickname'),
//   },
//   bindViewTap() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onChooseAvatar(e) {
//     const { avatarUrl } = e.detail
//     const { nickName } = this.data.userInfo
//     this.setData({
//       "userInfo.avatarUrl": avatarUrl,
//       hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
//     })
//   },
//   onInputChange(e) {
//     const nickName = e.detail.value
//     const { avatarUrl } = this.data.userInfo
//     this.setData({
//       "userInfo.nickName": nickName,
//       hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
//     })
//   },
//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//     wx.getUserProfile({
//       desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         console.log(res)
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   },
    /*点击宣传部的“进入管理”，跳转到宣传部管理页面 */
    jumpToPublicityWorkPage:function() {
        console.log('跳转宣传部工作页面');
        wx.navigateTo({
          url: 'pages/pubulicity_work_page/pubulicity_work_page',
        })
    },

    /*点击基管部的“进入管理”，跳转到基管部管理页面 */
    jumpToBaseManagementWorkPage:function() {
        console.log('跳转基管部工作页面');
        wx.navigateTo({
          url: 'pages/base_management_work_page/base_management_work_page',
        })
    },

    /*点击项目部的“进入管理”，跳转到项目部管理页面 */
    jumpTopProjectWorkPage:function() {
        console.log('跳转项目部工作页面');
        wx.navigateTo({
          url: 'pages/project_work_page/project_work_pagee',
        })
    },

    /*点击运维部的“进入管理”，跳转到运维部管理页面 */
    jumpToMaintenanceWorkPage:function() {
        console.log('跳转运维部工作页面');
        wx.navigateTo({
          url: 'pages/operation_maintenance_work_page/operation_maintenance_work_page',
        })
    }
})
