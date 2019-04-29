// pages/index2/index2.js
let api = require('../../request/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: api.API_IMG,
  },
  //轮播详情
  toGoodsDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/goods_detail/goods_detail?id=${e.currentTarget.dataset.id}`,
    })
  },


  //离我最近
  tonear() {
    //获取用户的授权状态
    wx.getSetting({
      success: (res) => {
        //判断scope.userLocation是否为true
        console.log(res)
        if (res.authSetting["scope.userLocation"]) {
          //如果授权过直接跳转附近商家列表
          wx.navigateTo({
            url: `../near/near?lat=${this.data.lat}&lon=${this.data.lon}`,
          })
        } else {
          //用户没有授权，引导用户授权
          wx.openSetting({
            success: (res) => {
              console.log(res)
              wx.getLocation({
                success: (res) => {
                  console.log(res)
                  this.setData({
                    lat: res.latitude,
                    lon: res.longitude
                  })
                  wx.navigateTo({
                    url: `../near/near?lat=${res.latitude}&lon=${res.longitude}`,
                  })
                  //拿到用户经纬度获取附近商家列表
                  wx.request({
                    url: api.nearList(res.latitude, res.longitude),
                    success: (res) => {
                      console.log(res)
                      this.setData({
                        near: res.data
                      })
                      console.log(this.data.near)
                    }
                  })
                },
              })
            }
          })
        }
      }
    })
  },

  //主打课程
  tokc(e) {
    console.log('跳转主打课程二级页面', e)
    wx.navigateTo({
      url: `../video_list/video_list?status=${e.currentTarget.dataset.status}`,
    })
  },

  //每日即时看
  look() {
    console.log('每日即时看')
    wx.navigateTo({
      url: `/pages/everyday/everyday`,
    })
  },

  //身临其境
  toslqj(e) {
    console.log('跳转身临其境二级页面', e)
    wx.navigateTo({
      url: `../video_list/video_list?status=${e.currentTarget.dataset.status}`,
    })
  },

  //获取用户信息
  getUserInfo(res) {
    console.log(res)
    if (res.detail.rawData) {
      //将用户信息存到缓存
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
      this.setData({
        isShow: false
      })
      //调用接口保存用户授权信息
      wx.request({
        url: api.saveUser(app.globalData.openid, res.detail.userInfo.nickName, res.detail.userInfo.avatarUrl),
        success: (res) => {
          console.log(res)
        }
      })
    }
  },

  //拼团
  toPintuan() {
    wx.request({
      url: api.hasPin(),
      success: (res) => {
        console.log(res)
        if (res.data.re.pin == 1) {
          wx.navigateToMiniProgram({
            appId: 'wx3950a029465d5070',
            extraData: {
              appid: api.BASE_ID
            },
            envVersion: 'release',
            success: (res) => {
              console.log(res)
            },
            fail: (res) => {
              console.log(res)
            }
          })
        } else {
          wx.showToast({
            title: '暂无拼团活动',
            image: '../../icon/cry.png'
          })
        }
      }
    })

  },

  //广告详情
  ggdetail(e) {
    console.log(e)
    //如果点击的是小游戏广告就跳转到小游戏
    if (e.currentTarget.dataset.id == 9) {
      wx.navigateToMiniProgram({
        appId: 'wx9f726f8d93b57acd',
        envVersion: 'trial',
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
    //否则跳转到广告详情页面
    else {
      wx.navigateTo({
        url: `../ggDetail/ggDetail?id=${e.currentTarget.dataset.id}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取首页轮播
    wx.request({
      url: api.getBanner(),
      success: (res) => {
        console.log(res)
        this.setData({
          bannerList: res.data.re
        })
      }
    })
    //从缓存中拿用户userInfo数据
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log('拿到授权信息')
        //拿到用户微信信息 --> 不显示授权蒙层
        this.setData({
          isShow: false
        })
      },
      fail: (res) => {
        console.log('没拿到授权信息')
        //没拿到用户微信信息 --> 显示授权蒙层
        this.setData({
          isShow: true
        })
      }
    })
    //获取用户经纬度（显示附近商家需要）
    wx.getLocation({
      success: (res) => {
        console.log(res)
        this.setData({
          lat: res.latitude,
          lon: res.longitude
        })
      },
    })
    //获取屏幕高度（显示用户授权蒙层需要）
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.screenHeight)
        this.setData({
          Height: res.screenHeight
        })
        app.globalData.Height = res.screenHeight
      },
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
    //获取首页上广告
    wx.request({
      url: api.getGg(1),
      success: (res) => {
        console.log('这是广告上', res)
        this.setData({
          topgg: res.data.re
        })
      }
    })
    //获取首页下广告
    wx.request({
      url: api.getGg(2),
      success: (res) => {
        console.log('这是广告下', res)
        this.setData({
          botttomgg: res.data.re
        })
      }
    })
  },
  //
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