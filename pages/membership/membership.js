// pages/membership/membership.js
Page({

  /**
   * 页面的初
   */
  data: {
    userId: '',
    address: '',//地址
    addressInfo: '',//详细地址
    createTime: '',//注册时间
    phone: '',//联系电话
    userName: '',//用户名称
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