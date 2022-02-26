/**
 * 订单模块复用
 */

module.exports = {
	data() {
		return {}
	},
	methods: {
		/**
		 * 订单取消
		 * @desc 触发成功之后会调用orderCancel
		 * @param {Object} config
		 */
		orderCancel(orderId, callbackFun) {
			var that = this;
			uni.showModal({
				title: '确定要取消该订单吗？',
				content: '',
				success: function(e) {
					if (e.confirm) {
						that.$api.order.cancel.request({
							orderId: orderId
						}).then(data => {
							typeof callbackFun === 'function' && callbackFun(data)
						})
					}
				}
			});
		}
	}
}
