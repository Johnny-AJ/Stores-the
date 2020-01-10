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
    s: '', //待结算

    totalPrice: '', //订单总额
  },
  onLoad: function(res) {
    console.log(res, 'ress')
    this.setData({
      s: res.s
    })
    wx.setNavigationBarTitle({
      title: res.name,
    })
    this.alreadyEarningList();
  },
  onReachBottom: function() { //触底+1
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
  alreadyEarningList() {
    let self = this;
    let prams = {
      currPage: self.data.currPage,
      pageSiz: 5
    }
    if (self.data.s == 0) {
      http.getRequest('/api/store/earning/waitEarningList', prams, function(res) { //待结算订单
        console.log(res, 'alreadyEarningList')
        let alreadyEarningList = self.data.alreadyEarningList;
        var arr = [];
        arr = res.data.data.list;
        alreadyEarningList = [...alreadyEarningList, ...arr];
        alreadyEarningList.forEach(item => {
          switch (item.orderState) { //订单状态
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
              item.text = '待结算';
              break;
            case 6:
              item.text = "交易成功"
              break;
            case 7:
              cartlist1.text = '交易失败';
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
    } else {
      http.getRequest('/api/store/earning/alreadyEarningList', prams, function(res) { //已结算订单
        console.log(res, 'alreadyEarningList')
        let alreadyEarningList = self.data.alreadyEarningList;
        var arr = [];
        arr = res.data.data.list;
        alreadyEarningList = [...alreadyEarningList, ...arr];
        alreadyEarningList.forEach(item => {
          switch (item.orderState) { //订单状态
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
              item.text = '待结算';
              break;
            case 6:
              item.text = "交易成功"
              break;
            case 7:
              cartlist1.text = '交易失败';
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