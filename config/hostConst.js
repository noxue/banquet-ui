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
	host: 'https://api.b.pbootcms.tv',

	// 服务器api域名(api域名,接口一般使用这个)
	apiHost: 'https://api.b.pbootcms.tv/api',

	// 文件服务器主域名(相对图片添加路径)
	fileHost: 'http://image.noxue.com/baijiayan',

	fileHost2: 'https://api.b.pbootcms.tv/static',

	// 上传文件服务器主域名
	upFileHost: 'https://api.b.pbootcms.tv/api/upload',

	// webSoer服务器
	webSocketHost: '',

	// 前端出现错误时进行提交的url,全域名
	errorUrl: '',

	// 用户行为日志上传url
	userBehaviorLog: '',
}

/**
 * 测试服务器
 */
const test = {
	// 配置标识,会根据标识弹窗
	hostType: 'formal',

	// 服务器主域名(非api,可能某些特殊情况下会用到)
	host: 'http://www.baidu.com',

	// 服务器api域名(api域名,接口一般使用这个)
	apiHost: 'http://127.0.0.1:8080/api',

	// 文件服务器主域名(相对图片添加路径)
	fileHost: 'http://image.noxue.com/baijiayan',

	fileHost2: 'http://127.0.0.1:8080/static',

	// 上传文件服务器主域名
	upFileHost: 'http://127.0.0.1:8080/api/',

	// webSoer服务器
	webSocketHost: '',

	// 前端出现错误时进行提交的url,全域名
	errorUrl: '',

	// 用户行为日志上传url
	userBehaviorLog: '',
}

module.exports = formal;
