//app.js
import WxValidate from './plugins/wx-validate/WxValidate'
import WxService from './plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'

App({
  onLaunch() {
    this.login();
  },
  onShow() {
    console.log('ApponShow');
  },
  onHide() {

  },
  login() {
    return this.WxService.login()
      .then(data => {
        return this.HttpService.onLogin({
          code: data.code
        })
      }).then(res => {
        var openid = res.data.openid;
        return this.WxService.setStorage({
          key: "openid",
          data: openid
        }).then((res) => {
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(openid)
          }
          return openid;
        })
      });
  },
  globalData: {
    userInfo: null,
  },
  renderImage(path) {
    if (!path) return ''
    if (path.indexOf('http') !== -1) return path
    return `${this.__config.domain}${path}`
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config,
})