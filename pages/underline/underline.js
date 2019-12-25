// pages/underline/underline.js
// pages/demo8/demo8.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["展品报修", "体验装申领", "专柜申请"],
    currentIndex: 0
  },
  changTab(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
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
    // 1: 创建动画实例animation:
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function() {
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.translateX(4).step();
        animation.rotate(19).step()
        next = !next;
      } else {
        animation.translateX(-4).step();
        animation.rotate(-19).step()
        next = !next;
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 300)
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