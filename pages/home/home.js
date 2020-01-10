// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false, //默认闭合
    result: '' //扫码内容
  },

  toggle(e) { //图片点击事件
    this.setData({
      isshow: !this.data.isshow
    })
  },
  handleSao: function(e) { //扫一扫
    var _this = this;
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        let code = result.match(/slm(\S*)/)[1];
        let coding = code.split('/')[1]
        console.log(coding, 'coding')
        if (coding) {
          wx.navigateTo({
            url: '/pages/merchandise/merchandise?coding=' + coding
          })
        } else {
          $Toast({
            content: '商品已经不存在！',
            icon: 'prompt',
            duration: 0,
            mask: false
          });
          setTimeout(() => {
            $Toast.hide();
          }, 5000);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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





  handurl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
})