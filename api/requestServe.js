import {
	toPageUserLoginTimer,
	toPageUserRegisterTimer
} from '@/libs/router.js'
import userServe from '@/libs/userServe.js'

/**
 * 在wx.request封装的配置层
 * 本接口处于半封装状态
 * TODO 未将wx.request功能未全部重写，所有特殊对应原时候再继续加
 * TODO 增加上传文件类型
 * @param data
 * @returns {*}
 */
class requestServe {

	/**
	 * 初始化配置
	 * @param {*} data 
	 */
	constructor(data) {
		this.defaultConfig = {
			apiType: 'default', //默认参数类型
			method: 'GET', //默认请求类型
			data: {}, //数据为空
			header: {}, // 请求头配置
			isProcessReturnData: false, // 不做任何处理的接口配置
			clickDelay: true, //开启点击延迟
			showLoading: true, //发送请求是否显示loading true/false
			showLoadingMessage: '正在请求...', //发送请求时显示的文本框
			showSuccessLoading: false, // 显示完成消息
			showSuccessLoadingMessage: '', // 
			showErrorLoading: true, //开启
			showErrorLoadingMessage: ''
		}

		// TODO 这项没有完成
		this.errorUrl = ''; // 接口出现错误用来报警的api,正常来说后台应该自己有的，主要用来前期测试交流开发减少沟通

		/**
		 * 返回数据处理配置
		 */
		this.returnCofig = {
			codeField: 'code', // 状态码
			dataField: 'data', // 数据存储
			msgField: 'msg' // 提示消息信息
		}
		this.codeSuccess = 0 // 正确判断条件
		this.codeError = 300 // 普通错误提示
		this.codeFunList = {} // 特殊拦截判断
		this.codeFunListSet()

		// 防抖缓存
		this.shakeCacheTimer = 1000 // 1秒最多提交一次接口
		this.shakeCache = {}

		// lading计算器,
		this.showLoadingNum = 0
	}

	/**
	 * [封装方法] 配置token
	 */
	tokenCheck(config) {
		let token;
		if (config.apiType == 'user') { //需要用户登录
			this.log(config.log + '[执行用户强制登录检测]');

			if (userServe.checkUserLogin(true) === false) return false
		} else if (config.apiType == 'notUser') { // 强制不使用token
			return true
		} else if (config.apiType == 'default') {

		} else {
			this.errorAlert(config.log + 'apiType类型,暂不支持');
			return false;
		}

		config.header['Authorization'] = 'Bearer ' + userServe.getUserToken()
		return true
	}

	/**
	 * [封装方法] 通用异常code判断
	 */
	codeFunListSet(code, fun) {
		let _this = this;

		const codeList = {
			[_this.codeSuccess]: function(config, data, code, msg) {
				console.log('完成', config)
				// msg ? msg : config.showSuccessLoadingMessage
				if (config.showSuccessLoading == true) _this.alert(config.showSuccessLoadingMessage);
				if (typeof config.success === 'function') config.success(data)

				return false
			},
			[_this.codeError]: function(config, data, code, msg) {
				_this.alert(msg)

				return false
			},
			'400': toPageUserLoginTimer,
			"401": toPageUserLoginTimer
		}

		this.codeFunList = codeList
	}

	/**
	 * 请求数据
	 */
	request(setConfig) {
		setConfig['log'] = '【' + new Date().getDate() + '】-【api接口url】【' + setConfig.api + '】-->'; // log日志输出

		//默认配置合并,最终api配置: 默认配置 -> api列表配置 -> 独立配置
		console.log('请求配置', setConfig)
		var config = Object.assign({}, this.defaultConfig, setConfig);
		this.log('[api配置]', config)

		if (this.shakeCheck(config) === false) return false // 防抖限制
		if (this.tokenCheck(config) === false) return false // 配置token
		this.showLoading(config); // 执行lading函数

		// 请求参数过滤
		this.requestParamsFiltering(config)

		// [parameter传参]: 配置请求来源
		if (config.source) data['source'] = config.source;

		let success = this.success(config)
		let fail = this.fail(config)

		// 请示数据
		var cache = wx.request({
			url: config.url,
			method: config.method,
			data: config.data,
			dataType: 'json',
			header: config.header,
			success: success,
			fail: fail,
			complete: res => {
				// _this.hideLoading();
			}
		})

		// 用于数据请求中断,需要这种的话
		return cache;
	}


