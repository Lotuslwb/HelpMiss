const app = getApp();


Page({

    backTo:function(){
        wx.navigateTo({
            url:"/pages/index/index"
          })
    },
    onShareAppMessage:function(res){
        return {
          title: '偷偷告诉你 say something',
          path: '/pages/index/index'
        }
      }

});