// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '', //手机号    13189413198  13143698421  17344573220   17817891541
    code: '', //验证码
    type: 2 //验证码类型  0注册,1重置密码,2登录,3解绑手机号,4绑定手机号
  },
  // 手机号
  handNumber(e) {
    let self = this;
    self.setData({
      mobile: e.detail.value
    })
    // console.log(e)
  },
  // 验证码
  handVerification(e) {
    let self = this
    let code = e.detail.value
    self.setData({
      code: code
    })
    console.log(self.data.code, "code")
  },
  // 获取验证码
  handleVerification(e) {
    let self = this
    if (self.data.mobile) {
      wx.request({
        url: 'http://192.168.2.98:9098/api/store/generateCode',
        method: 'POST',
        dataType: 'application/json',
        data: {
          mobile: self.data.mobile,
          type: self.data.type
        },
        success: res => {
          console.log(res, "获取验证码")
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },
  // 注册/登陆
  handleRegister(e) {
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9098/api/store/findByPhone', //判断手机号是否注册过
      data: {
        phone: self.data.mobile
      },
      success: res => {
        console.log(res.data.data, 'res1')
        if (res.data.data == true) { //true注册  false登陆
          wx.request({
            url: 'http://192.168.2.98:9098/api/store/register', //注册
            method: "POST",
            dataType: 'application/json',
            data: {
              mobile: self.data.mobile,
              code: self.data.code,
              type: 0
            },
            success: res => {
              console.log(res, "注册")
              if (res.data.code == 0) { //status：0待审核,1通过,2不通过,3待补充信息
                wx.showToast({
                  title: '注册中',
                  icon: 'none',
                  duration: 1500
                })
                wx.navigateTo({
                  url: "/pages/Branch_Information/Branch_Information?phone=" + self.data.mobile,
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        } else {
          wx.request({
            url: 'http://192.168.2.98:9098/api/store/login', //登陆
            method: "POST",
            dataType: 'application/json',
            data: {
              code: self.data.code,
              mobile: self.data.mobile,
              type: 2
            },
            success: res => {
              if (res.data.code == 0) {
                console.log(res, "res2")
                wx.navigateTo({
                  url: "/pages/home/home"
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})