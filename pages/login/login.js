// pages/login/login.js


let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '', //手机号    13189413198  13143698421  17344573220   17817891541
    code: '', //验证码
    type: 0 //验证码类型  0注册,1重置密码,2登录,3解绑手机号,4绑定手机号
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
      http.getRequest('/api/store/findByPhone', {
        phone: self.data.mobile
      }, function(res) {
        console.log(res, 'findByPhone');

        if (res.data.data) { //true注册  false登陆

          self.setData({
            type: 0
          })
          let prams1 = {
            mobile: self.data.mobile,
            type: 0
          }
          http.postRequest('/api/store/generateCode', prams1, function(res) {
            console.log(res, "获取验证码")
            if (res.data.code == 0) {

              console.log(res,'generateCode1')
              wx.showToast({

                title: '正在获取验证码',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else {

          self.setData({
            type:2
          })
          let prams2 = {
            mobile: self.data.mobile,
            type: 2
          }
          http.postRequest('/api/store/generateCode', prams2, function (res) {
            console.log(res, "获取验证码")
            if (res.data.code == 0) {

            console.log(res, 'generateCode2')
              wx.showToast({
                title: '正在获取验证码',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }

      })
      // let prams = {
      //   mobile: self.data.mobile,
      //   type: self.data.type
      // }
      // http.postRequest('/api/store/generateCode', prams, function(res) {
      //   console.log(res, "获取验证码")
      //   if (res.data.code == 0) {
      //     wx.showToast({
      //       title: '正在获取验证码',
      //       icon: 'none',
      //       duration: 1500
      //     })
      //   }
      // })
      // wx.request({
      //   url: 'http://192.168.2.98:9098/api/store/generateCode',
      //   method: 'POST',
      //   dataType: 'application/json',
      //   data: {
      //     mobile: self.data.mobile,
      //     type: self.data.type
      //   },
      //   success: res => {
      //     console.log(res, "获取验证码")
      //     if (res.data.code == 0) {
      //       wx.showToast({
      //         title: res.data.msg,
      //         icon: 'none',
      //         duration: 1500
      //       })
      //     }
      //   }
      // })
    }
  },
  // 注册/登陆
  handleRegister(e) {
    let self = this

    if (self.data.type==0) { //true注册  false登陆
      let prams2 = {
        code: self.data.code,
        mobile: self.data.mobile,
        type: 0
      }
      http.postRequest('/api/store/register', prams2, function (res) {
        wx.navigateTo({
          url: '/pages/Branch_Information/Branch_Information?phone=' + self.data.mobile,
        })
      })
    } else {
      let prams1 = {
        code: self.data.code,
        mobile: self.data.mobile,
        type: 2
      }
      http.postRequest('/api/store/login', prams1, function (res) {
        console.log(res, 'login')

        switch (res.data.data.status) {
          case 0:
            wx.navigateTo({
              url: '/pages/audit/audit',
            })
            break;
          case 1:
            wx.setStorageSync('token', res.data.data.token);
            if (wx.getStorageSync('token')) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
            break;
          case 2:
            wx.navigateTo({
              url: '/pages/no/no',
            })
            break;
          case 3:
            wx.navigateTo({
              url: '/pages/Branch_Information/Branch_Information?phone=' + self.data.mobile,
            })
            break;

        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  
})