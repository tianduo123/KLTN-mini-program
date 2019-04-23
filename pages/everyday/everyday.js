// pages/everyday/everyday.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.API_IMG,
    ind: 0,
    setIntervalId: '',
    page: 0,
    pageSize: 4,
    hasMore: true,
    contentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取详情广告
    wx.request({
      url: api.getGg(3),
      success: (res) => {
        console.log(res)
        this.setData({
          ggList: res.data.re
        })
      }
    })
    // this.getList()
  },
  //获取视频列表
  getList() {
    wx.request({
      url: api.look1(this.data.page),
      success: (res) => {
        console.log(res)
        if (res.data.status == 0 || res.data.re.length < 4) {
          this.setData({
            hasMore: false
          })
        } else {
          this.setData({
            hasMore: true,
            page: this.data.page + 1
          })
          console.log('合并后的新数组', this.data.contentList.concat(res.data.re))
          this.setData({
            contentList: this.data.contentList.concat(res.data.re)
          })
        }

      }
    })
  },

  //广告详情
  toGgDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `../ggDetail/ggDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //去视频详情
  toDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/video_detail2/video_detail2?id=${e.currentTarget.dataset.id}`,
    })
  },
  //视频播放/继续播放
  play(e) {
    console.log('视频开始/继续播放')
    wx.request({
      url: api.look3(e.currentTarget.dataset.id),
      success: (res) => {
        console.log(res)
        if (res.data.status == 1) {
          this.getList()
        }
      }
    })
  },
  //点赞
  video_zan(e) {
    wx.request({
      url: api.look4(app.globalData.openid, e.currentTarget.dataset.id),
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          success: () => {
            console.log('重新获取点赞数量')
            //获取视频列表
            this.getList()

          }
        })
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
    this.setData({
      setIntervalId: setInterval(() => {
        // console.log('循环定时器启动')
        this.setData({
          ind: this.data.ind + 1
        })
        if (this.data.ind >= this.data.ggList.length) {
          this.setData({
            ind: 0
          })
        }
      }, 2000)
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('页面隐藏,关闭定时器')
    clearInterval(this.data.setIntervalId)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('页面卸载,关闭定时器')
    clearInterval(this.data.setIntervalId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载')
    //判断是否有下一页数据
    if (this.data.hasMore) {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        this.getList()
        wx.hideLoading()
      }, 1500)
    } else {
      wx.showToast({
        title: '没有下一页了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})