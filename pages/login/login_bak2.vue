<template>
	<view class="loginBox" v-if="bindPhoneType">
		<view class="height24"></view>

		<view class="phoneBox">
			<view class="c-444 font-28 mar-r40">手机号</view>
			<input @input="getPhone" class="flex1 font-28 c-444" :focus="true" maxlength="11" placeholder="请输入手机号码" placeholderStyle="color:#b6b6b6;font-size:28rpx;" type="number" :value="phone" />
			<view class="font-25 send sendWord1" v-if="flag ? true : false">{{ showHtml }}</view>
			<view @tap="countDownTime" class="font-25 send sendWord" v-if="flag ? false : true">发送验证码</view>
		</view>

		<view class="codeBox">
			<view class="c-444 font-28 mar-r40">验证码</view>
			<input @input="getCode" class="flex1 font-28 c-444" maxlength="6" placeholder="请输入验证码" placeholderStyle="color:#b6b6b6;font-size:28rpx;" type="number" :value="code" />
		</view>

		<view>
			<button class="login logins" v-if="last && hidden ? true : false">登录</button>
			<button @tap="login" class="login" v-if="last && hidden ? false : true">登录</button>
		</view>
		<view class="body-view"><loading v-if="!customLoading">加载中...</loading></view>
	</view>
</template>

<script>
var a = true;
var app = getApp();

/**
 * 移除微信相关，只做手机号登录
 */
export default {
	data() {
		return {
			showHtml: '获取验证码',
			hidden: false,
			flag: false,
			last: false,
			customLoading: true,
			bindPhoneType: true,
			phone: '',
			code: ''
		};
	},
	onLoad: function(a) {
		
	},
	methods: {
		// 自动登录
		autoLogin: function() {
			var that = this;

			uni.login({
				success: function(t) {
					var s = {
						code: t.code
					};

					this.$api.login.wxcode.request(s).then(data => {
						if (data.temp_session) {
							this.bindPhoneType = true;
						} else {
							app.globalData.orderShow = null;
						}
					});
				}
			});
		},

		getPhone: function(a) {
			console.log(a.detail.value);

			if (/^1[34578]\d{9}$/.test(a.detail.value)) {
				this.setData({
					flag: true,
					last: true,
					phone: a.detail.value
				});
			} else {
				this.setData({
					flag: false
				});
			}
		},

		getCode: function(a) {
			console.log(a.detail.value);

			if (/^\d{6}$/.test(a.detail.value)) {
				this.setData({
					hidden: true,
					code: a.detail.value
				});
			} else {
				this.setData({
					hidden: false
				});
			}
		},

		countDownTime: function() {
			var that = this;

			that.setData({
				flag: false,
				showHtml: '发送中...'
			});

			var params = {
				phone: parseInt(that.phone),
				device: 'miniprogram'
			};

			this.$api.login.sendCode.request(params).then(data => {
				var s = 60;
				a = false;
				var d = setInterval(function() {
					that.timeChange(s);

					if (--s < 0) {
						clearInterval(d);
						s = void 0;
						a = true;
						that.setData({
							flag: true
						});
					}
				}, 1000);
			});
		},

		timeChange: function(a) {
			let e;
			if (0 != a) {
				text = '(' + a + 's)后重发';
			} else {
				text = '获取验证码';
			}

			this.showHtml = text;
		},

		login: function() {
			var that = this;
			this.customLoading = false;

			uni.login({
				success: function(t) {
					var params = {
						code: t.code
					};

					this.$api.login.wxcode
						.request(params)
						.then(data => {
							if (data.temp_session) {
								// 不存在用户

								var s = {
									phone: parseInt(that.phone),
									code: parseInt(that.code),
									temp_session: data.temp_session
								};

								// 注册
								this.$api.login.checkCode.request(s).then(data => {
									this.customLoading = true;

									// TODO 登录后处理
								});
							} else {
								// 存在用户
								// TODO 登录后处理
							}
						})
						.then(() => {
							this.customLoading = true;
						});
				}
			});
		}
	}
};
</script>
<style>
.loginBox,
page {
	height: 100%;
}

.loginBox {
	background-color: #eee;
}

.codeBox,
.phoneBox {
	display: flex;
	background-color: #fff;
	height: 74rpx;
	margin-bottom: 18rpx;
	align-items: center;
	padding: 0 38rpx 0 60rpx;
}

.send {
	line-height: 74rpx;
}

.text {
	padding: 44rpx 38rpx 0 60rpx;
	line-height: 50rpx;
	margin-bottom: 76rpx;
}

.login {
	background-color: #f06e43;
	margin: 0 30rpx;
	color: #fff;
}

.logins {
	background-color: rgba(240, 110, 67, 0.4);
}

.height24 {
	height: 24rpx;
}

.flex1 {
	flex: 1;
	height: 74rpx;
}

.font-28 {
	font-size: 28rpx;
}

.font-25 {
	font-size: 25rpx;
}

.mar-r40 {
	margin-right: 40rpx;
}

.sendWord {
	color: #f06e43;
}

.sendWord1 {
	color: #b6b6b6;
}
</style>
