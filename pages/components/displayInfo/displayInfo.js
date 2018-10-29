//home.js
//获取应用实例
const app = getApp();

Component({
  data: {
    infos:[],
    title:['紧急寻找', '我的发布']
  },
  properties: {
    queryType:     Number,
  },
  ready: function () {

    // 获取走失类型
    if(!app.globalData.helpType.length) {
      app.HttpService.queryHelpType().then(
        res => {
          res.data.forEach( item => {
            app.globalData.helpType[item.value] = item.text; 
          })
        }
      )
    }
    if(this.data.queryType){
      app.WxService.getStorage({key:'openid'})
      .then((res)=>{
        return res.data
      })
      .then((openid) => {
        //获取寻找信息
        var queryConds = {
          counts: 999,
          openId: openid,
        }
        this.queryHelpList(queryConds)
      })
    }else{
      // 获取走失信息
      var queryConds = {
        counts: 999,
      }   
      this.queryHelpList(queryConds) 
    }
  },
  methods:{
    queryHelpList: function(queryConds) {
      app.HttpService.queryHelpList(queryConds).then(
        (res)=>{
          this.setData({
            infos: res.data
          })

          // // 保存数据
          // res.data.forEach(info => {
          //   app.globalData.lostInfos[info._id] = info
          // });
        }
      ) 

    }
  }
  
});