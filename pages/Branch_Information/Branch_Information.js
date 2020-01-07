// pages/Branch_Information/Branch_Information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeName: '', //门店
    linkman: '', //联系人
    phone: '', //联系号码
    addre: '', //地址
    photo: '', //上传资质
    province: '', //省
    city: '', //市
    region: "", //区

    uploaderList: [], //图片列表
    uploaderNum: 0, //图片数量
    showUpload: true, //超过图片数量  默认9张
  },
  // 门店名称
  handleDoor(e) {
    // console.log(e, "门店")
    let self = this
    self.setData({
      storeName: e.detail.value
    })
    console.log(self.data.storeName, "storeName")
  },
  // 联系人
  handleUsername(e) {
    // console.log(e, "门店")
    let self = this
    self.setData({
      linkman: e.detail.value
    })
    console.log(self.data.linkman, "linkman")

  },
  // 省/市/区
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    var self = this;
    self.setData({
      province: e.detail.value, //省
      city: e.detail.value, //市
      region: e.detail.value //区  
    })
    console.log(self.data.province, "province")
    console.log(self.data.city, "city")
    console.log(self.data.region, "region")
  },
  // 详细地址
  handleAddress(e) {
    // console.log(e, "门店")
    let self = this
    self.setData({
      address: e.detail.value
    })
    console.log(self.data.address, "address")
  },
  // 提交
  handleTabs(e) {
    // console.log(e, '提交')
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9098/api/store/info/save', //完善用户信息
      method: "POST",
      data: {
        storeName: self.data.storeName,
        linkman: self.data.linkman,
        phone: self.data.phone,
        province: self.data.province[0],
        city: self.data.city[1],
        region: self.data.region[2],
        imgs: self.data.uploaderList,
        address: self.data.address
      },
      success: res => {
        console.log(res, "用户信息")
        if (res.data.code == 0) {
          wx.showToast({
            title: '信息提交中',
            icon: 'none',
            duration: 1500
          })
          wx.navigateTo({
            url: "/pages/audit/audit"
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
  },
  // 删除图片
  clearImg: function(e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function(e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);

        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })

        console.log(that.data.uploaderList, 'uploaderList')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let self = this
    self.setData({
      phone: e.phone
    })
    // console.log(self.data.phone, 'phone')
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