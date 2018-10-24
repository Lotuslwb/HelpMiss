const app = getApp();

Page({
    data:{
        message:""
    },
    switchTo:function(){
        wx.navigateTo({
            url:"/pages/sendMsg/sendMsg"
          })
    },

    onLoad:function(options){
        this.setData({
            message:options.msg
        })
    },
    onShareAppMessage:function(res){
        return {
          title: '偷偷告诉你 say something',
          path: '/pages/index/index'
        }
      }

})