// pages/ggDetail/ggDetail.js
var WxParse = require('../../wxParse/wxParse.js');
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    //获取详情
    wx.request({
      url:api.getGgDetail(options.id),
      success:(res)=>{
        console.log(res)
        var article = res.data.re.content;
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
    //判断用户在此页面停留是否超过3秒
    setTimeout(()=>{
      console.log('3s已过,点击量+1')
      wx.request({
        url: api.ggClick(this.data.id),
        success:(res)=>{
          console.log(res)
        }
      })
    },3000)
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