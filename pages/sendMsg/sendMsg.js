const app = getApp();

Page({
    data:{
        countryCodes: ["+86", "+80", "+84", "+87"],
        countryCodeIndex: 0,
        initCount:0,
        maxCount:120,
        countColor:"#b2b2b2",
        initData:"",
        phoneNumber:"",
        openid:""
    },
    bindCountryCodeChange: function(e){
        console.log('picker country code 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    getResult:function(){
        console.log("确认",this.data.openid)

        if(this.checkPhone(this.data.phoneNumber) && this.checkData(this.data.initData)){
            app.HttpService.createSMS({
                openId:this.data.openid,
                tel:this.data.phoneNumber,
                text:this.data.initData
            }).then(res =>{
                console.log('creat-res------->',res)
                if(res.code == 200){
                    wx.navigateTo({
                        url:"/pages/result/result_success"
                      })
                }
            }).catch(err =>{
                console.log(err);
                const errMsg = err.data.message;
                wx.showToast({
                    icon:'none',
                    title: errMsg,
                    duration: 3000
                });
            })
        }else{
            if(!this.checkPhone(this.data.phoneNumber)){
                wx.showToast({
                    icon:'none',
                    title: '请输入有效手机号码',
                    duration: 3000
                });
            }
            if(!this.checkData(this.data.initData)){
                wx.showToast({
                    icon:'none',
                    title: '请输入有效文本',
                    duration: 3000
                });
            }
        }
    },
    checkData:function(data){
        if(data && data.length <= 120){
            return true;
        }else{
            return false;
        }
    },
    getPhone:function(e){
        var phone = e.detail.value;
        this.setData({
            phoneNumber:phone
        })
    },
    checkPhone:function(num){
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
         if (!myreg.test(num)) {
            return false;
        } else {
             return true;
         }

    },
    handleMsg:function(e){
        var text = e.detail.value;
        console.log('text',text.length);
        this.setData({
            initData:text,
            initCount:text.length
        })
        if(text.length > 120){
            this.setData({
                countColor:"#FF0000"
            })
        }else{
            this.setData({
                countColor:"#b2b2b2"
            })
        }
        
    },
    
    onLoad: function(options){
        this.setData({
          openid: wx.getStorageSync('openid'),
        })
    },
    onShow: function () {
        this.setData({
          initData:""
        })
      },
      onShareAppMessage:function(res){
        return {
          title: '偷偷告诉你 say something',
          path: '/pages/index/index'
        }
      }

})