<template>
	<view class="container">
		<view class="bgImgCon"><image class="bgImg" src="/static/images/user_bg.png"></image></view>
		<view class="userCon">
			<view style="color: #FFFFFF;" :style="'padding-top:' + css.pageTop + 'px;'">个人中心</view>
			<!-- <view class="b-fff user-img" style="margin-top: 50rpx;"><image class="head-img" src="../../static/mock/touxiang.jpg"></image></view> -->
			<view>
				<view class="vipBtn" v-if="degree != '0'">
					<text :class="degree == '1' ? 'bg_8d55f5' : degree == '2' ? 'bg_ff003c' : degree == '3' ? 'bg_03b9ba' : 'bg_fcae19'">{{ degree == '1' ? '体验卡' : degree == '2' ? '普卡' : degree == '3' ? '银卡' : '金卡' }}VIP</text>
				</view>
				<view class="userName" v-if="cookieAuth">{{ userInfo.nickName }}</view>
				<button @tap="jumpLogin" class="loginBtn" hoverClass="loginBtn-hover" :plain="true" size="mini" type="" v-else>快捷登录</button>
			</view>
		</view>

		<view style="margin-top: 15rpx;width: 100%;border-radius: 15rpx;padding:0rpx 10rpx;box-sizing: border-box;">
			<view style="background-color: #fff;width: 100%;border-radius: 15rpx;display: flex;padding: 30rpx 0rpx;">
				<view style="display: flex;flex-direction: column;width: 50%;display: flex;align-items: center;">
					<view style="font-size: 40rpx;">2000</view>
					<view style="font-size: 30rpx;color: #8c8c8c;">余额</view>
				</view>
				<view style="width: 1px;background-color: #d4d4d4;"></view>
				<view style="display: flex;flex-direction: column;width: 50%;display: flex;align-items: center;">
					<view style="font-size: 40rpx;">5</view>
					<view style="font-size: 30rpx;color: #8c8c8c;">优惠卷</view>
				</view>
			</view>
		</view>

		<view style="margin: 15rpx;width: 100%;border-radius: 15rpx;padding:0rpx 10rpx;box-sizing: border-box;">
			<view style="background-color: #fff;width: 100%;border-radius: 15rpx;padding: 30rpx 0rpx;">
				<view style="display: flex;">
					<view class="item_content">
						<image class="item_icon" src="../../static/images/1.png"></image>
						<view class="item_text">我的会员</view>
					</view>
					<view class="item_content">
						<image class="item_icon" src="../../static/images/7.png"></image>
						<view class="item_text">优惠卷</view>
					</view>
					<view class="item_content">
						<image class="item_icon" src="../../static/images/4.png"></image>
						<view class="item_text">常用地址</view>
					</view>
				</view>
				<view style="display: flex;">
					<view class="item_content">
						<image class="item_icon" src="../../static/images/3.png"></image>
						<view class="item_text">使用帮助</view>
					</view>
					<view class="item_content">
						<image class="item_icon" src="../../static/images/6.png"></image>
						<view class="item_text">用户协议</view>
					</view>
					<view class="item_content">
						<image class="item_icon" src="../../static/images/8.png"></image>
						<view class="item_text">切换城市</view>
					</view>
				</view>
				<view style="display: flex;">
					<view class="item_content" @click="toPagesApply">
						<image class="item_icon" src="../../static/images/8.png"></image>
						<view class="item_text">申请厨师</view>
					</view>
					<view class="item_content">
						<image class="item_icon" src="../../static/images/2.png"></image>
						<view class="item_text">退出登录</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 	<view style="margin-top: 30rpx;width: 100%;">
			<view style="padding: 20rpx 10rpx;width: 90%;margin-left: 5%;background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;border-radius: 10rpx;">退出登录</view>
		</view> -->
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			css: {
				pageTop: 0
			},
			cookieAuth: false, // TODO 这里判断不正确
			addressArray: [],
			addressNndex: 0,
			userInfo: {
				// 用户信息
				nickName: '' //  用户昵称
			},
			city: null,
			degree: '0'
		};
	},
	onLoad: function() {
		var that = this;

		uni.getSystemInfo({
			success: function(res) {
				console.log('页面尺寸', res);
				that.css.pageTop = res.safeAreaInsets.top;

				// #ifdef MP-WEIXIN
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				console.log('页面尺寸', menuButtonInfo);
				that.css.pageTop = menuButtonInfo.top - 10; // TODO 先这样
				// #endif
			}
		});

		if (null == app.globalData.userInfo) {
			that.setData({
				userInfo: {
					avatarUrl: '/static/images/head.png',
					nickName: '百家宴用户'
				}
			});
		} else {
			that.setData({
				userInfo: app.globalData.userInfo
			});
		}

		this.$api.system.set.request().then(data => {
			this.addressArray = data.city;
			that.getCity(data.city);
		});

		this.getUserInfo();
	},
	onShow: function() {
		app.globalData.orderShow = null;
	},
	methods: {
		getUserInfo: function() {
			this.$api.user.info.request().then(data => {
				this.degree = data.degree;
			});
		},

		getCity: function(a) {
			var that = this;

			uni.getLocation({
				type: 'gcj02',
				success: function(t) {
					var o = t.latitude;
					var s = t.longitude;
					that.loadCity(o, s, a);
				},
				fail: function() {}
			});
		},

		loadCity: function(e, t, o) {
			var that = this;
			uni.request({
				url: 'https://api.map.baidu.com/geocoder/v2/?ak=96Vsml8Wo79ANcOHzat1KG3pQ9lLWeQY&location=' + e + ',' + t + '&output=json',
				header: {
					'Content-Type': 'application/json'
				},
				success: function(e) {
					console.log('哈哈', e);
					var t = e.data.result.addressComponent.city;
					t = t.replace('市', '');

					for (var n = 0; n < o.length; n++) {
						if (t != o[n].name || app.globalData.cityId) {
							if (app.globalData.cityId == o[n].id) {
								that.setData({
									addressNndex: n
								});
							}
						} else {
							that.setData({
								addressNndex: n
							});
							uni.setStorage({
								key: 'cityId',
								data: o[n].id,
								success: function(e) {
									app.globalData.getCityId();
								}
							});
						}
					}

					that.setData({
						city: t
					});
				}
			});
		},

		bindPickerChange: function(e) {
			var that = this;
			this.setData({
				addressNndex: e.detail.value
			});
			uni.setStorage({
				key: 'cityId',
				data: that.addressArray[e.detail.value].id,
				success: function(e) {
					app.globalData.getCityId();
				}
			});
		},

		jumpMember: function() {
			if (this.cookieAuth && '0' == this.degree) {
				uni.navigateTo({
					url: '/pages/order/balanceRecharge'
				});
			} else {
				if (this.cookieAuth && '0' != this.degree) {
					uni.navigateTo({
						url: '/pages/my/balance'
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		},

		jumpCoupon: function() {
			if (this.cookieAuth) {
				uni.navigateTo({
					url: '/pages/my/coupon'
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},

		jumpAddress: function() {
			if (this.cookieAuth) {
				uni.navigateTo({
					url: '/pages/address/list'
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},

		callPhone: function() {
			var that = this;
			uni.makePhoneCall({
				phoneNumber: that.addressArray[that.addressNndex].tel
			});
		},

		jumpHelp: function() {
			uni.navigateTo({
				url: '/pages/my/useHelp'
			});
		},

		jumpProtocol: function() {
			uni.navigateTo({
				url: '/pages/my/userProtocol'
			});
		},

		jumpLogin: function() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		
		toPagesApply(){
			uni.navigateTo({
				url:'/pages/cook/apply/agreement'
			})
		},

		exitLogin: function() {
			var that = this;
			uni.removeStorage({
				key: 'cookieAuth',
				success: function(t) {
					uni.removeStorage({
						key: 'nickName',
						success: function(t) {
							app.globalData.getCookieAuth();
							that.setData({
								degree: '0'
							});
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
					});
				}
			});
		}
	}
};
</script>
<style>
.container,
page {
	background-color: #f5f5f9;
}

.container {
	min-height: 100%;
	overflow: hidden;
	overflow-y: hidden;
	position: relative;
}

.bgImgCon {
	width: 100%;
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
}

.bgImgCon .bgImg {
	width: 100%;
	height: 360rpx;
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
}

.userCon {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30rpx 0;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 20;
}

.vipBtn {
	text-align: center;
}

.vipBtn text {
	font-size: 24rpx;
	color: #fff;
	padding: 3rpx 8rpx;
	border-radius: 4px;
}

.bg_03b9ba {
	background-color: #03b9ba;
}

.bg_ff003c {
	background-color: #ff003c;
}

.bg_8d55f5 {
	background-color: #8d55f5;
}

.bg_fcae19 {
	background-color: #fcae19;
}

.loginBtn {
	border: 1px solid #fff !important;
	color: #fff !important;
	margin-top: 20rpx;
}

.loginBtn-hover {
	border: 1px solid #f06e43 !important;
	color: #f06e43 !important;
}

.user-img {
	width: 130rpx;
	height: 130rpx;
	border-radius: 50%;
	/* box-shadow: 0rpx 0rpx 6rpx 4rpx rgba(87, 157, 255, 0.4); */
	border: 1px solid #fff;
	overflow: hidden;
}

.userName {
	margin-top: 15rpx;
	color: #fff;
	font-size: 28rpx;
}

.head-img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.cityCon,
.myCon,
.serviceCon {
	width: 100%;
	background-color: #fff;
	margin-top: 10rpx;
}

.cityCon {
	margin-bottom: 10rpx;
}

.cityCon .my-item,
.myCon .my-item,
.serviceCon .my-item {
	width: 100%;
	padding: 10rpx 0;
	border-bottom: 1px solid #eee;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	display: flex;
	align-items: center;
}

.my-item .nav-icon {
	width: 50rpx;
	height: 50rpx;
	margin: 0 20rpx;
}

.my-item .title {
	flex: 1;
	font-size: 28rpx;
	line-height: 1em;
}

.my-item .addr,
.my-item .tel {
	margin-right: 15rpx;
}

.my-item .right-icon {
	width: 40rpx;
	height: 28rpx;
}

.navigator-hover {
	color: #f06e43;
}

.item_content {
	padding: 20rpx 0rpx;
	width: 33%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.item_icon {
	width: 80rpx;
	height: 80rpx;
}

.item_text {
	margin-top: 10rpx;
	font-size: 30rpx;
	color: #505050;
}
</style>
