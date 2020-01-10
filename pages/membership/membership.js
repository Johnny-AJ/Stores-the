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
  onLoad: function (options) {
    let self =this;
      this.setData({
        userId: options.userId
      },()=>{
        self.info()
      })
  },
  info(){
    let self =this;
    http.getRequest('/api/store/user/info', { userId: self.data.userId},function(res){
      self.setData({
        address: res.data.data.address,//地址
        addressInfo: res.data.data.addressInfo,//详细地址
        createTime: res.data.data.createTime,//注册时间
        phone: res.data.data.phone,//联系电话
        userName: res.data.data.userName,//用户名称
      })
    })
  }
 
})