// pages/login/login.js


let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '', //手机号    13189413198  13143698421  17344573220   17817891541
    code: '', //验证码
    type: 0, //验证码类型  0注册,1重置密码,2登录,3解绑手机号,4绑定手机号


    count: 60,
    code: '获取验证码'
  },
  // 手机号
  handNumber(e) {
    let self = this;
    self.setData({
      mobile: e.detail.value
    })
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

    // 手机号码格式验证
    if (!(/^1[3456789]\d{9}$/.test(self.data.mobile))) {
      wx.showToast({
        title: '输入手机号有误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (self.data.code !== '获取验证码') {
      return
    }
    const countDown = setInterval(() => {
      if (self.data.count <= 0) {
        self.setData({
          count: 60,
          code: '获取验证码'
        })
        clearInterval(countDown)
        return
      }
      self.data.count--
        self.setData({
          count: self.data.count,
          code: self.data.count < 10 ? `请等待0${self.data.count}s` : `请等待${self.data.count}s`
        })
    }, 1000);

    if (self.data.mobile) {
      http.getRequest('/api/store/findByPhone', { //get请求
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
          http.postRequest('/api/store/generateCode', prams1, function(res) { //post请求
            console.log(res, "获取验证码")
            if (res.data.code == 0) {
              console.log(res, 'generateCode1')
              wx.showToast({
                title: '正在获取验证码',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else {
          self.setData({
            type: 2
          })
          let prams2 = {
            mobile: self.data.mobile,
            type: 2
          }
          http.postRequest('/api/store/generateCode', prams2, function(res) {
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
    }
  },
  // 注册/登陆
  handleRegister(e) {
    let self = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (self.data.mobile.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (self.data.mobile.length < 11) {
      wx.showToast({
        title: '输入11位手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(self.data.mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'none',
        duration: 1500
      })
    }
    if (self.data.type == 0) { //true注册  false登陆
      let prams2 = {
        code: self.data.code,
        mobile: self.data.mobile,
        type: 0
      }
      http.postRequest('/api/store/register', prams2, function(res) {
        wx.navigateTo({
          url: '/pages/Branch_Information/Branch_Information?phone=' + self.data.mobile, //待完善门店信息
        })
      })
    } else {
      let prams1 = {
        code: self.data.code,
        mobile: self.data.mobile,
        type: 2
      }
      http.postRequest('/api/store/login', prams1, function(res) {
        console.log(res, 'login')
        switch (res.data.data.status) {
          case 0: //待审核
            wx.navigateTo({
              url: '/pages/audit/audit',
            })
            break;
          case 1: //通过审核(保存token字段)
            wx.setStorageSync('token', res.data.data.token);
            if (wx.getStorageSync('token')) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
            break;
          case 2: //审核不通过(展示remake字段)  
            wx.navigateTo({
              url: '/pages/no/no',
            })
            break;
          case 3: //跳转至完善信息页面(保存phone字段)
            wx.navigateTo({
              url: '/pages/Branch_Information/Branch_Information?phone=' + self.data.mobile,
            })
            break;
        }
      })
    }
  }
})