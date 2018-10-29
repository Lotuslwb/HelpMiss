const app = getApp();
Component({
  data:{
    noData:"未知",
    defaultImg: '/img/icon-myinfo.png',
    img:'',
    category:'',
    publishTime:'',
  },
  properties: {
    info:       Object,
    infoId:     String,
   
  
    //
    helpType:   String,
    address:    String,

  },

  ready:function(){
    // console.log('>>>>')
    // console.log(this.data)
    // console.log('>>>>')

    const { createTime , picUrls , helpType } = this.data.info
    let formateTime = this.formatDateTime(parseInt(createTime))
    
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
    formatDateTime: function(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? ('0' + m) : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;  
      second = second < 10 ? ('0' + second) : second; 
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    },

    clickInfo() {

      app.globalData.lostInfo = this.data.info
      wx.navigateTo({
        url:'/pages/detail/detail?id='+ this.data.info._id
      })
      
      
    }
  }
});