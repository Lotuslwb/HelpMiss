# MissHelp
帮走失

# 目前遗留问题

- queryHelpList有openId时返回的不对
- 提交表单后重置无效
- 数据存储：queryHelpList返回全部信息，但首页只展示部分，如果不全部存到gloabalData中，怎么在点击时获取当前_id的走失信息？

## 已解决
- 图片大小 aspectFit。
- 电话链接。 
- 校验： require项不为空，描述文字和图片长度。

# 常用

 ` 使用app.WxService 调用原生方法支持promise
 
    app.WxService.navigateTo("/pages/apply/index?type=bus&roleType=1");


    app.WxService.scanCode({
          onlyFromCamera: false,
        }).then(res => {
          console.log(res.result);
          const query = res.result;
          const querylist = decodeURIComponent(query).split('/');
          const cabinet_id = (query && query.length > 0) ? querylist[querylist.length - 1] : 44;
          return app.HttpService.getCabinetcodeByid({
            cabinet_id,
          })
        }).then(data => {
            const cabinet_code = data.data.cabinet_code;
            app.globalData.cabinet_code = cabinet_code;
            this.aferScanCode(cabinet_code);
        }).catch((e) => {
          console.log(e);
          app.WxService.redirectTo("/pages/operator/usercenter/index");
    })

` 使用 app.HttpService 发送请求 进行了一些封装

    app.HttpService.getorderlist(params).then(data => {
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