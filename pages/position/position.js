
//获取应用实例
const app = getApp();

Page({

  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      title: '走失位置',
      callout:{
        content: '走失位置',
        fontSize: '12px',
        padding: '10rpx',
      },
    }],
    enable3d: false,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
  },
  onLoad: function (options) {
    // console.log('i>>>>'+ options.address)
    var address = options.address.split(',')
    // console.log(address)
    // console.log(address[0].slice(1))
    // console.log(address[1].slice(0,address[1].length-1))
    this.setData({
      longitude: parseInt(address[0]),
      latitude: parseInt(address[1])
    })
    // latitude
  },
  toggle3d() {
    this.setData({
      enable3d: !this.data.enable3d
    })
  },
  toggleShowCompass() {
    this.setData({
      showCompass: !this.data.showCompass
    })
  },
  toggleOverlooking() {
    this.setData({
      enableOverlooking: !this.data.enableOverlooking
    })
  },
  toggleZoom() {
    this.setData({
      enableZoom: !this.data.enableZoom
    })
  },
  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll
    })
  },
  toggleRotate() {
    this.setData({
      enableRotate: !this.data.enableRotate
    })
  },
  togglePolygon() {
    this.setData({
      drawPolygon: !this.data.drawPolygon
    })
  }
})
