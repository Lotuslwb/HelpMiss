import moment from '../../js/moment.min';

var wxCharts = require('../../js/wxcharts-min');
var app = getApp();
var lineChartCnt = null;
var lineChartMoney = null;
Page({
  data: {
    showList: {
      store: true,
      jigui: true,
      time: true,
      orderStatus: false,
      orderFilter: false
    },
    start: moment().subtract(2, 'days').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  },
  touchHandler: function(e) {
    var type = e.target.dataset.type;
    var lineChart = null;
    if (type === 'cnt') {
      lineChart = lineChartCnt;
    } else {
      lineChart = lineChartMoney;
    }
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data;
      }
    });
  },
  createSimulationData: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < 7; i++) {
      categories.push('2018-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    return {
      categories: categories,
      data: data
    };
  },
  onLoad: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    app.HttpService.getOrderChart({
      startdate: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      enddate: moment().format('YYYY-MM-DD')
    }).then(data => {
      var result = this._formartData(data.data);
      if (result) {
        var seriesCnt = [
          {
            name: '订单数量',
            data: result.cntList,
            format: function(val, name) {
              return val + '笔';
            }
          }
        ];
        var seriesMoney = [
          {
            name: '订单金额',
            data: result.moneyList,
            format: function(val, name) {
              return val + '元';
            }
          }
        ];
        lineChartCnt = new wxCharts({
          canvasId: 'lineCanvasCnt',
          type: 'line',
          categories: result.date,
          animation: true,
          background: '#fff',
          series: seriesCnt,
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            title: '订单数量 (笔)',
            format: function(val) {
              return val;
            },
            min: 0
          },
          width: windowWidth,
          height: 200,
          dataLabel: false,
          dataPointShape: true,
          extra: {
            lineStyle: 'curve'
          }
        });

        lineChartMoney = new wxCharts({
          canvasId: 'lineCanvasMoney',
          type: 'line',
          categories: result.date,
          animation: true,
          background: '#fff',
          series: seriesMoney,
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            title: '收入金额 (元)',
            format: function(val) {
              return val;
            },
            min: 0
          },
          width: windowWidth,
          height: 200,
          dataLabel: false,
          dataPointShape: true,
          extra: {
            lineStyle: 'curve'
          }
        });
      }
    });
  },
  submitHandle: function(e) {
    // 搜索条件
    console.log(e.detail);
    app.HttpService.getOrderChart(e.detail).then(data => {
      var result = this._formartData(data.data);
      if (result) {
        var seriesCnt = [
          {
            name: '订单数量',
            data: result.cntList,
            format: function(val, name) {
              return val + '笔';
            }
          }
        ];
        var seriesMoney = [
          {
            name: '订单金额',
            data: result.moneyList,
            format: function(val, name) {
              return val + '元';
            }
          }
        ];
        lineChartCnt.updateData({
          categories: result.date,
          series: seriesCnt
        });
        lineChartMoney.updateData({
          categories: result.date,
          series: seriesMoney
        });
      }
    });
  },
  _formartData(data) {
    if (data) {
      var date = [];
      var cntList = [];
      var moneyList = [];
      var cnt = data.orderNumer;
      var money = data.orderMoney;
      cnt.map(item => {
        date.push(item.date);
        // cntList.push(parseInt(item.order_num));
        cntList.push(item.order_num);
      });
      money.map(item => {
        // moneyList.push(parseFloat(item.pay_price));
        moneyList.push(item.pay_price);
      });
      return {
        date,
        cntList,
        moneyList
      };
    }
    return null;
  }
});
