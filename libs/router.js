/**
 * 轻路由系统
 * 与页面相关项目的页页,可能在每个页面中使用耦合较深
 */
import {
	getUpPage
} from './uniapp.js'
import userServe from './userServe.js'

// 常用列表页,用来在不同api中跳转同一个页面
export const pageList = {
	'home': '/pages/index/index', //首页
	'Login': '/pages/login/login', //用户授权登录
	'register': '/pages/login/login', //用户注册页
}

/**
 * tab页列表,要与json一致,用来做toPage方法
 */
export const tabPageList = [
	'/pages/index/index',
	'/pages/my/my',
];

/**
 * 去页面
 * @desc 判断是否跳转的是tab页面,进行不同的跳转
 * @param {Object} page 跳转页面
 * @param {Object} data 拼接参数
 */
export function toPage(page, data) {
	let isTab = false;
	for (let i in tabPageList) {
		if (tabPageList[i] == page) {
			isTab = true;
		}
	}

	if (isTab) {
		uni.switchTab({
			url: page
		})
	} else {
		uni.navigateTo({
			url: page
		})
	}
}

/**
 * 去登录页面
 */
export function toPageLogin(data) {
	toPage(pageList.Login)
}

/**
 * 进到用户登录页面,带有时间限制的
 * @param content
 */
let toPageUserLoginTime = 0;
export function toPageUserLoginTimer() {
	let time = new Date().getTime();

	// TODO 现在已经是登录页面,没有排除
	if (time - toPageUserLoginTime > 1500) {
		toPageUserLoginTime = time
		userServe.deleteUser();
		toPageLogin();
	}
}

/**
 * 登陆成功
 * @desc 1.获取上一个页面，并执行getPageLoginData
 * 2.如果没有则检测是否有缓存url
 * 3.跳到首页
 */
export function loginSuccess() {
	// 有上一个页面执行的方法
	let upPageObject = getUpPage()
	if (upPageObject) {
		if (loginSuccessRedirectTo(upPageObject.route)) return true;

		// 登录成功执行方法
		if (typeof upPageObject['onLoginSuccess'] == 'function') upPageObject['onLoginSuccess']();

		uni.navigateBack({
			delta: 1
		})
		return true;
	}

	// 没有上一个页面,检查是否有重向向链接
	let backUrl = uni.getStorageSync('login_back_url');
	if (backUrl) return toPage(backUrl)

	// 都不符合
	uni.switchTab({
		url: pageList.home
	})

	return true;
}

/**
 * 登录成功后检测url地址，如果是这些地址就直接跳到首页
 */
export const loginSuccessRedirectUrl = [
	'/pages/lgoin/index'
];
export function loginSuccessRedirectTo(url) {
	if (loginSuccessRedirectUrl.indexOf(url) > -1) {
		toPage(pageList.home)
		return true;
	} else {
		return false;
	}
}

/**
 * 去注册页面
 * @des 
 */
export function toPageRegister(data) {
	toPage(pageList.register)
}

/**
 * 进入用户注册页面,带有时间限制的
 * @param content
 */
let toPageUserRegisterTime = 0;
export function toPageUserRegisterTimer() {
	let time = new Date().getTime();

	// TODO 现在已经是登录页面,没有排除
	if (time - toPageUserRegisterTime > 1500) {
		toPageUserRegisterTime = time
		userServe.deleteUser();
		toPageRegister();
	}
}
