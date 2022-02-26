/**
 * 域名配置相关参数,一般用来配置线上线下切换的域名配置
 * @desc 所有程序的域名相关的都要在这里设置，不要使用其他的
 * @desc hostType中的formal类型为固定，其他的都是非正式版
 * @desc 暂时无法达到检测是正式版强制使用formal类型,因为小程序不提供是否是正式版的检测，如果用迂回的方法就是让后台检测然后返回小程序版本
 */

/**
 * 正式服务器配置
 */
const formal = {
	// 配置标识,会根据标识弹窗
	hostType: 'formal',

	// 服务器主域名(非api,可能某些特殊情况下会用到)
	host: 'https://www.baidu.com',

	// 服务器api域名(api域名,接口一般使用这个)
	apiHost: 'https://www.baidu.com/api',

	// 文件服务器主域名(相对图片添加路径)
	fileHost: 'https://www.baidu.com',

	// 上传文件服务器主域名
	upFileHost: 'https://www.baidu.com',

	// 前端出现错误时进行提交的url,全域名
	errorUrl: '',

	// 用户行为日志上传url
	userBehaviorLog: '',

	// webSoer服务器
	webSocketHost: 'wss://www.baidu.com/wss/',
}

/**
 * 测试服务器
 */
const test = {
	// 配置标识,会根据标识弹窗
	hostType: 'test',

	// 服务器主域名(非api,可能某些特殊情况下会用到)
	host: 'http://shopv6.admin.com',

	// 服务器api域名(api域名,接口一般使用这个)
	apiHost: 'http://shopv6.admin.com/api',

	// 文件服务器主域名(相对图片添加路径)
	fileHost: 'http://shopv6.admin.com',

	// 上传文件服务器主域名
	upFileHost: 'http://shopv6.admin.com',

	// 前端出现错误时进行提交的url,全域名
	errorUrl: '',

	// 用户行为日志上传url
	userBehaviorLog: '',

	// webSoer服务器
	webSocketHost: 'wss://www.baidu.com/wss/',
}

module.exports = formal;
