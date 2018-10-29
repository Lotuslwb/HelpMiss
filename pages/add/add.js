//获取应用实例
const app = getApp();

Page({
  data: {
    id:'',
    categoryIndex: 0,
    categories:[],
    sexArr:[['男','女'],['公','母']],
    nameLabel: ['姓名','名称'],
    uploadImages: [],
    picUrls:[],
    maxImageNum:  9,  
    maxText: 200,
    missAddress: '',
    missAddressText: '',
    missDetailText: '',
    counterColor:{ false:'#b2b2b2', true:'red' },
    curDate:''
  },
  onLoad: function () {
     // 获取走失类型
     if(!app.globalData.helpType.length) {
      app.HttpService.queryHelpType().then(
        res => {
          res.data.forEach( item => {
            app.globalData.helpType[item.value] = item.text; 
          })
          this.setData({
            categories:app.globalData.helpType
          })
        }
      )
    }else{
      this.setData({
        categories:app.globalData.helpType
      })
    }
    //设置当前日期
    this.setData({
      curDate:this.getNowFormatDate()
    })
  },
  onShow: function () {
 
  },
  // 选择分类
  bindCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  onDetailInput(e){
    this.setData({
      missDetailText : e.detail.value,
    })
  },

  // 上传图片
  chooseImage: function (e) {
    var that = this;
    
    if(this.data.uploadImages.length >= this.data.maxImageNum) return;
    app.WxService.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then(function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      that.setData({
        uploadImages: that.data.uploadImages.concat(res.tempFilePaths)
      });
      
      // var fomdata = new FormData()
      app.WxService.uploadFile({
        url: 'https://sg.eldesign.cn/helpmiss/upload',
        filePath: res.tempFilePaths[0],
        name:'file',   
      }).then(
        res => {
          let data = JSON.parse(res.data);
          if(data.success == 0){
            that.setData({
              picUrls: that.data.picUrls.concat(data.data)
            })
          }
        }
      ).catch(
        err => { 
          app.WxService.showModal({
            title:'上传失败',
            content: err.errMsg || '',
            showCancel: false
          });
        }
      )
    }).catch(
      err => { 
        app.WxService.showModal({
          title:'选择图片失败',
          content: err.errMsg || '',
          showCancel: false
        });
      }
    )
  },
  previewImage: function(e) {
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.uploadImages // 需要预览的图片http链接列表
      })
  },
  choosePosition: function() {
    // app.WxService.getSetting().then(
    //   res => {
    //     if(res.authSetting["scope.userLocation"]){
    //     }
    //   }
    // )

    //选择地址
    app.WxService.chooseLocation().then(
      res => {
        res.longitude && res.latitude && res.address && this.setData({
          missAddress: res.longitude + ',' + res.latitude,
          missAddressText : res.address,
          country :  res.address.split('区')[0] + '区' || res.address
        })
      }
    ).catch(
      err => app.WxService.showModal({
        content: err.errMsg || '选择地址失败！',
        showCancel: false
      })
    )
  },
  // 发布
  publish: function(e){
    const { picUrls , missAddress , sexArr , categoryIndex } = this.data
    if(e.detail.value){
      const form = {
          picUrls,
          missAddress,
          ...e.detail.value
      }
      form.missTime = this.data.date && this.data.date + (form.missTime && (' ' + form.missTime) ||'');
      console.log('>>>>>')
      console.log(form)
      console.log('>>>>>')
      // return
      const validators = this.validator();
      //验证必需项是否为空
      if( !this.validateNoEmpty(form , validators)) return;
      if( !this.validatePhone(form.contactTel)){
        app.WxService.showToast({
          title: validators['contactTel'] + '格式错误！',
          icon: 'none',
          duration: 3000
        });
        return;
      }
      var that = this;
      app.WxService.getStorage({key:'openid'})
        .then((res)=>{
          return res.data
        })
        .then((openId) => {
          let data = {
            openId,
            ...form
          }  
     
          app.HttpService.publish(data).then(
            res => {
              console.log(res)
              if(res.success == 0){
                //关闭所有页面，以便跳转后重新加载
                wx.reLaunch({
                  url:'add_success'
                })
              }
            }
          ).catch(err => {          
            app.WxService.showModal({
              title:'发布失败',
              content: err.errMsg || '',
              showCancel: false
            });
          })
        })
      }
    
    
  },
  validator: function() {
    return{
      'missName':'走失对象姓名／名称',
      'missTime' : '走失日期',
      'missDetailText': '详情描述',
      'missAddress' : '具体位置',
      'picUrls' : '图片',
      'contactName' : '联系人',
      'contactTel' : '联系电话',
    }
  },
  validateNoEmpty: function( data, validators ) {
    for(let v in validators){
      if(!data[v] || typeof data[v] == 'string' && data[v].trim() == '' || data[v].length == 0){
        app.WxService.showToast({
          title: v == 'missAddress'?'请获取' + validators[v] : v == 'picUrls'? '请上传图片':
                  '!  请填写' + validators[v],
          icon: 'none',
          duration: 3000
        });
        return false;
      }
    }
    return true;
  },
  validatePhone: function(phone) {  
    let reg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    return reg.test(phone)? true : false;
  },  

  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  onShareAppMessage:function(res) {
    return {
      title: '寻找详情',
      path: '/pages/details/details?id='+this.data.id,
    }
  }
});