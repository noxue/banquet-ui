import {
	shareConfig
} from "../common/shareConfig.js"

/**
 * 分享
 * @desc 目前兼容小程序，后期增加app
 */

module.exports = {
	data() {
		return {
			share: {
				title: '', // 默认为小程序名称
				path: '', // 默认为当前页面路径
				imageUrl: '' // 默认为当前页面的截图
			}
		}
	},
	onLoad() {
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// #endif

		// #ifdef MP-QQ
		qq.showShareMenu({
			showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
		});
		// #endif

		// TODO 获取页面配置不同的分享内容,修改成策略模式配置模式
		this.shareSet(shareConfig)
	},

	onShareAppMessage() {
		return this.mpShare
	},

	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return this.mpShare
	},
	// #endif

	methods: {
		// 外部调用,分享设置
		shareSet(config) {
			this.share = {
				...this.share,
				...config
			}
		}
	}
}
