# TalkTo
有些话 我想对你说~~~（这只是项目名）



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