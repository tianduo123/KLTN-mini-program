// pages/everyday/everyday.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   Vlist:[],//视频列表
   page:0,//页码
   hasMore:true,//true为有更多数据,false为数据加载完毕
   imgUrl:api.API_IMG
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    //获取视频列表
    // wx.request({
    //   url: api.getVideoList(options.id),
    //   success:(res)=>{
    //     console.log(res)
    //     this.setData({
    //       Vlist:res.data.re
    //     })
    //   }
    // }) 
    this.getVlist()
  },
  //获取视频列表函数
  getVlist(){
    var page = this.data.page //获取页码
    //发请求获取列表
    wx.request({
      url: api.getNextPage(this.data.id,this.data.page),
      success:(res)=>{
        console.log(res)
        if(res.data.status == 1){
          console.log('获取成功')
          var allArr = []
          var initArr = this.data.Vlist ? this.data.Vlist : [] //获取已经加载的视频
          var newArr = res.data.re //获取新加载的视频
          var lastPageLength = newArr.length //获取新加载的视频数量
          if (this.data.page == 0) {
            //如果是第一页
            allArr = res.data.re
          } else {
            //如果不是第一页，将已加载与新加载的数组合并
            allArr = initArr.concat(newArr)
          }
          if (lastPageLength < 4) {
            //如果新加载的视频数量<4，说明没有下一页了
            this.setData({
              hasMore: false
            })
          }
          this.setData({
            Vlist: allArr
          })
        }else{
          wx.showToast({
            title: '视频已加载完毕',
            icon:'none'
          })
        }
     
      },
      fail:()=>{
        console.log('数据请求失败')
      },
      complete:()=>{
        // wx.hideLoading()
      }
    })
  },



  //去视频详情
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/video_detail/video_detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //视频播放/继续播放
  play(e){
    console.log('视频开始/继续播放')
    wx.request({
      url: api.addBrowser(e.currentTarget.dataset.id),
      success:(res)=>{
        console.log(res)
      }
    })
  },
  //点赞
  video_zan(e){
    wx.request({
      url: api.video_zan(app.globalData.openid,e.currentTarget.dataset.id),
      success:(res)=>{
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          success:()=>{
            console.log('重新获取点赞数量')
            //获取视频列表
            wx.request({
              url: api.getVideoList(this.data.id),
              success: (res) => {
                console.log(res)
                this.setData({
                  Vlist: res.data.re
                })
              }
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
    // wx.request({
    //   url: api.getVideoList(this.data.id),
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       Vlist: res.data.re
    //     })
    //   }
    // })
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
    console.log('到底啦，别啦啦')
    var page = this.data.page //获取当前页码
    if(this.data.hasMore){
      //页码+1，调用函数获取下一页内容
      page++
      this.setData({
        page
      })
      this.getVlist()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})