import {
	toPage,
	toPageLogin,
	toPageRegister,
	loginSuccessRedirectTo,
} from './router.js';
import {
	getUpPage
} from './uniapp.js'

/**
 * 用户模块
 * @desc 与用户相关的方法都会存在这里
 * @TODO 用户登录未配置自动登录过期配置
 * @TODO 退出登录需要发给后台进行token清理
 */
class userServe {
	/**
	 * 配置
	 * @param {Object} data
	 */
	constructor(data) {}

	/**
	 * 获取用户token
	 */
	getUserToken() {
		return this.getUserInfo('token');
	}

	/**
	 * 检查用户是否登录
	 * @param {boolean} isToUserLogin 是否跳转到登录页面,如果为true,未登录将会跳转到登录页面
	 */
	checkUserLogin(isToPagesUserLogin = false) {
		let token = this.getUserToken();
		if (token) return token;
		if (isToPagesUserLogin == true) toPageLogin();
		return false;
	}

	/**
	 * 创建用户
	 */
	createUser(userInfo) {
		uni.setStorageSync('userInfo', userInfo)
		return userInfo;
	}

	/**
	 * 删除用户
	 */
	deleteUser() {
		uni.removeStorageSync('userInfo')
	}

	/**
	 * 用户退出登录
	 */
	logout() {
		this.deleteUser();
	}

	/**
	 * 获取用户信息
	 */
	getUserInfo(key) {
		let userInfo;

		userInfo = uni.getStorageSync('userInfo')

		// 如果存在key 返回key的内容
		if (key) {
			if (typeof userInfo[key] != undefined) {
				return userInfo[key]
			} else {
				return '';
			}
		}

		return userInfo;
	}

	/**
	 * 添加/修改 用户信息
	 * @param {Object} key  下标
	 * @param {Object} value vlaue值(TODO '' 进行字段删除 ,其他存值 未增加)
	 */
	changeUserInfo(key, value) {
		if (!key) {
			return ''
		}

		let userInfo = this.getUserInfo()
		userInfo[key] = value;

		return this.createUser(userInfo);
	}

	/**
	 * 是否对像检测
	 * @param {Object} data
	 */
	isObject(data) {
		return Object.prototype.toString.call(data) === '[object Object]';
	}
}

module.exports = new userServe();
