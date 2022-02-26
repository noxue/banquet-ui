import modeIn from "./modein.js"

// 导入模块
const files = require.context('./mock/', true, /\S*\.js/)
const apiAll = modeIn(files, 'object')

// 创建api请求函数
const api = {}
Object.keys(apiAll).forEach(mItem => {
	let keyArray = []
	if (mItem.indexOf('/') > -1) {
		keyArray = mItem.split('/')
	} else {
		keyArray = [mItem]
	}

	let data;
	keyArray.forEach((item, index) => {
		if (keyArray.length === index + 1) {
			if (data) {
				data[item] = apiAll[mItem]
			} else {
				api[item] = apiAll[mItem]
			}
		} else {
			if (typeof api[item] === 'undefined') api[item] = {}
			data = api[item]
		}
	})
})

module.exports = api;
