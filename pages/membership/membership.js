// pages/membership/membership.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    wx.request({
      url: 'http://192.168.2.98:9098/api/storFe/user/info',
      header: {
        token: wx.getStorageSync("token")
      },
      success: res => {
        console.log(res, "res1")
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