	// 请求后拦截
	success(config) {
		let _this = this;

		return function(res) {
      // 不需要对返回数据做出反应
			if (config.isProcessReturnData === true) return true;
      
			_this.log(config.log + '[success数据]:', res);

			_this.hideLoading(config);

			// html异常错误,不等于200走不到该程序内
			if (res.statusCode !== 200) {
				_this.alert('网络延迟,请稍后重试');
				_this.errorLog(res)
				return false
			}

			//接口参数判断
			var content = res.data;
			var code = content[_this.returnCofig.codeField]; // 标识code
			var data = content[_this.returnCofig.dataField] ? content[_this.returnCofig.dataField] : {}; // 核心数据
			var msg = content[_this.returnCofig.msgField] ? content[_this.returnCofig.msgField] : ''; // 返回消息

			// 没有正常的标识,后期写接口访问日志
			if (code === '' || isNaN(code)) {
				_this.log(log + '[success][code]', code);
				_this.errorLog(res);
				_this.alert('接口异常,请联系我们');
				return false;
			}

			// 通用处理,返回false的就不会再继续往下走
			if (_this.codeFunList[code] && typeof _this.codeFunList[code] ===
				'function') {
				let check = _this.codeFunList[code](config, data, code, msg);
				if (check === false) return false
			}

			if (code || code === 0 || code === '0') { // 其他类型,进入codeError
				if (config.showErrorLoading) _this.alert(msg ? msg : config.showErrorLoadingMessage);
				if (typeof config.codeError === 'function') config.codeError(content, res); // 进入codeError函数
			} else {
				_this.errorLog('request->success', res)
				_this.alert('接口错误,未返回正确的标识,请联系我们');
			}
		}
	}

	// 接口异常使用
	fail(config) {
		let _this = this;

		return function(res) {
			_this.hideLoading(config);

			wx.showModal({
				title: '消息',
				content: '服务器未返回正确数据,请尝试重新请求~',
				showCancel: false,
			})

			if (typeof config.fail === 'function') config.fail(res)
		}
	}

	/**
	 * 显示loading
	 * @param {Object} config
	 */
	showLoading(config) {
		if (config.showLoading === true) {
			if (this.showLoadingNum <= 0) {
				this.showLoadingNum++
				if (this.showLoadingNum > 0) {
					uni.showLoading({
						mask: true,
						title: config.showLoadingMessage
					})
				}
			}
		}
	}

	/**
	 * 隐藏loading
	 */
	hideLoading(config) {
		if (config.showLoading === true) {
			this.showLoadingNum--
			if (this.showLoadingNum <= 0) {
				uni.hideLoading();
			}
		}
	}

	/**
	 * 防抖处理
	 * 通用防抖处理，任何事件都不准许多次点击提交, 一个接口1秒只能提交一次
	 */
	shakeCheck(config) {
		if (config.clickDelay == true) {
			let apiName = config['api'];
			let newTime = new Date().getTime()
			if (this.shakeCache[apiName] && this.shakeCache[apiName].time - newTime > this.shakeCacheTimer) {
				this.log(config.log + apiName + ':接口延迟点击中..........拒绝本次请求');
				return false
			} else {
				this.log(config.log + apiName + ':请求通过,更新延迟时间');
				this.shakeCache[apiName] = newTime
				return true
			}
		} else {
			return true
		}
	}

	// 请求参数过滤
	// [parameter传参]参数剔空,去空格 TODO 无法检测多维数组,需要重构,这里应该与上面进行合并
	requestParamsFiltering(config) {
		// [apiType检测]某种类型下携带某些参数
		let params = config.data

		this.log(config.log + '[參數过滤前]', params);
		for (var i in params) {
			// 如果是字符串,两边去空
			if (typeof params[i] == 'string') params[i] = params[i].trim();

			// 值为null时 TODO 没有增加类型判断
			if (params[i] === null) params[i] = '';

			// 防止异常提交，后台会认为 undefined 是字符串,TODO 没有增加类型判断
			if (typeof params[i] === undefined || params[i] === undefined) params[i] = '';
		}

		this.log(config.log + '[參數过滤后]', params);
		return params
	}

	/**
	 * 输出错误信息
	 * @param {Object} content
	 */
	errorAlert(content) {
		wx.showModal({
			title: '提示',
			content: content,
			showCancel: false,
		})

		return true;
	}

	// 错误提交
	errorLog(content) {
		if (this.errorUrl) {
			// TODO 后期写接口访问日志
		}
	}

	// 错误提示
	alert(content) {
		console.log('弹出消息', content)
		if (!content) return false;

		var time = content.length / 4 * 1000;
		if (time < 2000) time = 2000;
		wx.showToast({
			title: content,
			icon: 'none',
			duration: time
		})
	}


	// 普通日志输出
	consoleLog(msg) {
		var time = new Date().getDate(); //获取时间参数
		var log = '【' + time + '】-【api接口url】【' + this.api + '】-->';

		console.log(log + msg)
	}

	// 输出logo模式
	log(title, content) {
		console.log(title, content);
	}
}

export default requestServe
