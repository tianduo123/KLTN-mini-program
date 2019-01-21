// pages/yuyue/yuyue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'',
    name1:'',
    tel:'',
    name2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //选择日期函数
  binddatechange(e){
    console.log(e)
    this.setData({
      val:e.detail.value
    })
  },
  //预约咨询函数
  tijiao(e){
    console.log(e)
    //判断时间、姓名、手机号是否合法
    if(!e.detail.value.time){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
    }else if(!e.detail.value.name.trim()){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(e.detail.value.phone))){
      wx.showToast({
        title: '手机号输入有误',
        icon:'none'
      })
    }else{
      //调取预约接口，成功后执行以下代码
      wx.request({
        url: `http://192.168.8.100/children/index.php/Api/yu/yuyue?admin_id=5&order_name=${e.detail.value.name}&phone=${e.detail.value.phone}&yuyue_time=${e.detail.value.time}&tujian_name=${e.detail.value.tjr}`,
        success:(res)=>{
          console.log(res)
          wx.showToast({
            title: '预约成功',
          })
          //预约成功后清空输入框
          this.setData({
            val: '',
            name1: '',
            tel: '',
            name2: ''
          })
        }
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