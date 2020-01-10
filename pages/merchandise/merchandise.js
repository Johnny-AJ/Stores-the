// pages/merchandise/merchandise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coding: '', //扫码内容
    storeId: '', //门店ID
    conList: {}, //商品列表
  },

  // 绑定门店
  handleBindingStore(e) {
    let self = this
    // console.log(e)
    wx.request({
      url: 'http://192.168.2.98:9098/api/binding/store/updateBindingStore', //绑定门店
      header: {
        token: wx.getStorageSync("token")
      },
      data: {
        coding: self.data.coding
      },
      success: res => {
        console.log(res, "res")
        if (res.data.code == 0) {
          wx.showToast({
            title: "绑定成功",
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let self = this
    self.setData({
      coding: e.coding
    })
    console.log(self.data.coding, "coding")
    wx.request({
      url: 'http://192.168.2.98:9098/api/binding/store/info', //查询商品信息
      header: {
        token: wx.getStorageSync("token")
      },
      data: {
        coding: self.data.coding
      },
      success: res => {
        console.log(res)
        self.setData({
          conList: res.data.data
        })
      }
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

    
  }
})