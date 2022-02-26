/**
 * 在wx.request封装的配置层
 * 本接口处于半封装状态
 * TODO 未将wx.request功能未全部重写，所有特殊对应原时候再继续加
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
			clickDelay: true, //开启点击延迟
			showLoading: true, //发送请求是否显示loading true/false
			showLoadingMessage: '正在请求...', //发送请求时显示的文本框
			showSuccessLoading: false, //关闭
			showSuccessLoadingMessage: '',
			showErrorLoading: true, //开启
			showErrorLoadingMessage: ''
		}

		this.config = {}

		// TODO 这项没有完成
		this.errorUrl = ''; //接口出现错误用来报警的api,正常来说后台应该自己有的，主要用来前期测试交流开发减少沟通

		// 模拟数据api配置
		this.openMock = false; //开启模拟数据
		this.apiData = {};

		/**
		 * 返回数据修改
		 */
		this.returnCofig = {
			codeField: 'code', //code的字段,code只支付数字,非数字报错
			dataField: 'data', //数据的字段
			msgField: 'msg' //消息的字段
		}

		// 业务错误code处理
		this.codeSuccess = 200
		this.errorCodeFunList = {}

		// 支付列表
		this.getApp = getApp();
	}

	/**
	 * [封装方法] 设置token
	 */
	tokenSet() {

	}

	/**
	 * [封装方法] 通用异常code判断
	 */
	codeError(code, fun) {
		const codeList = {
			// "301": toUserLogin, //去登录
			// "302": toPagesUserRegister, //去注册页面
			// "900": function() { //用户没有权限的请求
			// 	wx.switchTab({
			// 		url: '/' + getApp().constant.pagesList.index
			// 	})
			// }
		}

		this.errorCodeFunList = codeList
	}

	// [未封装方法] 请求成功
	// requestSuccess() {
	// 	//弹出正确消息
	// 	if (this.config.showSuccessLoading == true) {
	// 		alert(this.config.showSuccessLoadingMessage ? this.config.showSuccessLoadingMessage : msg);
	// 	}

	// 	//TODO 增加回调检测,判断data中某些参数必须存在
	// 	if (successFunction) {
	// 		successFunction(data, res)
	// 	}
	// }

	/**
	 * 请求
	 */
	request(setConfig) {
		if (!setConfig) return this.errorAlert(this.api + '[配置错误]未传任何参数~');

		var app = getApp();

		//如果存在api,查找api配置
		if (setConfig.api) {
			var apiConfig = this.getApiConfig(setConfig.api);
			if (!apiConfig) {
				this.errorAlert(log + '[配置错误]' + '未找到有效的api配置');
			}
		} else {
			var apiConfig = {};
		}

		//默认配置合并,最终api配置: 默认配置 -> api列表配置 -> 独立配置
		var config = Object.assign({}, this.defaultConfig, apiConfig, setConfig);
		this.consoleLog('[api配置]', config)

		if (Object.keys(config).length <= 0) return this.errorAlert('[配置错误]无任何api配置~');
		this.consoleLog('[接口名称]', config.name)

		// [操作函数]
		var successFunction = typeof config.success == 'function' ? config.success : ''; // 成功返回
		var codeErrorFunction = typeof config.codeError == 'function' ? config.codeError : ''; // 其他状态判断
		var failFunction = typeof config.fail == 'function' ? config.fail : ''; // 特殊错误, 这个一般外部不再判断，完全由本类判断结果
		var completeFunction = typeof config.complete == 'function' ? config.complete : function(res) {
			console.log(log + '【complete】');
			console.log(res);
		}

		// [各类事件配置]
		var apiType = config['apiType']; //api类型
		var clickDelay = config['clickDelay']; //点击延迟
		var showSuccessLoading = config['showSuccessLoading']; //codeSuccess时 是否弹窗
		var showSuccessLoadingMessage = config['showSuccessLoadingMessage'];
		var showErrorLoading = config['showErrorLoading']; //codeError时 是否弹窗
		var showErrorLoadingMessage = config['showErrorLoadingMessage']; //codeError时 是否弹窗
		var showLoading = config['showLoading']; //是否显示loading
		var data = config.data ? config.data : {};

		this.checkBasicParams(); //检测基础参数配置

		// [parameter传参]:默认必带参数 TODO 这个单词意义不明
		if (config.source) {
			data['source'] = config.source;
		}

		// 是否携带token,默认情况下只有要token就会携带,只有notUser时不携带
		if (app.userInfo.token && apiType != 'notUser') {
			data['token'] = app.userInfo.token;
		}

		// [apiType检测]某种类型下携带某些参数
		if (apiType == 'user') { //需要用户登录
			console.log(log + '[执行用户强制登录检测]', app.userInfo.token);
			if (!app.userAuto.checkUserLogin()) {
				//未登录跳转登录页
				toUserLogin();
				return true;
			}
		} else if (apiType == 'default' || apiType == 'notUser') { //默认模式

		} else {
			this.errorAlert(log + 'apiType类型,暂不支持');
			return false;
		}

		console.log(log + '[提交参数]', data);

		// [点击延迟]任何事件都不准许多次点击提交,一个接口1秒只能提交一次
		if (clickDelay == true) {
			var clickDelayName = 'clickDelay.' + config['api'];

			if (wx.getStorageSync(clickDelayName) == true) {
				console.log(log + clickDelayName + ':接口延迟点击中..........拒绝本次请求');

				//防止锁死，任何点击都配置1秒后解除
				setTimeout(function() {
					console.log(log + clickDelayName + ':延迟事件解除1');
					wx.removeStorageSync(clickDelayName);
				}, clickDelayTime)
				return false;
			} else {
				console.log(log + clickDelayName + ':请求通过,增加延迟1秒时间');
				wx.setStorageSync(clickDelayName, true); //进行延迟操作

				//防止锁死，任何点击都配置1秒后解除
				setTimeout(function() {
					console.log(log + clickDelayName + ':延迟事件解除2');
					wx.removeStorageSync(clickDelayName);
				}, clickDelayTime)
			}
		}

		data = this.requestParamsFiltering(data) // 请求参数过滤

		// [请求loading] 显示请求loading
		if (showLoading == true) {
			apiShowLoading(config.showLoadingMessage)
		}

		//数据返回参数进行过滤
		var success = function(res) {
			//显示loading才会隐藏loading
			if (showLoading == true) {
				hideLoading();
			}

			//接口不做任何处理
			if (config['isProcessReturnData'] == false) return false;

			console.log(log + '[success数据]:', res);

			//未知错误,不等于200走不到该程序内
			if (res.statusCode !== 200) {
				alert('网络延迟,请稍后重试'); //TODO 后期写接口访问日志
				return false;
			}

			/*
			 * 配置服务错误类型,配置服务返回错误
			 * 每个框架错误类型不一样，需要根据需求定制
			 */
			if (1 != 1) {
				//TODO 后期写接口访问日志
				alert('接口错误,服务出错,请联系我们');
				return false;
			}

			//接口参数判断
			var content = res.data;
			var code = content[this.returnCofig.codeField]; //标识code
			var data = content[this.returnCofig.dataField] ? content[this.returnCofig.dataField] : {}; //核心数据
			var msg = content[this.returnCofig.msgField] ? content[this.returnCofig.msgField] : ''; //返回消息

			// 没有正常的标识
			if (code === '' || isNaN(code)) {
				//TODO 后期写接口访问日志
				console.log(log + '[success][code]', code);
				alert('接口异常,请联系我们');
				return false;
			}

			// 判断每种标识所走的逻辑
			if (typeof this.errorCodeFunList[code] === function) { // 通用处理,无通用处理数据下会走下面的逻辑
				return this.errorCodeFunList[code](content)
			}

			if (code == this.codeSuccess) { //获取正常数据
				let message = showSuccessLoadingMessage ? showSuccessLoadingMessage : msg;
				if (showSuccessLoading == true) alert(message);
				if (successFunction) successFunction(data, res) // 执行完成方法
			} else if (code || code === 0 || code === '0') { //其他类型,进入codeError
				let message = showErrorLoadingMessage ? showErrorLoadingMessage : msg;
				if (showErrorLoading) alert(message);
				if (codeErrorFunction) codeErrorFunction(content, res); // 进入codeError函数
			} else {
				//TODO 后期写接口访问日志
				alert('接口错误,未返回正确的标识,请联系我们');
			}
		}

		/**
		 * 接口异常使用
		 * @param res
		 */
		var fail = function(res) {
			wx.showModal({
				title: '消息',
				content: '服务器未返回正确数据,请尝试重新请求~',
				showCancel: false,
			})

			if (showLoading == true) hideLoading()
			if (failFunction) failFunction(res)
		}

		//类型判断,增加不同的头部信息
		if (config.method == 'POST') {
			var content_type = "application/x-www-form-urlencoded";
		} else if (config.method == 'GET') {
			var content_type = 'application/json;charset=utf-8'
		}

		console.log(log + '[链接全称]' + config.url);

		//[多维字典格式转换]多维字典格式转换,多维字典直接上传是传不上去的
		var isDuoWei = false;
		for (var i in data) {
			if (typeof data[i] == 'array' || typeof data[i] == 'object') {
				isDuoWei = true;
			}
		}

		if (isDuoWei == true) {
			var common = require('../utils/common.js');

			if (config.method == 'POST') {
				data = common.serialize(data);
			} else if (config.method == 'GET') {
				config.url = config.url + '?' + common.serialize(data);
				data = '';
			}

			console.log(log + '[多维数据]格式转换:', data);
		}

		// [虚拟返回数据]开启虚拟数据,直接返回结果
		if (openMock == true) {
			//寻找数据
			var virtualData = getMockData(setConfig.api, log);
			var virtualRes = '';
			if (virtualData.type) {
				//拆解类型
				if (virtualData.type == 'url') { //替换url
					config.url = virtualData.data;
				} else if (virtualData.type == 'data') { //固定数据
					virtualRes = {
						statusCode: 200,
						data: virtualData.data
					}
				} else if (virtualData.type == 'mock') { //mock模拟
					var Mock = require('../utils/mock-min.js');
					virtualRes = {
						statusCode: 200,
						data: Mock.mock(virtualData.data)
					}
				}

				if (virtualRes) {
					alert('请注意,正在使用虚拟数据');
					console.log(log + '[虚拟数据]data:', virtualRes);
					success(virtualRes);
					return true;
				}
			}
		}

		// 请示数据
		var cache = wx.request({
			url: config.url,
			method: config.method,
			dataType: 'json',
			data: data,
			header: {
				'content-type': content_type,
			},
			success: success,
			fail: fail,
			complete: completeFunction
		})

		// 用于数据请求中断
		return cache;
	}

	// 请求参数过滤
	requestParamsFiltering(data) {
		// [parameter传参]参数剔空,去空格 TODO 无法检测多维数组,需要重构,这里应该与上面进行合并
		for (var i in data) {
			// 如果是字符串,两边去空
			if (typeof data[i] == 'string') {
				data[i] = data[i].trim();
			}

			// 值为空值时
			if (data[i] === '') {
				delete data[i];
			}

			// 防止异常提交
			if (typeof data[i] === undefined || data[i] === undefined) {
				delete data[i];
			}
		}

		return data
	}

	/**
	 * 基础参数检测
	 */
	checkBasicParams() {

	}

	/**
	 * 上传错误
	 */
	upError() {
		if (this.errorUrl) {

		}
	}

	/**
	 * 模拟数据
	 */
	mockData() {
		if (this.openMock == true) {
			this.apiData = require('./apiData.js');
		}
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

	consoleLog(msg) {
		var time = new Date().getDate(); //获取时间参数
		var log = '【' + time + '】-【api接口url】【' + this.api + '】-->';

		console.log(log + msg)
	}

	getApiConfig(apiName) {
		let apiPath = apiName.split('.');
		let obj = '';

		if (apiPath.length > 0) {
			for (var i in apiPath) {
				if (obj) { // 检测是否是对象
					obj = app.api[apiPath[i]]
				} else {
					obj = obj[apiPath[i]]
				}
			}
		}

		return obj;
	}
}



/**
 * 显示loading
 * @param content
 */
function apiShowLoading(content) {
	var app = getApp();

	//未开启
	if (app.globalData.isShowLoading == false) {
		wx.showLoading({
			title: content,
			mask: true,
		})

		app.globalData.isShowLoading == true
	}
}


/**
 * 普通消息
 * @param content
 */
function alert(content) {
	if (!content) {
		return false;
	}

	var time = content.length / 4 * 1000;
	if (time < 2000) time = 2000;
	wx.showToast({
		title: content,
		icon: 'none',
		duration: time
	})
}
