
//获取应用实例
const app = getApp();

Page({
  data: {
    queryType: 1 ,
  },
  onLoad: function () {
    
  },
  onShow: function () {
 
  },
  
  onShareAppMessage:function(res){
    return {
      title: '我的发布',
      path: '/pages/mypublish/mypublish/?id=' + this.data.id
    }
  }
});