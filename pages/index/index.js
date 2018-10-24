//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    msgCode:"",
    openid:""

  },
  sendTo:function(){
    var openid = this.data.openid
    wx.navigateTo({
      url:"/pages/sendMsg/sendMsg?openid=" + openid
    })
  },
  handleMsgCode:function(e){
   // console.log('input------>',e);
   var value = e.detail.value;
    if(value.length && value.length == 6){
      console.log('send!!',this.data.openid)
      app.HttpService.querySMS({
        openId: wx.getStorageSync('openid'),
        code:value
      }).then(res =>{
        console.log('res------->',res)
        if(res.code == 200 && res.data.length>0){
          const msg = res.data[0].text;
          console.log('msg------->',msg);
          wx.navigateTo({
            url:"/pages/readMsg/readMsg?msg=" + msg
          })
        }  
      }).catch(err =>{
        console.log(err)
        const errMsg = err.data.message;
        wx.showToast({
          icon:'none',
          title: errMsg,
          duration: 3000
      });
      })
    }
  },

  onLoad: function () {

  },
  onShow: function () {
    this.setData({
      msgCode: ''
    })
  },

  onShareAppMessage:function(res){
    return {
      title: '偷偷告诉你 say something',
      path: '/pages/index/index'
    }
  }
});