<script>
export default {
	onLaunch: function() {
		var that = this;
		this.globalData.getCookieAuth();
		this.globalData.getCityId();
		this.globalData.getOrderUser();

		uni.login({
			success: function(e) {}
		});

		// uni.getSetting({
		// 	success: function(a) {
		// 		if (a.authSetting['scope.userInfo']) {
		// 			uni.getUserInfo({
		// 				success: function(a) {
		// 					that.globalData.userInfo = a.userInfo;

		// 					if (that.userInfoReadyCallback) {
		// 						that.userInfoReadyCallback(a);
		// 					}
		// 				}
		// 			});
		// 		}
		// 	}
		// });
	},
	globalData: {
		userInfo: null,
		cookieAuth: 'b4747XpBoLpr%2BHJkjzaXLn6ADbN4tVjUoBp7c82Y7uuQjNTXQPXG%2BsvwLfMLItzDRmo',
		cityId: 1,
		dates: [],
		orderShow: null,

		orderUser: {
			community: null,
			door_number: null,
			name: null,
			phone: null
		},

		_cache: {},

		getUserInfo: function(e) {
			var that = this;

			if (this.userInfo) {
				if ('function' == typeof e) {
					e(this.userInfo);
				}
			} else {
				uni.login({
					success: function(o) {
						uni.getUserInfo({
							success: function(o) {
								that.userInfo = o.userInfo;

								if ('function' == typeof e) {
									e(that.userInfo);
								}
							}
						});
					}
				});
			}
		},

		getCityName: function() {
			var e = {
				1: '天津',
				2: '深圳',
				3: '上海',
				4: '广州',
				5: '太原'
			};
			return e[this.cityId] ? e[this.cityId] : e[1];
		},

		getCookieAuth: function() {
			var that = this;
			uni.getStorage({
				key: 'cookieAuth',
				success: function(a) {
					that.cookieAuth = that.urlencode(a.data);
					console.log('这里', that.cookieAuth);
				},
				fail: function() {
					that.cookieAuth = null;
				}
			});
		},

		getCityId: function() {
			var that = this;
			uni.getStorage({
				key: 'cityId',
				success: function(a) {
					that.cityId = a.data;
				}
			});
		},

		showToast: function(e, a) {
			var a = a || 'loading';
			uni.showToast({
				title: e,
				icon: a,
				duration: 1000
			});
		},

		urlencode: function(e) {
			return encodeURIComponent(e)
				.replace(/!/g, '%21')
				.replace(/'/g, '%27')
				.replace(/\(/g, '%28')
				.replace(/\)/g, '%29')
				.replace(/\*/g, '%2A')
				.replace(/%20/g, '+');
		},

		saveOrderUser: function(e) {
			var that = this;

			if (e.name) {
				o = e.name;
			} else {
				var o = null;
			}

			if (e.phone) {
				r = e.phone;
			} else {
				var r = null;
			}

			if (0 != e.addresses.length) {
				var n = e.addresses[0].community;
				var t = e.addresses[0].door_number;
			} else {
				var n = null;
				var t = null;
			}

			uni.setStorage({
				key: 'orderUser',
				data: {
					name: o,
					phone: r,
					community: n,
					door_number: t
				},
				success: function() {
					that.getOrderUser();
				}
			});
		},

		getOrderUser: function() {
			var that = this;
			uni.getStorage({
				key: 'orderUser',
				success: function(a) {
					if (a.data.name) {
						that.orderUser.name = a.data.name;
					} else {
						that.orderUser.name = null;
					}

					if (a.data.phone) {
						that.orderUser.phone = a.data.phone;
					} else {
						that.orderUser.phone = null;
					}

					if (a.data.community) {
						that.orderUser.community = a.data.community;
					} else {
						that.orderUser.community = null;
					}

					if (a.data.door_number) {
						that.orderUser.door_number = a.data.door_number;
					} else {
						that.orderUser.door_number = null;
					}
				},
				fail: function() {
					that.orderUser.name = null;
					that.orderUser.phone = null;
					that.orderUser.community = null;
					that.orderUser.door_number = null;
				}
			});
		}
	}
};
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import 'css/base.css';

.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}
</style>
