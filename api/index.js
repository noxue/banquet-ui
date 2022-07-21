/***************************************************************
 * 接口参数介绍
 * name 接口名称 以XX:XX格式取,主要用在输出日志
 * api  接口名称与const定义需要一样（必须强制一样），主要用在输出日志
 * url  访问链接地址
 * data 请求数据
 * dataFormat 请求数据检测与格式化
 * clickDelay 点击延迟，一个接口只能1秒钟只能调用一次，true开启 false关闭,默认开启
 * -->true 开启(默认)
 * -->false 关闭
 * showLoading 显示加载loading,请求时弹出窗口
 * -->true 显示(默认)
 * -->false 不显示
 * showLoadingMessage 显示加载loading文本
 * -->false 只显示loading，不显示文本
 * -->'正在请求...' 显示loading,显示配置文本(默认)
 * showSuccessLoading 显示加载/请求返回正确信息时显示的loading
 * -->true  显示loading
 * -->false 不显示loading(默认)
 * showSuccessLoadingMessage 示加载/请求返回正确信息时显示的loading消息
 * -->false 不显示文本
 * -->'加载成功' 显示文本,为空时显示后台文本，有内容时显示设置内容(默认值为空)
 * showErrorLoading 显示加载/请求返回错误信息时显示的loading
 * -->true  显示(默认)
 * -->false 不显示
 * showErrorLoadingMessage 显示加载/请求返回错误信息时显示的loading文本
 * -->false 不显示文本
 * -->'加载失败' 显示文本,为空时显示后台文本，有内容则优先显示内容(默认值为空)
 * apiType 请求默认类型,会根据参数增加一些额外的设置
 * -->default 普通模式，不强制用户登录(默认,如果用户已经登录，接口中会带有用户token过去)
 * -->user 使用用户信息，强制判断是否登录,如果没有登录跳转登录页
 * -->notUser 不传用户信息过去
 * method 微信小程序的传参模式，一般就是GET/POST
 * -->GET
 * -->POST
 * dataConfig 传参配置
 * isProcessReturnData 是否处理返回数据
 * returnConfig 返回参数进行格式转换,一些特殊的类型直接进行排错(TODO 该系统未实现,主要参数格式化，补充参数等操作)
 * -->type类型:普通类型转换int/string/array/object基本类型转换，特殊类型转换jsonString/date/time等
 * -->-->jsonString会进字符串尝试型进行转换，如果转换失败转换为{},防止程序报错
 * -->-->date 会将时间戳转换成时间格式
 * -->isComplementing:是否补足,如果在没有检查到会补充一个空的参数,
 * request 接口快捷模式
 **************************************************************/

//服务器配置
import requestServe from './requestServe.js'
import hostConst from '../config/hostConst.js'

