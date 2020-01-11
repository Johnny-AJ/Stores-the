// pages/transaction/transaction.js

let http =require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tabs:[{name:'会员列表'},{name:'门店会员'}],
    allCount: 0,//会员总数
    newCount: 0,//今日新增
    carlist:[],//会员列表
    username: '',//搜索内容
    currPage:1,//页码
    hasNext: true, //
    loading: false, // 是否显示loading
    currPage: 1
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.count();
    this.requests()
  },
  onReachBottom: function () {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.requests()
    })

  },
  change(e){
      this.setData({
        current: e.currentTarget.dataset.index
      })
  },
  count(){

    let self =this;
    http.getRequest('/api/store/user/count',{},function(res){
      console.log(res,'cout')
      self.setData({
        allCount: res.data.data.allCount,//会员总数
        newCount: res.data.data.newCount,//今日新增
      })

    })
  },
  bindKeyInput: function (e) {//失去焦点将值付给inpuvalue
    this.setData({
      userName: e.detail.value
    })
  },

  requests(){//请求数据接口
    let self = this;
    let userName = self.data.userName;
    let prams = {
      currPage: self.data.currPage,
      pageSize: 4,
      userName: userName ? userName : ''
    }
    http.getRequest('/api/store/user/list', prams, function (res) {
      console.log(res,'list')

      let carlist = self.data.carlist;
      var arr = [];
      arr = res.data.data.list;
      carlist = [...carlist, ...arr];

      self.setData({
        loading: false,
        carlist,
        hasMore: res.data.data.list.length == 4,
        hasNext: res.data.data.hasNext
      })
    })
  },
  seach(){
    var self =this;
    if (self.data.userName){
      self.setData({
        currPage:1
      },()=>{
        self.requests()
      })
    }else{

    }

    console.log(this.data.userName,'seach')
  },
  goto(e){
    wx.navigateTo({
      url: '/pages/membership/membership?userId=' + e.currentTarget.dataset.userid,
    })
  }
})