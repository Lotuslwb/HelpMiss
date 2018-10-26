
//获取应用实例
const app = getApp();

Page({
  data: {
    
  },
  onLoad: function (option) {
    
    this.setData({
      id: option.id||' ',
    })
    //获取寻找信息的id
    var info = this.findInfoById(option.id);
    if(info && typeof info === 'object'){
      // 设置数据
      let picStr = info.picUrls.length && info.picUrls[0];
      info.picUrls = picStr && picStr.split(',')
      console.log(
        info.picUrls
      )
      this.setData(info)
          console.log('>>>>')
          console.log(this.data)
          console.log('>>>>')
    }
  },
  // 从globalData中查询infoId
  findInfoById: function(id) {

    return app.globalData.lostInfos[id]
  },
  onShow: function () {
 
  },
  openMap: function() {
    let address = this.data.missAddress && this.data.missAddress.split(',')
    app.WxService.openLocation({
      longitude: parseFloat(address[0]),
      latitude: parseFloat(address[1]),
    })
  },
  call: function() {
    app.WxService.makePhoneCall({
      phoneNumber: this.data.contactTel 
    })
  },
  onShareAppMessage:function(res){
    return {
      title: '寻找详情',
      path: '/pages/details/details?id='+this.data.id,
    }
  }
});