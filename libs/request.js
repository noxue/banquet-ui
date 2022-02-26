const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
const deleteCustomArg = Symbol('deleteCustomArg')

class request {
	constructor(config, custom) {
		const defaultHttpHeader = {
			'content-type': 'application/json'
		}
		const defaultConfig = {
			baseURL: '',
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			timeout: 30000
		}
		config.header = Object.assign({}, defaultHttpHeader, config.header || {})
		this.config = Object.assign({}, defaultConfig, config || {})
		this.custom = custom || []
	}

	interceptors = {
		request: callback => {
			if (callback) request[requestBefore] = callback
		},
		response: callback => {
			if (callback) request[requestAfter] = callback
		}
	}

	static[requestBefore] = config => config

	static[requestAfter] = response => response

	static[isCompleteURL] = url => /https?:\/\/([\w.]+\/?)\S*/.test(url)

	static[deleteCustomArg] = options => {
		if (this.custom && this.custom.length > 0) {
			this.custom.forEach(argKey => {
				if (options[argKey]) delete options[argKey]
			})
		}
		return options
	}

	request = (options = {}) => {
		// 与请求前config进行合并
		let reqItemOptions = request[deleteCustomArg](Object.assign({}, this.config, options))
		reqItemOptions.url = request[isCompleteURL](reqItemOptions.url) ?
			reqItemOptions.url :
			(reqItemOptions.baseURL + reqItemOptions.url)
		reqItemOptions = request[requestBefore](reqItemOptions)
		// 开始处理请求
		return new Promise((resolve, reject) => {
			reqItemOptions.success = res => {
				const dealRequestAfter = request[requestAfter]({
					config: options,
					response: res
				})
				resolve(dealRequestAfter)
			}
			reqItemOptions.fail = err => {
				const dealRequestAfter = request[requestAfter]({
					config: options,
					response: err
				})
				reject(dealRequestAfter)
			}
			if (reqItemOptions.fileType && reqItemOptions.keyName) {
				// 上传文件
				uni.uploadFile({
					url: reqItemOptions.url,
					fileType: reqItemOptions.fileType,
					filePath: reqItemOptions.data,
					name: reqItemOptions.keyName,
					success: res => {
						res.data = JSON.parse(res.data)
						reqItemOptions.success(res)
					},
					fail: reqItemOptions.fail
				})
			} else {
				// 请求接口
				uni.request(reqItemOptions)
			}
		})
	}
}

export default request
