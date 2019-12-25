// pages/underline_copy/underline_copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["展品报修", "体验装申领", "专柜申请"],
    currentIndex: 0,
    texts: "已输入0/300",
    min: 300, //最少字数
    max: 520, //最多字数
    currentWordNumber: 0
  },
  changTab(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
    })
  },
  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // console.log(len)
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "至少还需要",
        textss: "字",
        num: this.data.min - len
      })
    else if (len > this.data.min)
      this.setData({
        texts: "",
        textss: "",
        num: ''
      })

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

    // console.log(this.data)
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