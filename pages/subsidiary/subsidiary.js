// pages/income/income.js

let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [{ day: 1, name: "昨日" }, { day: 7, name: "近7日" }, { day: 30, name: "近30日" }, { day: 0, name: "全部" }],
    currentIndex: "0",
    day: 1,
    total:{},//总收益
    conant: {},
    isshow: false, //默认闭合
    alreadyEarningList: [],//数据列表
    hasNext: true, //
    loading: false, // 是否显示loading
    currPage:1

  },
  handtab(e) {

    let self = this;
    this.setData({
      alreadyEarningList: [],
      currPage:1,
      currentIndex: e.currentTarget.dataset.index,
      day: e.currentTarget.dataset.day
    }, () => {
      self.alreadyEarningList()
    })
    console.log(this.data.day)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail();
    this.alreadyEarningList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onReachBottom: function () {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.alreadyEarningList()
    })

  },
  getDetail() {//顶部总收益
    let self = this;
    http.getRequest('/api/store/push/money/getDetail', { day: self.data.day }, function (res) {
      console.log(res,'getDetail');
      self.setData({
        total:res.data.data.money
      })

    })
  },

  alreadyEarningList() {  
    let self = this;
    let prams = {
      day:self.data.day,
      currPage: self.data.currPage,
      pageSize: 5
    }
   
    http.getRequest('/api/store/push/money/getPushMoney',prams,function(res){

      console.log(res, 'prams')
      let alreadyEarningList = self.data.alreadyEarningList;
      var arr = [];
      arr = res.data.data.list;
      alreadyEarningList = [...alreadyEarningList, ...arr];

      self.setData({
        loading: false,
        alreadyEarningList,
        hasMore: res.data.data.list.length == 5,
        hasNext: res.data.data.hasNext
      })
    })

   
    

  }


})