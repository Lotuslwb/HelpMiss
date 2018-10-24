import moment from '../../js/moment.min';
import _ from '../../js/lodash.core';
const app = getApp();

const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    msgboxHidden: true,
    page: 1,
    hasMoreData: true,
    searchData: {},
    showList: {
      'store': true,
      'jigui': true,
      'time': true,
    },
    tabs: [{
      id: "storebox",
      text: '机柜'
    }, {
      id: "time",
      text: '时间'
    }, {
      id: "status",
      text: '订单状态'
    }, {
      id: "order",
      text: '排序'
    }, ],
    multiArray: [
      ['门店1', '门店2'],
      ['机柜1', '机柜2', '机柜3', '机柜4', '机柜5'],
    ],
    multiIndex: [0, 0, 0],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    this.setData({
      pageSize: app.__config.pageSize,
      columns: [{
        text: '订单编号',
        key: 'order_no_format',
        width: '30%'
      }, {
        text: '成交金额',
        key: 'total_price',
        width: '20%'
      }, {
        text: '下单时间',
        key: 'addtime_format',
        width: '40%'
      }],
      action: [{
        text: "详情",
        key: "detail",
        callback: "detailHandle"
      }],
    })
  },
  onShow: function () {
    console.log('onShow');
    this.searchList({
        page: this.data.page
      }).then(data => {
        this.setData({
          currentOrderList: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  },
  searchList: function (params) {
    return app.HttpService.getorderlist(params).then(data => {
      console.log(data);
      var result = data.data.map((item) => {
        item['addtime_format'] = moment(item['addtime'] * 1000).format('YYYY-MM-DD HH:mm:ss');
        item['order_no_format'] = '...' + item['order_no'].slice(item['order_no'].length - 12, item['order_no'].length);
        item['goods_list'].map((it) => {
          it.price = it.good_price;
          return it;
        })
        return item;
      })
      if (result.length < this.data.pageSize) {
        this.setData({
          hasMoreData: false
        });
      }
      return result;
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      // 显示加载图标
      app.WxService.showLoading({
        title: '玩命加载中'
      });
      // 页数+1
      var page = this.data.page + 1;
      this.setData({
        page,
      });
      this.searchList({
        ...this.data.searchData,
        page,
      }).then(data => {
        var newList = _.concat(this.data.currentOrderList, data);
        this.setData({
          currentOrderList: newList
        });
        // 隐藏加载框
        app.WxService.hideLoading();
      });
    } else {
      app.WxService.showToast({
        title: '没有更多数据'
      });
    }
  },
  detailHandle: function (item) {
    console.log(item.detail);
    this.setData({
      msgboxHidden: false,
      currentItem: item.detail
    })
  },
  onReady: function () {
    //获得footer组件
    this.footer = this.selectComponent("#footer");
  },
  changeTab: function (e) {
    this.footer.changeTab();
  },
  okHandle: function (e) {
    console.log(e)
  },
  submitHandle: function (e) {
    // 搜索条件
    console.log(e.detail);
    this.setData({
      searchData: e.detail,
      page: 1,
    })
    this.searchList(e.detail).then(data => {
        this.setData({
          currentOrderList: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
});