//获取应用实例
const app = getApp();

Page({
    returnPublish: function(){
        wx.switchTab({
            url:'add'
        })
    },
    returnHome: function(){
        wx.switchTab({
            url:'/pages/home/home'
        })
    }
});