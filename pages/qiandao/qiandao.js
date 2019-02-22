// pages/qiandao/qiandao.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户积分
    wx.request({
      url: api.getUserScore(app.globalData.userId),
      success:(res)=>{
        console.log(res)
        this.setData({
          score:res.data.data.score
        })
      }
    })
  },
  //成长豆规则
  rule(){
    //获取成长豆规则
    wx.request({
      url: api.getRule(),
      success:(res)=>{
        console.log(res)
        var ruleList = res.data.re.content.split(';')
        console.log(ruleList)
        this.setData({
          ruleList
        })
      }
    })
    this.setData({
      isShow:true
    })
  },
  //关闭规则
  close(){
    this.setData({
      isShow:false
    })
  },
  //成长豆明细
  toScoreDetail(){
    console.log('成长豆明细')
    wx.navigateTo({
      url: '../scroe_detail/score_detail',
    })
  },
  //签到
  qiandao(){
    console.log('签到')
    wx.request({
      url: api.qiandao(app.globalData.openid,app.globalData.userId),
      success:(res)=>{
        console.log(res)
        this.setData({
          qiandaoInfo:res.data.re,
          status:res.data.status
        })
        wx.setStorage({
          key: 'day',
          data: res.data.re.sign_day,
          success:()=>{
            console.log('存储成功')
          }
        })
        wx.setStorage({
          key: 'status',
          data: res.data.status,
          success:()=>{
            console.log('状态存到缓存')
          }
        })
      }
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
    wx.getStorage({
      key: 'day',
      success:(res)=>{
        console.log(res)
        this.setData({
          sign_day:res.data
        })
      },
    })
    wx.getStorage({
      key: 'status',
      success:(res)=>{
        console.log(res)
        this.setData({
          status:res.data
        })
      },
    })
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