// pages/qiandao/qiandao.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    isqiandao:false,
    // userInfo: app.globalData.userInfo  
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
  //积分兑换
  jifen() {
    //判断用户是否登录，登录-->跳转积分兑换页面。未登录-->判断用户是否注册
    //从app.js中拿用户id用于判断用于判断用户是否登录
    console.log(app.globalData.userId)
    if (app.globalData.userId) {
      //已登录 --> 跳转积分兑换页面
      wx.navigateTo({
        url: '../getgoods/getgoods',
      })
    } else {
      //未登录 --> 判断用户是否注册
      //判断用户是否注册
      wx.request({
        url: api.isLogin(app.globalData.openid),
        success: (res) => {
          console.log(res)
          if (res.data.status == 0) {
            //用户未注册，跳转注册界面
            wx.navigateTo({
              url: '../login/login',
            })
          } else {
            //用户已注册，跳转登录界面
            wx.reLaunch({
              url: '../register/register',
            })
          }
        }
      })
    }
  },
  //查看全部排行榜
  toMore() {
    wx.navigateTo({
      url: `../more_rank/more_rank?userid=${app.globalData.userId}`,
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
    console.log(app.globalData.userId)
    if (app.globalData.userId) {
      //已登录 --> 直接签到
      wx.request({
        url: api.qiandao(app.globalData.openid, app.globalData.userId),
        success: (res) => {
          if (res.data.status == 1) {
            wx.showToast({
              title: '签到成功',
            })
            this.setData({
              days: res.data.re.sign_day,
              isqiandao: true,
            })
            //将签到状态存入缓存，onShow取缓存用于判断显示签到与红包样式
            wx.setStorage({
              key: 'isqiandao',
              data: res.data.status,
              success: function (res) {
                console.log('存储签到状态成功')
              },
            })
            //将签到天数存入缓存，onShow取缓存用于显示连续签到天数
            wx.setStorage({
              key: 'days',
              data: res.data.re.sign_day,
              success: function (res) {
                console.log('存储签到天数成功')
              },
              fail: function (res) { },
              complete: function (res) { },
            })
            //更新用户成长豆
            wx.request({
              url: api.getUserScore(app.globalData.userId),
              success: (res) => {
                console.log(res)
                this.setData({
                  score: res.data.data.score
                })
              }
            })
          } else {
            console.log('今日已签到')
          }
          console.log(res)

        }
      })
    } else {
      //未登录 --> 判断用户是否注册
      //判断用户是否注册
      wx.request({
        url: api.isLogin(app.globalData.openid),
        success: (res) => {
          console.log(res)
          if (res.data.status == 0) {
            //用户未注册，跳转注册界面
            wx.navigateTo({
              url: '../login/login',
            })
          } else {
            //用户已注册，跳转登录界面
            wx.reLaunch({
              url: '../register/register',
            })
          }
        }
      })
    }

  },
  //提建议
  toMsg(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //领取分享积分
  getScore1(){
    console.log('领取分享积分') 
    wx.request({
      url: api.getScore(app.globalData.openid,app.globalData.userId,this.data.share.score,0),
      success:(res)=>{
        console.log(res)
        if(res.data.status==1){
          wx.showToast({
            title: '领取成功',
            success:()=>{
              //领取成功后需要重新更新任务列表
              this.setData({
                share:false
              })
            }
          })
        }
      }
    })   
  },
  //领取推荐人积分
  getScore2(){
    console.log('领取推荐人积分')
  },
  //领取提建议积分
  getScore3(){
    console.log('领取提建议积分')
  },
  //去完成-->分享小程序
  complete1(){
    console.log('分享小程序')
    wx.showToast({
      title: '您今天已经分享过啦!',
      icon:'none'
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
    //从缓存中获取用户微信信息
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.data
        })
      },
    })
    //从缓存中拿签到状态
    wx.getStorage({
      key: 'isqiandao',
      success:(res)=>{
        console.log(res)
        if(res.data==0||1){
          this.setData({
            isqiandao:true
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    //从缓存中拿连续签到天数
    wx.getStorage({
      key: 'days',
      success:(res)=>{
        console.log(res)
        this.setData({
          days:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    //每次进入判断用户是否签到
    wx.request({
      url: api.isQiandao(app.globalData.openid,app.globalData.userId),
      success:(res)=>{
        console.log(res)
        if(res.data.status==0){
          //今日未签到
          this.setData({
            isqiandao:false
          })
        }
        else{
          console.log('今日已签到')
          this.setData({
            isqiandao:true
          })
          
        }
      }
    })
    //每次需重新获取用户成长豆
    wx.request({
      url: api.getUserScore(app.globalData.userId),
      success: (res) => {
        console.log(res)
        this.setData({
          score: res.data.data.score
        })
      }
    })
    //每次进入判断成长豆任务是否完成
    wx.request({
      url: api.isDone(app.globalData.openid,app.globalData.userId),
      success:(res)=>{
        console.log(res)
        this.setData({
          comment:res.data.comment,
          share:res.data.share,
          tuijian:res.data.tuijian
        })
      }
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
  onShareAppMessage: function (event) {
    console.log(event)
    console.log('转发啦哈哈哈！！！')
    //监听用户分享，调取接口获得积分
    wx.request({
      url: api.share(app.globalData.openid,app.globalData.userId),
      success:(res)=>{
        console.log(res)
        if(res.data.status==0){
          this.setData({
            share2:false
          })
        }
      }
    })
  }
})