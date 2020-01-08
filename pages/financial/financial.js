// pages/financial/financial.js

let http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  handurl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  goto(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/close/close?name=' + e.currentTarget.dataset.name + '&s=' + e.currentTarget.dataset.s
      //0待结算和1已结算
    })
  }

})