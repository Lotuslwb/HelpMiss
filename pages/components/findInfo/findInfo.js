const app = getApp();
Component({
  data:{
    noData:"未知",
    defaultImg: '/img/default-img.jpeg',
    category:'',
    publishTime:'',
    categories:[]
  },
  properties: {
    info:       Object,
    infoId:     String,
    helpType:   String,
   

  },
  attached: function(){
    this.setData({
      categories: app.globalData.helpType
    })
    
  },

  ready:function(){
    // console.log('>>>>')
    // console.log(this.data)
    // console.log('>>>>')

  },
  methods: {  
    clickInfo() {

      app.globalData.lostInfo = this.data.info
      wx.navigateTo({
        url:'/pages/detail/detail?id='+ this.data.info._id
      })
      
      
    }
  }
});