// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pageSize: 4,
    hasMore: true,
    contentList: []
  },
  api(a){
    return `https://syb.qhkltn.com/index.php/Api/view/viewIndex?admin_id=15&page=${a}`
  },
  getList(){
    wx.request({
      url: this.api(this.data.page),
      success: (res) => {
        console.log(res)
        if(res.data.status==0 || res.data.re.length<4){
          this.setData({
            hasMore:false
          })
        }else{
          this.setData({
            hasMore:true,
            page:this.data.page+1
          })
          console.log('合并后的新数组', this.data.contentList.concat(res.data.re))
          this.setData({
            contentList: this.data.contentList.concat(res.data.re)
          })
        }
     
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
      setTimeout(()=>{
        this.getList()
        wx.hideLoading()
      }, 1500)
    }else{
      wx.showToast({
        title: '没有下一页了',
        icon:'none'
      })
    }
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
    console.log('下拉刷新')
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})