let api = require('../../request/api.js')
// let request = require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgurl:api.API_IMG
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取首页轮播
    wx.request({
      url: api.getBanner(),
      success:(res)=>{
        console.log(res)
        this.setData({
          bannerList : res.data.re
        })
      }
    })
    //获取首页8个视频导航
    wx.request({
      url: api.getTab(),
      success:(res)=>{
        console.log(res)
        this.setData({
          tabList:res.data.re
        })
      }
    })
    //获取首页功能区分类
    wx.request({
      url: api.getFunctional(),
      success:(res)=>{
        console.log(res)
        this.setData({
          functionalList:res.data.re
        })
      }
    })
  },
  //视频详情
  toVideoDetail(e){
    console.log('点击了视频',e)
    wx.navigateTo({
      url: `/pages/video_detail/video_detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //商品详情
  toGoodsDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/goods_detail/goods_detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //功能区详情
  toFuncdetail(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/func_detail/func_detail?id=${e.currentTarget.dataset.id}`,
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