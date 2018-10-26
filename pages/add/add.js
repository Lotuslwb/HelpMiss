//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    id:'',
    categoryIndex: 0,
    categories:['寻人','寻宠物'],
    uploadImages: [],
    maxImageNum:  9,   
  },
  onLoad: function () {

  },
  onShow: function () {
 
  },
  // 选择分类
  bindCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  // 上传图片
  chooseImage: function (e) {
    var that = this;
    app.WxService.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then(function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      that.setData({
        uploadImages: that.data.uploadImages.concat(res.tempFilePaths)
      });
  })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.uploadImages // 需要预览的图片http链接列表
      })
  },
  // 发布
  publish: function(){
    console.log('发布')
  },
  onShareAppMessage:function(res){
    return {
      title: '寻找详情',
      path: '/pages/details/details?id='+this.data.id,
    }
  }
});