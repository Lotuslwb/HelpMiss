//获取应用实例
const app = getApp();
import moment from '../../../js/moment.min.js'



Component({
  data: {
    infos:[],
    title:['紧急寻找', '我的发布'],
    selectedType:'全部',
    filterInfos:[],
    loaded:false,
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
          if(res.data && res.data.length){
            res.data.forEach((item)=>{
                let originArr = item.picUrls.concat()
                let picStr = originArr && originArr.length && originArr[0];
                item.picUrls = picStr && picStr.split(',')
                item.publishTime = moment(parseInt(item.createTime)).fromNow()
            })
            // console.log(res.data)
            this.setData({
              infos: res.data,
              filterInfos: res.data,
              loaded: true,
            })
          }
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
  },
});