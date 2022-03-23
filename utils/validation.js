/**
 * 银行卡
 * @param {Object} data
 */
export function isIdCard(data) {
	var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if (!reg.test(data)) {
		return false;
	}

	return true;
}

/**
 * @param {Object} data
 */
export function isRealName(data) {
	var reg = /[^\u4e00-\u9fa5]/;
	if (reg.test(data)) {
		return false
	};

	return true;
}

/**
 * 昵称 只能包含中文 英文  2到20位
 * @param {Object} data
 */
export function isNickName(data) {
	var reg = /^[\u4e00-\u9fa50-9a-zA-Z_\-]{2,20}$/;
	if (!reg.test(data)) {
		return false;
	}

	return true;
}

export function isPassword(password) {
	return /^([\w\d_-]+){6,16}$/.test(password)

	return true;
}

/**
 * 是否是纯数字
 * @判断是否是0到9的纯数字
 * @param t
 * @returns {boolean}
 */
export function isPurenumber(t) {
	return !!/^[0-9]*$/.test(t);
}

/**
 * 是否是手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
	return /^1[3456789]\d{9}$/.test(mobile)
}

/**
 * 是否是email(TODO 未完成)
 * @param mobile
 * @returns {boolean}
 */
export function isEmail(email) {
	return true;
}

/**
 * 是否是json字符串
 * @desc 判断字符串是否是json形式的
 * @param str
 * @returns {boolean}
 */
export function isJsonString(str) {
	try {
		if (typeof JSON.parse(str) == "object") {
			return true;
		}
	} catch (e) {

	}
	return false;
}

/**
 * 是否为空
 * @param {Object} str
 */
export function isEmpty(str) {
	if (str === '' || str === null || typeof str === undefined) {
		return true
	} else {
		return false
	}
}

export function isObject() {
	return true
}

export function isArray() {
	return true
}
