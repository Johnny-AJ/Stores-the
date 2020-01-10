// pages/merchandise/merchandise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coding: '' //扫码内容
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
      url: 'http://192.168.2.98:9098/api/binding/store/info',
      header: {
        token: wx.getSton
      },
      success: res => {
        console.log(res, "res")
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