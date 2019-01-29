// pages/login/login.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '获取验证码',
    timer_num: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //从缓存中拿用户微信头像
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.data
        })
      },
    })
  },
  //获取用户姓名
  getName(e) {
    console.log(e)
  },
  //获取注册手机号
  getPhone(e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getcode() {
    //判断当前的msg是否是'获取验证码'，如果是发短信，不是直接return
    if (this.data.msg == '获取验证码') {
      this.setData({
        msg: '已发送'
      })
      //启动定时器     
      var timer = setInterval(() => {
        this.setData({
          timer_num: this.data.timer_num - 1
        })
        console.log(this.data.timer_num)
        if (this.data.timer_num == 0) {
          //关闭定时器
          clearInterval(timer)
          console.log('关闭定时器')
          this.setData({
            msg:'获取验证码',
            timer_num:60
          })
        }
      }, 1000)
      //发短信
      wx.request({
        url: api.getcode(this.data.phone),
        success: (res) => {
          console.log(res)
          this.setData({
            code: res.data.code
          })
        }
      })
    } else {
      console.log('验证码已发送')
      return
    }

  },
  //注册
  login(e) {
    console.log(e)
    wx.request({
      url: api.login(app.globalData.openid, e.detail.value.phone, e.detail.value.name, e.detail.value.password, this.data.code, e.detail.value.usercode, e.detail.value.tjr),
      success: (res) => {
        console.log(res)
        if (res.data.status == 1) {
          //注册成功,跳转登录页面
          wx.showToast({
            title: '注册成功请登录',
            success:()=>{
              setTimeout(()=>{
                wx.reLaunch({
                  url: '../register/register',
                })
              },1500)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})