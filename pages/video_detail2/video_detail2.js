// pages/video_detail/video_detail.js
let api = require('../../request/api.js')
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    video_url: api.API_IMG,
    isZan: false,
    val: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    wx.request({
      url: api.look2(options.id, app.globalData.openid),
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.data.re,
          zan: res.data.data.re.zan,
          browser: res.data.data.re.browser
        })
      }
    })
    //获取评论列表
    wx.request({
      url: api.look7(options.id),
      success: (res) => {
        console.log(res)
        this.setData({
          commentList: res.data.re,
          comment: res.data.re.length
        })
      }
    })
  },

  //视频点赞
  video_zan() {
    console.log("视频点赞")
    wx.request({
      url: api.look4(app.globalData.openid, this.data.id),
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        //更新点赞数量
        wx.request({
          url: api.look5(this.data.id),
          success: (res) => {
            console.log(res)
            this.setData({
              zan: res.data.re.zan
            })
          }
        })
      }
    })
  },
  //评论点赞
  comment_zan(e) {
    console.log(e)
    wx.request({
      url: api.look8(app.globalData.openid, e.currentTarget.dataset.id),
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        //更新评论列表，用于更新点赞数量
        wx.request({
          url: api.look7(this.data.id),
          success: (res) => {
            console.log(res)
            this.setData({
              commentList: res.data.re
            })
          }
        })
      }
    })
  },
  //评论内容
  getVal(e) {
    console.log(e)
    this.setData({
      val: e.detail.value
    })
  },
  //评论
  comment() {
    //判断是否有输入
    if (this.data.val) {
      wx.request({
        url: api.look6(app.globalData.openid, this.data.id, this.data.val),
        success: (res) => {
          wx.showToast({
            title: '评论成功',
            success: () => {
              //清空输入
              this.setData({
                val: ''
              })
              //更新评论列表
              wx.request({
                url: api.look7(this.data.id),
                success: (res) => {
                  console.log(res)
                  this.setData({
                    commentList: res.data.re,
                    comment: res.data.re.length
                  })
                }
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容后在评论哦',
        icon: 'none'
      })
    }

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