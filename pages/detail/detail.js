
//获取应用实例
const app = getApp();

Page({
  data: {
    // createTime: '',
    // missTime: "'2018-09-10'",
    // missName: "'我家狗狗'",
    // missSex: "'母的'",
    // missAddress: "'20.090,90.8989'",
    // missAddressText: "'北京市天安门西边厕所3号坑'",
    // missDetailText: "纯白，呆萌，哈士奇，身高纯白，呆萌，哈士奇，身高89cm1纯白，呆萌，哈士奇，身高89cm1纯白，呆萌，哈士奇，身高89cm1纯白，呆萌，哈士奇，身高89cm1纯白，呆萌，哈士奇，身高89cm1纯白，呆萌，哈士奇，身高89cm1",
    // contactName: "李文彬",
    // contactTel: "18616712907",
    // //mapmark? 
    // picUrls:['/img/a.jpg','/img/b.jpg','/img/a.jpg'],
    // helpType:'',
  },
  onLoad: function (option) {
    //获取寻找信息的id
    this.setData({
      id: option.id||' '
    })
    var info = this.findInfoById(option.id);
    if(info && typeof info === 'object'){
      // 设置数据
      this.setData(info)
          console.log('>>>>')
          console.log(this.data)
          console.log('>>>>')
    }
  },
  // 从globalData中查询infoId
  findInfoById: function(id) {

    return app.globalData.lostInfos[id]
  },
  onShow: function () {
 
  },
  onShareAppMessage:function(res){
    return {
      title: '寻找详情',
      path: '/pages/details/details?id='+this.data.id,
    }
  }
});