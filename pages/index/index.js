let api = require('../../request/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:api.API_IMG,
    val:'',
    ggList:[],
    ind:0,
    ind2:0,
    intervalId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取广告
    wx.request({
      url: api.getGg(1),
      success:(res)=>{
        console.log(res)
        this.setData({
          ggList1:res.data.re
        })
      }
    })
    wx.request({
      url: api.getGg(2),
      success:(res)=>{
        console.log(res)
        this.setData({
          ggList2:res.data.re
        })
      }
    })
    //从缓存中拿用户userInfo数据
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log('拿到授权信息')
        //拿到用户微信信息 --> 不显示授权蒙层
        this.setData({
          isShow:false
        })
      },
      fail:(res)=>{
        console.log('没拿到授权信息')
        //没拿到用户微信信息 --> 显示授权蒙层
        this.setData({
          isShow:true
        })
      }
    })
    //获取用户经纬度（显示附近商家需要）
    wx.getLocation({
      success:(res)=>{
        console.log(res)
        this.setData({
          lat:res.latitude,
          lon:res.longitude
        })
        //拿到用户经纬度获取附近商家列表
        wx.request({
          url:api.nearList(res.latitude,res.longitude),
          success:(res)=>{
            console.log(res)
            this.setData({
              near:res.data
            })
          }
        }) 
      },
    })
    //获取屏幕高度（显示用户授权蒙层需要）
    wx.getSystemInfo({
      success:(res) =>{
        console.log(res.screenHeight)
        this.setData({
          Height:res.screenHeight
        })
        app.globalData.Height = res.screenHeight
      },
    })
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
    //获取每日即时看8个导航按钮
    wx.request({
      url: api.getTab(),
      success:(res)=>{
        console.log(res)
        this.setData({
          tabList:res.data.re
        })
      }
    })
    //获取身临其境视频列表
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
  //广告详情
  ggDel(e){
    console.log(e)
    wx.navigateTo({
      url: `../ggDetail/ggDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //附近商家
  tonear(){
 
    //获取用户的授权状态
    wx.getSetting({
      success:(res)=>{
        //判断scope.userLocation是否为true
        console.log(res)
        if(res.authSetting["scope.userLocation"]){
          //如果授权过直接跳转附近商家列表
          wx.navigateTo({
            url: `../near/near?lat=${this.data.lat}&lon=${this.data.lon}`,
          })
        }else{
          //用户没有授权，引导用户授权
          wx.openSetting({
            success: (res) => {
              console.log(res)
              wx.getLocation({
                success:(res)=>{
                  console.log(res)
                  this.setData({
                    lat:res.latitude,
                    lon:res.longitude
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
  //获取用户信息
  getUserInfo(res){
    console.log(res)
    if (res.detail.rawData){
      //将用户信息存到缓存
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
      this.setData({
        isShow:false
      })
      //调用接口保存用户授权信息
      wx.request({
        url: api.saveUser(app.globalData.openid, res.detail.userInfo.nickName, res.detail.userInfo.avatarUrl),
        success:(res)=>{
          console.log(res)
        }
      })
    }
  },

  //每日即时看
  toVideoDetail(e){
    console.log('点击了每日即时看',e)
    wx.navigateTo({
      url: `/pages/everyday/everyday?id=${e.currentTarget.dataset.id}`,
    })
  },
  //商品详情
  toGoodsDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/goods_detail/goods_detail?id=${e.currentTarget.dataset.id}`,
    })
  },


  //点击身临其境
  toFuncdetail(e){
    wx.navigateTo({
      url: `../slqj_detail/slqj_detail?id=${e.currentTarget.dataset.id}`,
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
    //获取身临其境视频列表
    wx.request({
      url: api.getFunctional(),
      success: (res) => {
        console.log(res)
        this.setData({
          functionalList: res.data.re
        })
      }
    })
    //轮播广告
    this.setData({
      intervalId : setInterval(() => {
        this.setData({
          ind: this.data.ind + 1,
          ind2: this.data.ind2 + 1
        })
        // console.log(this.data.ind)
        if (this.data.ind >= this.data.ggList1.length) {
          this.setData({
            ind: 0
          })
        }
        if (this.data.ind2 >= this.data.ggList2.length) {
          this.setData({
            ind2: 0
          })
        }
      }, 2000)
    })
  
  
    console.log(this.data.intervalId)
  },

  onHide: function(){
    console.log('页面隐藏',this.data.ind)
    clearInterval(this.data.intervalId)

  },
  onUnload : function(){
    console.log('页面卸载', this.data.ind)
    clearInterval(this.data.intervalId)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})