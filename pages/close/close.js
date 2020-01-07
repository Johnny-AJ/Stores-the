// pages/demo6/demo6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false //默认闭合
  },
  toggle(e) { //图片点击事件
    console.log(e)
    // this.isshow =!this.isshow; 
    this.setData({
      isshow: !this.data.isshow
    })
    // this.$apply();
    console.log(this.data.isshow)
  }
})