
// pages/task/task.js
Page({
  data: {
    task_name: '',
    name: '',
    content: '',
    deadline:'',
    years: Array.from({ length: 100 }, (_, i) => 2024 + i),
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    hours: Array.from({ length: 24 }, (_, i) => i + 1),
    minutes: Array.from({ length: 60 }, (_, i) => i + 1),
    selectedYear: null,
    selectedMonth: null,
    selectedDay: null,
    selectedHour: null,
    selectedMinute: null,
  },
  
  ReturnLastPage(){
    wx.navigateBack({
      delta: 1 // 返回的页面数，1 表示返回到上一个页面
    });
  },

  onLoad() {
    
    // 页面加载时的逻辑
  },

  onInput(e) {//编辑函数
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value,
    });
  },

  onYearChange(e) {//改变选择器年份
    this.setData({
      selectedYear: this.data.years[e.detail.value],
    });
  },

  onMonthChange(e) {//改变选择器月份
    this.setData({
      selectedMonth: this.data.months[e.detail.value],
    });
  },

  onDayChange(e) {//改变选择器日期
    this.setData({
      selectedDay: this.data.days[e.detail.value],
    });
  },

  onHourChange(e) {//改变选择器小时
    this.setData({
      selectedHour: this.data.hours[e.detail.value],
    });
  },

  onMinuteChange(e) {//改变选择器分钟
    this.setData({
      selectedMinute: this.data.minutes[e.detail.value],
    });
  },

  onSubmit() {/*提交按钮的逻辑*/
    const { taskName, responsible, taskContent, selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute } = this.data;

    if (!taskName || !responsible || !taskContent || !selectedYear || !selectedMonth || !selectedDay || !selectedHour || !selectedMinute) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    const deadline = `${selectedYear}-${selectedMonth}-${selectedDay} ${selectedHour}:${selectedMinute}`;


   

    console.log('任务信息：', {
      task_name,
      name,
      content,
      deadline,
    });
    wx.request({/*上传数据*/
      url: 'url',
      method:'POST',
      data:{
        task_name:this.data.task_name,
        name:this.data.name,
        content:this.data.content,
        deadline:this.data.deadline
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