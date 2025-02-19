// pages/activity/activity.js
Page({
  data: {
    event_name: '',
    poster: '',
    description: '',
    location: '',
    link: '',
    years: Array.from({ length: 100 }, (_, i) => 2024 + i),
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    hours: Array.from({ length: 24 }, (_, i) => i + 1),
    minutes: Array.from({ length: 60 }, (_, i) => i + 1),
    startTimeYear: null,
    startTimeMonth: null,
    startTimeDay: null,
    startTimeHour: null,
    startTimeMinute: null,
    endTimeYear: null,
    endTimeMonth: null,
    endTimeDay: null,
    endTimeHour: null,
    endTimeMinute: null,
    deadlineYear: null,
    deadlineMonth: null,
    deadlineDay: null,
    deadlineHour: null,
    deadlineMinute: null,
    start_time:"",
    end_time:"",
    registration_deadline:"",

    screenWidth: 0,
    screenHeight: 0,
    layoutStyle: ''
  },

  ReturnLastPage(){/*返回上一页*/
    wx.navigateBack({
      delta: 1 
    });
  },

  onLoad() {
    // 页面加载时的逻辑
   
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value,
    });
  },//输入函数

  onUploadPoster() {//图片上传函数
    const that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          poster: tempFilePaths[0],
        });
      },
    });
  },

  onYearChange(e) {//改变选择器年份
    const type = e.currentTarget.dataset.type;
    const year = this.data.years[e.detail.value];
    this.setData({
      [`${type}Year`]: year,
    });
  },

  onMonthChange(e) {//改变选择器月份
    const type = e.currentTarget.dataset.type;
    const month = this.data.months[e.detail.value];
    this.setData({
      [`${type}Month`]: month,
    });
  },

  onDayChange(e) {//改变选择器月份
    const type = e.currentTarget.dataset.type;
    const day = this.data.days[e.detail.value];
    this.setData({
      [`${type}Day`]: day,
    });
  },

  onHourChange(e) {//改变选择器小时
    const type = e.currentTarget.dataset.type;
    const hour = this.data.hours[e.detail.value];
    this.setData({
      [`${type}Hour`]: hour,
    });
  },

  onMinuteChange(e) {//改变选择器分钟
    const type = e.currentTarget.dataset.type;
    const minute = this.data.minutes[e.detail.value];
    this.setData({
      [`${type}Minute`]: minute,
    });
  },

  onSubmit() {/*提交的逻辑*/
    const {
      event_name,
    poster,
    description,
    location,
    link,
      startTimeYear,
      startTimeMonth,
      startTimeDay,
      startTimeHour,
      startTimeMinute,
      endTimeYear,
      endTimeMonth,
      endTimeDay,
      endTimeHour,
      endTimeMinute,
      deadlineYear,
      deadlineMonth,
      deadlineDay,
      deadlineHour,
      deadlineMinute,
    } = this.data;

    if (!activityName || !poster || !activityIntroduction || !location || !link ||
        !startTimeYear || !startTimeMonth || !startTimeDay || !startTimeHour || !startTimeMinute ||
        !endTimeYear || !endTimeMonth || !endTimeDay || !endTimeHour || !endTimeMinute ||
        !deadlineYear || !deadlineMonth || !deadlineDay || !deadlineHour || !deadlineMinute) {
      wx.showToast({//发布失败反馈信息
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    const start_time = `${startTimeYear}-${startTimeMonth}-${startTimeDay} ${startTimeHour}:${startTimeMinute}`;
    const end_time = `${endTimeYear}-${endTimeMonth}-${endTimeDay} ${endTimeHour}:${endTimeMinute}`;
    const registration_deadline = `${deadlineYear}-${deadlineMonth}-${deadlineDay} ${deadlineHour}:${deadlineMinute}`;


    console.log('活动信息：', {
      event_name,
    poster,
    description,
    location,
    link,
    start_time,
      end_time,
      registration_deadline,
    });
    wx.request({//上传相关表单
      url: 'https://your-backend-api.com/save', // 替换为你的后端接口地址
      method: 'POST',
      data: {
        event_name:that.data.event_name,
    poster:that.data.poster,
    description:that.data.description,
    location:that.data.location,
    link: that.data.link,
    start_time:that.data.start_time,
      end_time:that.data.end_time,
      registration_deadline:that.data.registration_deadline
      },
      header: {
        'content-type': 'application/json' // 默认值为 application/json
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
    });
  },
});