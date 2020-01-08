// pages/income/income.js

let http =require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [{ day: 1, name: "昨日" }, { day: 7, name: "近7日" }, { day: 30, name: "近30日" }, { day: 0,name: "全部"}],
    currentTarget: "0",
    day:1,
    conant:{}
  },
  handTabs(e) {

    let self =this;
    this.setData({
      conant:{},
      currentTarget: e.currentTarget.dataset.index,
      day: e.currentTarget.dataset.day
    },()=>{
      self.getDetail()
    })
    console.log(this.data.day)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getDetail(){
    let self =this;
    http.getRequest('/api/store/detail/getDetail', { day: self.data.day},function(res){
      self.setData({
        conant:res.data.data
      })

    })
  },
  goto(e){
    wx.navigateTo({
      url: '/pages/deduct/deduct?day='+e.currentTarget.dataset.day, 
    })
  }


})