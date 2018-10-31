//home.js
//获取应用实例
const app = getApp();

Component({
  data: {
    infos:[],
    title:['紧急寻找', '我的发布'],
    selectedType:'全部',
    filterInfos:[]
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

          res.data.forEach((item)=>{
              let originArr = item.picUrls.concat()
              let picStr = originArr && originArr.length && originArr[0];
              item.picUrls = picStr && picStr.split(',')
              item.publishTime = this.formatMsgTime(parseInt(item.createTime))
          })
          // console.log(res.data)
          this.setData({
            infos: res.data,
            filterInfos: res.data
          })
          // // 保存数据
          // res.data.forEach(info => {
          //   app.globalData.lostInfos[info._id] = info
          // });
        }
      ) 
    },
    selectType(){
      var itemList = ['全部', ...app.globalData.helpType];
      app.WxService.showActionSheet({
        itemList: itemList
      }).then((res) => {
          if (!res.cancel) {
            this.setData({
              selectedType: itemList[res.tapIndex],
            })
            if(res.tapIndex){
              let tmp = this.data.infos.filter((item) => {
                  // console.log(item.helpType )
                  // console.log(item.helpType && item.helpType == res.tapIndex -1 )
                return (item.helpType === (res.tapIndex -1)+'' )
              })
              this.setData({
                filterInfos: tmp,
              })
              // console.log(tmp)
            }else{
              //全部
              this.setData({
                filterInfos: this.data.infos,
              })
            }
          }
        })
    },
    formatMsgTime (stamptime) {
      var current_time = + new Date();
      var diff = (current_time - stamptime)/1000;
      
      var agoAt = '刚刚';
      var timePoints = [
          { value: 60 * 60 * 24 * 365, suffix: '年前', max: 2 },
          { value: 60 * 60 * 24 * 30,  suffix: '月前', max: 11 },
          { value: 60 * 60 * 24 * 7,   suffix: '周前', max: 4 },
          { value: 60 * 60 * 24,       suffix: '天前', max: 6 },
          { value: 60 * 60,            suffix: '小时前', max: 23 },
          { value: 60 * 1,            suffix: '分钟前',  max: 59 }
      ];

      for (var i = 0; i < timePoints.length; i++) {
        var point = timePoints[i];
        var mode = Math.floor(diff / point.value);
        if (mode >= 1) {
            agoAt = Math.min(mode, point.max) + point.suffix;
            break;
        }
      }
      return agoAt;
    },
  },
 
});