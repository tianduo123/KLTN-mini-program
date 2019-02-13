// pages/video_detail/video_detail.js
let api = require('../../request/api.js')
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_url:api.API_IMG
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: api.getVideiDetail(options.id),
      success:(res)=>{
        console.log(res)
        this.setData({
          detail: res.data.re,
          videoUrl:res.data.re.video
        })
        var article = this.data.detail.content;
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
    //获取手机系统，用于显示评论内容是否居中
    wx.getSystemInfo({
      success:(res)=>{
        console.log(res)
        this.setData({
          system:res.platform
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})