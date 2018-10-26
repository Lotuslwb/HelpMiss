const app = getApp();
Component({
  data:{
    noData:"未知",
    category:'',
  },
  properties: {
    infoId:     String,
    title:      String,
    publisher:  String,
    publishTime:String,
    imagePath:  String,
    preview:    String,
    phone:      String,
    //
    helpType:   String,
    address:    String,

  },

  ready:function(){
    console.log('>>>>')
    console.log(this.data)
    console.log('>>>>')

    let formateTime = this.formatDateTime(parseInt(this.data.publishTime))
    this.setData({
      publishTime: formateTime,
      imagePath: this.data.imagePath.split(',')[0]
    })
 
    if(this.data.helpType){
      this.setData({
        category: app.globalData.helpType[this.data.helpType]
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
  }
});