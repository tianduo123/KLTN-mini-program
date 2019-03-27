// pages/slqj_detail/slqj_detail.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:api.API_IMG,
    val:''
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
      url: api.getSlqj(options.id,app.globalData.openid),
      success:(res)=>{
        console.log(res) 
        this.setData({
          info:res.data.data.re,
          zan:res.data.data.re.zan
        })
      }
    })
    //获取评论列表
    wx.request({
      url: api.commentList2(options.id),
      success:(res)=>{
        console.log(res)
        this.setData({
          commentList:res.data.re
        })
      }
    })
  },
  //获取用户评论内容
  getVal(e){
    console.log(e)
    this.setData({
      val:e.detail.value
    })
  },
  //评论
  comment(){
    console.log(this.data.val)
    if(!this.data.val){
      wx.showToast({
        title: '请输入内容后再评论哦！',
        icon:'none'
      })
    }else{
      wx.request({
        url: api.comment2(app.globalData.openid,this.data.val,this.data.id),
        success:(res)=>{
          console.log(res)
          this.setData({
            val:''
          })
          wx.showToast({
            title: '评论成功',
            success:()=>{
              //刷新评论列表
              wx.request({
                url: api.commentList2(this.data.id),
                success: (res) => {
                  console.log(res)
                  this.setData({
                    commentList: res.data.re
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  //点赞
  zan(){
    wx.request({
      url: api.like2(app.globalData.openid,this.data.id),
      success:(res)=>{
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        //点赞成功刷新点赞人数
        wx.request({
          url: api.getZan(this.data.id),
          success:(res)=>{
            console.log(res)
            this.setData({
              zan:res.data.re.zan
            })
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