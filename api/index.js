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
		openMock: true,
		request: function(data) {
			return promise(this, data);
		}
	},
	applet: {
		slideshow: {
			name: '[配置]轮播图',
			api: 'applet/slideshow',
			url: hostConst.apiHost + '/applet/slideshow',
			data: {},
			apiType: 'default',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	login: {
		wxcode: {
			name: '[登录][微信]微信code',
			api: 'login/wxcode',
			url: hostConst.apiHost + '/login/wxcode',
			data: {},
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		sendCode: {
			name: '[登录][短信]发送短信验证码',
			api: 'login/sendCode',
			url: hostConst.apiHost + '/login/sendCode',
			data: {},
			method: 'POST',
			openMock: true,
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
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	goods: {
		bespeakInfo: {
			name: '[商品][预约信息]商品预约信息',
			api: 'goods/bespeakInfo',
			url: hostConst.apiHost + '/goods/bespeakInfo',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		partyList: {
			name: '[商品]聚会列表',
			api: 'goods/partyList',
			url: hostConst.apiHost + '/goods/partyList',
			data: {
				cateId: '' // 分类id，不传就是所有分类
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		partyInfo: {
			name: '[商品]聚会详情',
			api: 'goods/partyInfo',
			url: hostConst.apiHost + '/goods/partyInfo',
			data: {
				partyId: '' // 聚会id
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	chefInfo: {
		list: {
			name: '[厨师]初始列表',
			api: 'chefInfo/list',
			url: hostConst.apiHost + '/chefInfo/list',
			data: {
				searchKey: '',
				city: '',
				latitude: 0,
				longitude: 0,
				pageNum: 1,
				pageSize: 10,
				chefSort: '',
				startBasicFee: '',
				endBasicFee: '',
				minNum: '',
				maxNum: '',
				cookAge: 0,
				dishStyleIdList: '',
				distance: '',
				userKey: '',
				token: ''
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		findDishStyle: {
			name: '[厨师]菜类型',
			api: 'chefInfo/findDishStyle',
			url: hostConst.apiHost + '/chefInfo/findDishStyle',
			data: {},
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	user: {
		info: {
			name: '[用户]用户信息',
			api: 'user/info',
			url: hostConst.apiHost + '/user/info',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		balance: {
			name: '[用户]余额信息',
			api: 'user/balance',
			url: hostConst.apiHost + '/user/balance',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		balanceLog: {
			name: '[用户]余额日志',
			api: 'user/balanceLog',
			url: hostConst.apiHost + '/user/balanceLog',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		coupon: {
			name: '[用户]优惠卷列表',
			api: 'user/coupon',
			url: hostConst.apiHost + '/user/coupon',
			data: {
				type: '', // valid 未使用 used 已使用 expired 已过期
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		couponAdd: {
			name: '[用户]添加优惠卷',
			api: 'user/couponAdd',
			url: hostConst.apiHost + '/user/couponAdd',
			data: {
				code: '', // 兑换码 
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		addressInfo: {
			name: '[用户][地址]地址详细信息',
			api: 'user/addressInfo',
			url: hostConst.apiHost + '/user/addressInfo',
			data: {
				id: '' // 地址id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		addressDefault: {
			name: '[用户][地址]设置默认地址',
			api: 'user/addressDefault',
			url: hostConst.apiHost + '/user/addressDefault',
			data: {
				id: '' // 地址id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		addressCreate: {
			name: '[用户][地址]新创建地址',
			api: 'user/addressCreate',
			url: hostConst.apiHost + '/user/addressCreate',
			data: {
				id: '' // 地址id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		addressSave: {
			name: '[用户][地址]编辑/保存地址',
			api: 'user/addressSave',
			url: hostConst.apiHost + '/user/addressSave',
			data: {
				id: '' // 地址id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		addressDelete: {
			name: '[用户][地址]设置默认地址',
			api: 'user/addressDelete',
			url: hostConst.apiHost + '/user/addressDelete',
			data: {
				id: '' // 地址id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		orderList: {
			name: '[用户][订单列表]订单列表',
			api: 'user/orderList',
			url: hostConst.apiHost + '/user/orderList',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		orderDetail: {
			name: '[用户][订单列表]订单详情',
			api: 'user/orderDetail',
			url: hostConst.apiHost + '/user/orderDetail',
			data: {
				orderId: '', // 订单id
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	order: {
		save: {
			name: '[订单]下单', // 改为create order
			api: 'order/save',
			url: hostConst.apiHost + '/order/save',
			data: {},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		payDetail: {
			name: '[订单]下单详情',
			api: 'order/payDetail',
			url: hostConst.apiHost + '/order/payDetail',
			data: {},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		payConfirm: {
			name: '[订单]支付确认',
			api: 'order/payDetail',
			url: hostConst.apiHost + '/order/payDetail',
			data: {},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		pay: {
			name: '[订单]支付',
			api: 'order/pay',
			url: hostConst.apiHost + '/order/pay',
			data: {},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		cancel: {
			name: '[订单]取消列表',
			api: 'order/cancel',
			url: hostConst.apiHost + '/order/cancel',
			data: {
				orderId: '', // 订单id
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		statusList: {
			name: '[订单]状态列表',
			api: 'order/statusList',
			url: hostConst.apiHost + '/order/statusList',
			data: {
				orderId: '', // 订单id
			},
			apiType: 'user',
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		},
		balanceRechargePay: {
			name: '[订单]余额充值支付',
			api: 'order/balanceRechargePay',
			url: hostConst.apiHost + '/order/balanceRechargePay',
			data: {
				type: '', // 卡类型
			},
			apiType: 'user',
			method: 'POST',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	memberCard: {
		list: {
			name: '[会员卡]会员卡列表',
			api: 'memberCard/list',
			url: hostConst.apiHost + '/memberCard/list',
			data: {},
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	},
	system: {
		set: {
			name: '[系统]配置信息',
			api: 'system/set',
			url: hostConst.apiHost + '/system/set',
			data: {},
			method: 'GET',
			openMock: true,
			request: function(data) {
				return promise(this, data);
			}
		}
	}
}


/**
 * 设置
 * @param data
 * @returns {Promise}
 */
var promise = function(config, data = {}) {

	var config = Object.assign({}, config, data);

	console.log('请求参数', config, data)

	return new Promise(function(r, a) {
		config.success = function(data) {
			console.log('回调数据', data)
			r(data);
		};

		config.codeError = function(res) {
			a(res)
		}

		let abc = new requestServe();
		abc.request(config)
	});
}

module.exports = api;
