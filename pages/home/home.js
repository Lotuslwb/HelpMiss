//home.js
//获取应用实例
const app = getApp();

Page({
  data: {
    queryType: 0 ,
  },
  onLoad: function () {

  },
  onShow: function () {
 
  },

  onShareAppMessage:function(res){
    return {
      title: '首页',
      path: '/pages/home/home'
    }
  }
});