// pages/financial/financial.js

let http =require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allStoreEarning: '',//总提成（元）
    balance: '',//账户余额（元）
    deposit: '',//保证金（元）
    waitStoreEarning: ''//待结算金额（元）
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findAllPushAndWaitEarning()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  handurl(e) {
    console.log(e,'e')
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  goto(e){

    wx.navigateTo({
      url: '/pages/close/close?name=' + e.currentTarget.dataset.name + '&s=' + e.currentTarget.dataset.s
    })
  },
  findAllPushAndWaitEarning(){
    let self =this;
    http.getRequest('/api/store/earning/findAllPushAndWaitEarning',{},function(res){

      let data=res.data.data;
      self.setData({
        allStoreEarning: data.allStoreEarning,//总提成（元）
        balance: data.balance,//账户余额（元）
        deposit: data.deposit,//保证金（元）
        waitStoreEarning: data.waitStoreEarning//待结算金额（元）
      })
      console.log(res)
    })
  }
  
})