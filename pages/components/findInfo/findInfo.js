const app = getApp();
Component({
  data:{
    noData:"未知",
    defaultImg: '/img/default-img.jpeg',
    img:'',
    category:'',
    publishTime:'',
  },
  properties: {
    info:       Object,
    infoId:     String,
    helpType:   String,
   

  },

  ready:function(){
    // console.log('>>>>')
    // console.log(this.data)
    // console.log('>>>>')

    const { createTime , picUrls , helpType } = this.data.info
    let formateTime = this.formatMsgTime(parseInt(createTime))
    
    let imgStr = picUrls && picUrls.length!=0 && picUrls[0] ||'';

    this.setData({
      publishTime: formateTime,
      img:  imgStr.split(',')[0] ||''
    })
 
    if(helpType){
      this.setData({
        category: app.globalData.helpType[helpType] || ''
      })
    }
  },
  methods: {
  //   formatDateTime: function(inputTime) {
  //     var date = new Date(inputTime);
  //     var y = date.getFullYear();  
  //     var m = date.getMonth() + 1;  
  //     m = m < 10 ? ('0' + m) : m;  
  //     var d = date.getDate();  
  //     d = d < 10 ? ('0' + d) : d;  
  //     var h = date.getHours();
  //     h = h < 10 ? ('0' + h) : h;
  //     var minute = date.getMinutes();
  //     var second = date.getSeconds();
  //     minute = minute < 10 ? ('0' + minute) : minute;  
  //     second = second < 10 ? ('0' + second) : second; 
  //     return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
  //   },  
    /*
     * 将时间戳转化为 “几周前” 的形式
     */
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

    clickInfo() {

      app.globalData.lostInfo = this.data.info
      wx.navigateTo({
        url:'/pages/detail/detail?id='+ this.data.info._id
      })
      
      
    }
  }
});