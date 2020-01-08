// pages/Branch_Information/Branch_Information.js

let confing =require('../../utils/config.js');
let http =require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeName: '', //门店
    linkman: '', //联系人
    phone:'', //联系号码
    addre: '', //地址
    photo: '', //上传资质
    province: '', //省
    city: '', //市
    region: "", //区
    pics: [], //本地存储路径
    images: [], //图片列表
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
    let self = this;
    var pics = self.data.pics; //本地图片
    if (pics.length > 0) {
      var imgs = [];
      pics.forEach(i => {
        wx.uploadFile({
          url: confing.domain + '/api/file/save', //上传图片
          filePath: i,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            imgs.push(JSON.parse(res.data).msg)
            self.setData({
              images: imgs
            }, () => {
              self.save()
            })
          }
        })
      })
    } else {
      self.save1()
    }
   
  },
  chooseImg: function (e) { //上传图片
    var that = this,
      pics = this.data.pics;

    if (pics.length < 9) {
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }

          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },
  deleteImg: function (e) {
    var that = this;
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    console.log(pics)
    this.setData({
      pics: pics,
    })
  },

  save(){

    console.log('save')
    var self =this;
  let prams={
    storeName: self.data.storeName,
    linkman: self.data.linkman,
    phone: self.data.phone,
    province: self.data.province[0],
    city: self.data.city[1],
    region: self.data.region[2],
    imgs: self.data.uploaderList,
    address: self.data.address
  }
    http.postRequest('/api/store/info/save',prams,function(res){
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
    })
  },
  save1() {
    console.log('save1')
    var self = this;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let self = this
    self.setData({
      phone: e.phone
    })

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


})