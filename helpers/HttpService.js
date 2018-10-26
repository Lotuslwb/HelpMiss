import WxRequest from '../plugins/wx-request/lib/index'

class HttpService extends WxRequest {
	constructor(options) {
		super(options)
		this.$$prefix = ''
		this.$$path = {
			onLogin: '/helpmiss/onLogin',
			publish: '/helpmiss/createHelp',
			queryHelpList: '/helpmiss/queryHelpList',
			queryHelpType: '/helpmiss/queryHelpType',
			upload: '/helpmiss/upload',
		}
		this.interceptors.use({
			request(request) {
				request.header = request.header || {}
				request.header['content-type'] = 'application/x-www-form-urlencoded'
				const access_token = wx.getStorageSync('access_token');
				request.data = Object.assign({
					access_token: access_token,
				}, request.data)

				wx.showLoading({
					title: '加载中',
				})
				return request;
			},
			requestError(requestError) {
				wx.hideLoading()
				return Promise.reject(requestError)
			},
			response(response) {
				console.log(response);
				wx.hideLoading()
				// if(response.statusCode === 401) {
				//       wx.removeStorageSync('token')
				//       wx.redirectTo({
				//           url: '/pages/login/index'
				//       })
				//   }
				if (response.data.code != 200) {
					const msg = response.data.msg;
					if (msg) {
						wx.showToast({
							title: msg,
							icon: 'none',
							duration: 1000
						})
					}
					return Promise.reject(response)
				} else {
					return response.data
				}
			},
			responseError(responseError) {
				wx.hideLoading()
				return Promise.reject(responseError)
			},
		})
	}

	// 登录
	onLogin(params) {
		return this.postRequest(this.$$path.onLogin, {
			data: params,
		})
	}
	// 发布走失信息
	publish(params){
		return this.postRequest(this.$$path.publish, {
			data: params,
		})
	}
	// 查询走失信息
	queryHelpList(params){
		return this.postRequest(this.$$path.queryHelpList, {
			data: params,
		})
	}
	// 查询分类目录
	queryHelpType(){
		return this.getRequest(this.$$path.queryHelpType)
	}
	// 上传图片
	upload(){
		return this.postRequest(this.$$path.upload, {
			data: params,
		})
	}

}

export default HttpService