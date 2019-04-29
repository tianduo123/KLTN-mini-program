// pages/video_detail/video_detail.js
let api = require('../../request/api.js')
let app = getApp()
var WxParse = require('../../wxParse/wxParse.js');


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
      courseid:options.id
    })
    //获取课程详情
    wx.request({
      url: api.getVideiDetail(options.id, app.globalData.openid),
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.data.re,
          zan: res.data.data.re.zan,
          browser: res.data.data.re.browser
        })
        var article = JSON.parse(this.data.detail.content);
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
    //获取评论列表
    wx.request({
      url: api.commentList(options.id),
      success: (res) => {
        console.log(res)
        this.setData({
          commentList: res.data.re,
          comment: res.data.re.length
        })
      }
    })
    //获取分类下视频id,在根据视频id获取详情
    // wx.request({
    //   url: api.getVideoId(options.id),
    //   success:(res)=>{
    //     console.log(res)
    //     this.setData({
    //       courseid:res.data.re.id
    //     })
    //     wx.request({
    //       url: api.getVideiDetail(res.data.re.id,app.globalData.openid),
    //       success:(res)=>{
    //         console.log(res)
    //         this.setData({
    //           detail:res.data.data.re,
    //           zan:res.data.data.re.zan,
    //           browser:res.data.data.re.browser
    //         })
    //         var article = JSON.parse(this.data.detail.content);
    //         WxParse.wxParse('article', 'html', article, this, 5);
    //       }
    //     })
    //     //获取评论列表
    //     wx.request({
    //       url: api.commentList(this.data.courseid),
    //       success: (res) => {
    //         console.log(res)
    //         this.setData({
    //           commentList: res.data.re,
    //           comment:res.data.re.length
    //         })
    //       }
    //     })
    //   }
    // })
  },
  //更新浏览量
  browser() {
    console.log('视频播放')
    wx.request({
      url: api.getZan2(this.data.courseid),
      success: (res) => {
        console.log(res)
        this.setData({
          browser: res.data.re.browser
        })
      }
    })
  },
  //视频点赞
  video_zan() {
    console.log("视频点赞")
    wx.request({
      url: api.video_zan(app.globalData.openid, this.data.courseid),
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        //更新点赞数量
        wx.request({
          url: api.getZan2(this.data.courseid),
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
      url: api.commentZan(app.globalData.openid, e.currentTarget.dataset.id),
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        //更新评论列表，用于更新点赞数量
        wx.request({
          url: api.commentList(this.data.courseid),
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
        url: api.comment(app.globalData.openid, this.data.val, this.data.courseid),
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
                url: api.commentList(this.data.courseid),
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