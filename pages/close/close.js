// pages/demo6/demo6.js

let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPage: 1,
    isshow: false, //默认闭合
    alreadyEarningList: [], //数据列表
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,
    s: '' //0待结算，1已结算
  },
  onLoad: function(res) {
    console.log(res, 'ress')
    this.setData({
      s: res.s
    })
    wx.setNavigationBarTitle({
      title: res.name,
    })
    this.alreadyEarningList(); //数据列表
  },
  onReachBottom: function() {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.alreadyEarningList()
    })
  },
  toggle(e) { //图片点击事件
    console.log(e)
    // this.isshow =!this.isshow; 
    this.setData({
      isshow: !this.data.isshow
    })
    // this.$apply();
    console.log(this.data.isshow)
  },
  // 数据列表
  alreadyEarningList() {
    let self = this;
    let prams = {
      currPage: self.data.currPage,
      pageSiz: 5
    }
    if (self.data.s == 0) { //->待结算
      http.getRequest('/api/store/earning/waitEarningList', prams, function(res) { //待结算订单
        console.log(res, 'alreadyEarningList')
        let alreadyEarningList = self.data.alreadyEarningList;
        var arr = [];
        arr = res.data.data.list;
        alreadyEarningList = [...alreadyEarningList, ...arr];
        alreadyEarningList.forEach(item => {
          switch (item.orderState) {
            case 1:
              item.text = '待付款';
              break;
            case 2:
              item.text = '待发货';
              break;
            case 3:
              item.text = '待收货';
              break;
            case 5:
              item.text = '已结算';
              break;
            case 6:
              item.text = "交易成功"
              break;
            case 7:
              item.text = '交易失败';
              break;
          }
        })
        self.setData({
          loading: false,
          alreadyEarningList,
          hasMore: res.data.data.list.length == 5,
          hasNext: res.data.data.hasNext
        })
      })
    } else { //->已结算
      http.getRequest('/api/store/earning/alreadyEarningList', prams, function(res) { //已结算订单
        console.log(res, 'alreadyEarningList')
        let alreadyEarningList = self.data.alreadyEarningList;
        var arr = [];
        arr = res.data.data.list;
        alreadyEarningList = [...alreadyEarningList, ...arr];
        alreadyEarningList.forEach(item => {
          switch (item.orderState) {
            case 1:
              item.text = '待付款';
              break;
            case 2:
              item.text = '待发货';
              break;
            case 3:
              item.text = '待收货';
              break;
            case 5:
              item.text = '已结算';
              break;
            case 6:
              item.text = "交易成功"
              break;
            case 7:
              item.text = '交易失败';
              break;
          }
        })
        self.setData({
          loading: false,
          alreadyEarningList,
          hasMore: res.data.data.list.length == 5,
          hasNext: res.data.data.hasNext
        })
      })
    }
  }
})