//接口配置
const api = {
	home: {
		name: '[首页]首页',
		api: 'index',
		url: hostConst.apiHost + '/index',
		data: {},
		apiType: 'default',
		method: 'GET',
		request: function(data) {
			return promise(this, data);
		}
	},
	reservations: {
		post: {
			name: '[预约]预约订单',
			api: 'reservations/post',
			url: hostConst.apiHost + '/reservations',
			data: {},
			method: 'POST',
			showSuccessLoading: true,
			showSuccessLoadingMessage: '预约成功',
			request: function(data) {
				return promise(this, data);
			}
		},
		get: {
			name: '[预约]预约订单',
			api: 'reservations/get',
			url: hostConst.apiHost + '/reservations',
			data: {},
			method: 'GET',
			showSuccessLoading: true,
			showSuccessLoadingMessage: '预约成功',
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	orders: {
		get: {
			name: '[订单]订单列表',
			api: 'orders/get',
			url: hostConst.apiHost + '/orders',
			data: {},
			method: 'GET',
			request: function(data) {
				return promise(this, data);
			}
		},
		post: {
			name: '[订单]订单下单',
			api: 'orders/post',
			url: hostConst.apiHost + '/orders',
			data: {},
			method: 'POST',
			showSuccessLoading: true,
			showSuccessLoadingMessage: '下单成功',
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	menus: {
		get: {
			name: '[套餐]列表数据',
			api: 'menus/get',
			url: hostConst.apiHost + '/menus',
			data: {},
			method: 'GET',
			request: function(data) {
				return promise(this, data);
			}
		},
		detail: {
			name: '[套餐]套餐详情',
			api: 'menus/detail',
			url: hostConst.apiHost + '/menus/',
			data: {},
			method: 'GET',
			request: function(data, config) {
				return promise(this, data, config);
			}
		},
	},
	cooks: {
		me: {
			name: '[厨师]获取厨师详情',
			api: 'cooks/me',
			url: hostConst.apiHost + '/cooks/me',
			data: {},
			method: 'GET',
			showErrorLoading:false,
			request: function(data) {
				return promise(this, data);
			}
		},
		post: {
			name: '[厨师]添加',
			api: 'cooks/post',
			url: hostConst.apiHost + '/cooks',
			data: {
				"name": "姓名",
				"phone": "手机号", // 注：前端界面上为了提高体验，可以自动把个人信息中的手机号填进去
				"sex": 1, //数字类型，可选，默认为 0 未知， 1 男，2 女
				"marry_status": 1, // 数字类型，可选， 婚姻状态：0 未知，1 未婚，2 已婚
				"origin_address": "户籍所在地(可选)",
				"address": "常驻地址(可选)",
				"photo": "真人照片", // 上传文件后返回的相对路径
				"identify_card1": "身份证正面", // 上传文件后返回的相对路径
				"identify_card2": "身份证反面", // 上传文件后返回的相对路径
				"residence_permit": "居住证", // 上传文件后返回的相对路径
				"description": "履历信息", // 可选，默认为空
				"foods": "[{'pic':'1.png'},{'pic':'2.png'}]" // 可选，厨师擅长的食物列表，组装成json数组，如果没有，传 null
			},
			method: 'POST',
			showSuccessLoading: true,
			showSuccessLoadingMessage: '提交成功',
			request: function(data) {
				return promise(this, data);
			}
		},
		get: {
			name: '[厨师]获取列表',
			api: 'cooks/get',
			url: hostConst.apiHost + '/cooks',
			data: {},
			method: 'GET',
			request: function(data) {
				return promise(this, data);
			}
		},
		id: {
			name: '[厨师]获取指定id厨师信息',
			api: 'cooks/id',
			url: hostConst.apiHost + '/cooks/:id',
			data: {},
			method: 'GET',
			request: function(data, config) {
				return promise(this, data, config);
			}
		},
		food_types:{
			name: '[厨师]获取工作时间',
			api: 'cooks/food_types',
			url: hostConst.apiHost + '/cooks/food_types',
			data: {},
			method: 'GET',
			request: function(data, config) {
				return promise(this, data, config);
			}
		},
		service:{
			name: '[厨师]服务说明信息',
			api: 'cooks/service',
			url: hostConst.apiHost + '/cooks/service',
			data: {},
			method: 'GET',
			request: function(data, config) {
				return promise(this, data, config);
			}
		},
		workTime: {
			get: {
				name: '[厨师]获取工作时间',
				api: 'cooks/spare_time/get',
				url: hostConst.apiHost + '/cooks/:id/spare_time',
				data: {},
				method: 'GET',
				request: function(data, config) {
					return promise(this, data, config);
				}
			},
			post: {
				name: '[厨师]添加工作时间',
				api: 'cooks/spare_time/post',
				url: hostConst.apiHost + '/cooks/:id/spare_time',
				data: {},
				method: 'POST',
				showSuccessLoading: true,
				showSuccessLoadingMessage: '添加成功',
				request: function(data, config) {
					return promise(this, data, config);
				}
			}
		},
	},
	login: {
		phone: {
			index: {
				name: '[登录][手机][登录]发送短信验证码',
				api: 'login/phone',
				url: hostConst.apiHost + '/login/phone',
				data: {
					"phone": "",
					"code": ""
				},
				method: 'POST',
				showSuccessLoading: true,
				showSuccessLoadingMessage: '登录成功',
				request: function(data) {
					return promise(this, data);
				}
			},
			code: {
				name: '[登录][手机][短信]发送短信验证码',
				api: 'login/phone/code',
				url: hostConst.apiHost + '/login/phone/code',
				data: {
					"phone": ""
				},
				method: 'POST',
				showSuccessLoading: true,
				showSuccessLoadingMessage: '发送成功',

				request: function(data) {
					return promise(this, data);
				}
			}
		},
		sendCode: {
			name: '[登录][短信]发送短信验证码',
			api: 'login/sendCode',
			url: hostConst.apiHost + '/login/sendCode',
			data: {},
			method: 'POST',
			request: function(data) {
				return promise(this, data);
			}
		},
		checkCode: {
			name: '[登录][短信]检查code',
			api: 'login/checkCode',
			url: hostConst.apiHost + '/login/checkCode',
			data: {},
			method: 'POST',

			request: function(data) {
				return promise(this, data);
			}
		}
	},
	users: {
		me: {
			name: '[用户]用户信息',
			api: 'users/me',
			url: hostConst.apiHost + '/users/me',
			data: {},
			apiType: 'user',
			method: 'GET',
			request: function(data) {
				return promise(this, data);
			}
		}
	},
}


/**
 * 设置
 * @param data
 * @returns {Promise}
 */
var promise = function(object, data = {}, config) {

	console.log('请求参数', object, data, config)

	object.data = data;

	if (config) object = Object.assign({}, object, config)

	return new Promise(function(r, a) {
		object.success = function(data) {
			console.log('回调数据', data)
			r(data);
		};

		object.codeError = function(res) {
			a(res)
		}

		let abc = new requestServe();
		abc.request(object)
	});
}

module.exports = api;
