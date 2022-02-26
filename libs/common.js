/**
 * 通用日期转换函数
 * @param value
 * @param formats
 * @returns {string}
 */
Date.format = function(value, formats) {
	if (formats) {
		formats = formats.match(/^([yY]{2,4})([.:\/-])([mM]{1,2})\3([dD]{1,2})$/gi);
	}

	value = new Date(+value);

	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	var day = value.getDate();

	return year + '.' + month + '.' + day;
};

/**
 * 通用货币格式化
 * @desc 爱就定自带货币格式化插件
 * */
var Currency = {
	spec: {
		"decimals": 2,
		"dec_point": ".",
		"thousands_sep": "",
		"sign": "￥"
	},

	format: function(num, force) {
		var part;
		var sign = this.spec.sign || '';
		if (!(num || num === 0) || isNaN(+num)) return num;
		var num = parseFloat(num);
		if (this.spec.cur_rate) {
			num = num * this.spec.cur_rate;
		}
		num = Math.round(num * Math.pow(10, this.spec.decimals)) / Math.pow(10, this.spec.decimals) + '';
		var p = num.indexOf('.');
		if (p < 0) {
			p = num.length;
			part = '';
		} else {
			part = num.substr(p + 1);
		}
		while (part.length < this.spec.decimals) {
			part += '0';
		}
		var curr = [];
		while (p > 0) {
			if (p > 2) {
				p -= 3;
				curr.unshift(num.substr(p, 3));
			} else {
				curr.unshift(num.substr(0, p));
				break;
			}
		}
		if (!part) {
			this.spec.dec_point = '';
		}
		if (force) {
			sign = '<span class="price-currency">' + sign + '</span>';
		}
		return sign + curr.join(this.spec.thousands_sep) + this.spec.dec_point + part;
	},

	number: function(format) {
		if (!format) return null;
		if (isNaN(+format)) {
			if (format instanceof jQuery || (format.nodeName && format.nodeType === 1)) format = $(format)
			.val() || $(format).text();
			if (format.indexOf(this.spec.sign) == 0) format = format.split(this.spec.sign)[1];
		}
		return +format;
	},

	calc: function(calc, n1, n2, noformat) {
		if (!(n1 || n1 === 0)) return null;
		if (!n2) {
			n1 = this.number(n1);
		} else {
			calc = !calc || calc == 'add' ? 1 : -1;
			var t1 = 1,
				t2 = 1;
			if (n1 instanceof Array && n1.length) {
				t1 = n1[1];
				n1 = n1[0];
			}
			if (n2 instanceof Array && n2.length) {
				t2 = n2[1];
				n2 = n2[0];
			}
			var decimals = Math.pow(10, this.spec.decimals * this.spec.decimals);
			n1 = Math.abs(t1 * decimals * this.number(n1) + calc * t2 * decimals * this.number(n2)) / decimals;
		}
		if (!noformat) n1 = this.format(n1);
		return n1;
	},

	add: function(n1, n2, flag) {
		return this.calc('add', n1, n2, flag);
	},

	diff: function(n1, n2, flag) {
		return this.calc('diff', n1, n2, flag);
	}
};

function serializeArray(data, str) {
	if (!data) {
		return '';
	}

	if (!str) {
		str = '';
	}

	//console.log('data数据',data);

	if (typeof data == 'object' || typeof data == 'array') {
		var arrayStr = '';

		for (var i in data) {

			if (typeof data[i] == 'object' || typeof data[i] == 'array') {
				if (str == '') {
					arrayStr += serializeArray(data[i], `${i}`);
				} else {
					arrayStr += serializeArray(data[i], str + `[${i}]`);
				}
			} else {
				if (str == '') {
					arrayStr += '&' + str + `${i}=${data[i]}`;
				} else {
					arrayStr += '&' + str + `[${i}]=${data[i]}`;
				}
			}
		}

		//console.log('arrayStr',arrayStr);
		return arrayStr;
	} else {
		return ''
	}
}

/**
 * 数据串化 同jquery的serialize
 * @param data
 * @returns {*}
 */
function serialize(data) {
	var abc = serializeArray(data, '');

	if (abc) {
		return abc.slice(1);
	} else {
		return '';
	}
}

function toPage(e) {
	let url = e.currentTarget.dataset.url;
	wx.navigateTo({
		url
	})
}

function toIndex() {
	return wx.switchTab({
		url: '/pages/index/index'
	})
}

function showModal(content) {
	return wx.showModal({
		title: "提示",
		content: content,
		showCancel: false,
		confirmColor: "#2D73FB"
	})
}

function showToast(title) {
	return wx.showToast({
		title: title,
		icon: 'none'
	})
}

function setPassword(e, password, confirmpwd, api) {
	if (!password) {
		return showModal("请填写新的密码,6~20位字符")
	}
	if (!confirmpwd) {
		return showModal("请再次输入新密码")
	}
	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	if (reg.test(password) && reg.test(confirmpwd)) {
		if (confirmpwd === password) {
			api.getData(e.detail.value).then(function(data, res) {
				console.log(data)
				if (data) {
					showToast("设置成功")
					setTimeout(() => {
						toIndex();
					}, 300)
				}
			}, function(res) {
				console.log(res)
			})
		} else {
			return showModal("两次输入的密码不一样")
		}

	} else {
		return showModal("输入的不符合要求")
	}

}

function sendVcode() {

}

function checkVcode() {

}

//转换成整数
function round(num) {
	return parseInt(Number(num))
}

//转换成带两位小数的数字
function toFixed(num) {
	return parseFloat(num).toFixed(2)
}

/**
 * 去商品商品详情
 */
function toPagesItemDetail(data) {
	var pages = getCurrentPages();
	var isHavShop = -1;
	console.log(pages);
	for (var i in pages) {
		var route = pages[i].route;
		console.log(route);
		if (route == 'pages/item/detail/index') {
			isHavShop = i;
			var obj = pages[i];
		}
	}
	console.log(isHavShop);
	//没有页面往下跳
	if (isHavShop == -1) {
		wx.navigateTo({
			url: '/pages/item/detail/index?item_id=' + data.item_id
		})
	} else {
		// 多次点击店铺,为了防止店铺->商品->店铺->商品 无限循环 改为检测到有商铺路径进行后退
		console.log('总页面', pages.length, '当前页位置', isHavShop);
		var number = pages.length - isHavShop - 1;
		console.log('后退页数', number)
		wx.navigateBack({
			delta: number
		})
		if (typeof obj['restructureItem'] == 'function') {
			obj.restructureItem(data)
		}
	}
}

module.exports = {
	Currency: Currency,
	serialize: serialize,
	toPage: toPage,
	showToast: showToast,
	showModal: showModal,
	sendVcode: sendVcode,
	checkVcode: checkVcode,
	setPassword: setPassword,
	round: round,
	toFixed: toFixed,
	toPagesItemDetail: toPagesItemDetail
}
