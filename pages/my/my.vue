<template>
	<view class="container">
		<view style="width: 750rpx;height: 360rpx;position: relative;">
			<image src="../../static/image/home-5.png" style="width: 750rpx;height: 360rpx"></image>
			<view class="userCon" style="display: flex;flex-direction: row;">
				<view class="b-fff user-img"><image class="head-img" src="../../static/image/header.png"></image></view>
				<view style="margin-left: 10rpx;">
					<view v-if="isLogin" class="userName">{{ userInfo.phone }}</view>
					<view v-else @tap="toPageLogin" hoverClass="loginBtn-hover" :plain="true" size="mini" type="" style="color: #fff;">未登录,点击登录</view>
					<!-- <button v-else @tap="toPageLogin" class="loginBtn" hoverClass="loginBtn-hover" :plain="true" size="mini" type="">快捷登录</button> -->
				</view>
			</view>
		</view>

		<!-- <view class="bgImgCon"><image class="bgImg" src="/static/images/user_bg.png" style="height: 390rpx;"></image></view> -->
		<!-- 		<view class="userCon">
			<view style="color: #FFFFFF;" :style="'padding-top:' + css.pageTop + 'px;'">个人中心</view>
			<view class="b-fff user-img" style="margin-top: 50rpx;"><image class="head-img" src="http://image.noxue.com/baijiayan/logo.png"></image></view>
			<view>
				<view v-if="isLogin" class="userName">{{ userInfo.phone }}</view>
				<button v-else @tap="toPageLogin" class="loginBtn" hoverClass="loginBtn-hover" :plain="true" size="mini" type="">快捷登录</button>
			</view>
		</view> -->

		<!-- 		<view style="margin-top: 15rpx;width: 100%;border-radius: 15rpx;padding:0rpx 10rpx;box-sizing: border-box;">
			<view style="background-color: #fff;width: 100%;border-radius: 15rpx;display: flex;padding: 30rpx 0rpx;">
				<view style="display: flex;flex-direction: column;width: 50%;display: flex;align-items: center;">
					<view style="font-size: 40rpx;">0</view>
					<view style="font-size: 30rpx;color: #8c8c8c;">余额</view>
				</view>
				<view style="width: 1px;background-color: #d4d4d4;"></view>
				<view style="display: flex;flex-direction: column;width: 50%;display: flex;align-items: center;" @click="toPages('/pages/my/coupon')">
					<view style="font-size: 40rpx;">0</view>
					<view style="font-size: 30rpx;color: #8c8c8c;">优惠卷</view>
				</view>
			</view>
		</view> -->

		<view style="margin: 15rpx;margin-top: 60rpx; width: 100%;border-radius: 15rpx;padding:0rpx 10rpx;box-sizing: border-box;display: flex;flex-direction: column;justify-content: center;align-items: center;">
			<view class="list wode">
				<image class="list_left" src="../../static/images/1.png"></image>
				<text class="chushi">我的会员</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @tap="toPages('/pages/my/coupon')" class="list wode">
				<image class="list_left" src="../../static/images/7.png"></image>
				<text class="chushi">我的优惠券</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="toPagesCook" class="list zhongj">
				<image class="list_left" src="../../static/images/9.png"></image>
				<text class="chushi">{{ cookText }}</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="toPagesWorkTime" class="list zhongj">
				<image class="list_left" src="../../static/images/10.png"></image>
				<text class="chushi">接单时间</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="toPages('/pages/address/list')" class="list zhongj">
				<image class="list_left" src="../../static/images/4.png"></image>
				<text class="chushi">我的地址</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="toPages('/pages/my/useHelp')" class="list zhongj">
				<image class="list_left" src="../../static/images/3.png"></image>
				<text class="chushi">使用帮助</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="toPages('/pages/my/userProtocol')" class="list zhongj">
				<image class="list_left" src="../../static/images/6.png"></image>
				<text class="chushi">用户协议</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<view @click="callPhone" class="list zhongj">
				<image class="list_left" src="../../static/images/8.png"></image>
				<text class="chushi">联系我们</text>
				<image class="list_right" src="../../static/images/fillIn_sj.png"></image>
			</view>
			<!-- 	<view style="background-color: #fff;width: 100%;border-radius: 15rpx;padding: 30rpx 0rpx;">
				<view style="display: flex;">
					<view class="item_content">
						<image class="item_icon" src="../../static/images/1.png"></image>
						<view class="item_text">我的会员</view>
					</view>
					<view class="item_content" @click="toPages('/pages/my/coupon')">
						<image class="item_icon" src="../../static/images/7.png"></image>
						<view class="item_text">优惠卷</view>
					</view>
					<view class="item_content" @click="toPages('/pages/address/list')">
						<image class="item_icon" src="../../static/images/4.png"></image>
						<view class="item_text">常用地址</view>
					</view>
				</view>
				<view style="display: flex;">
					<view class="item_content" @click="toPages('/pages/my/useHelp')">
						<image class="item_icon" src="../../static/images/3.png"></image>
						<view class="item_text">使用帮助</view>
					</view>
					<view class="item_content" @click="toPages('/pages/my/userProtocol')">
						<image class="item_icon" src="../../static/images/6.png"></image>
						<view class="item_text">用户协议</view>
					</view>
					<view class="item_content" @click="callPhone">
						<image class="item_icon" src="../../static/images/8.png"></image>
						<view class="item_text">联系我们</view>
					</view>
				</view>
				<view style="display: flex;">
					<view class="item_content" @click="toPagesCook">
						<image class="item_icon" src="../../static/images/9.png"></image>
						<view class="item_text">{{ cookText }}</view>
					</view>
					<view class="item_content" @click="toPagesWorkTime">
						<image class="item_icon" src="../../static/images/10.png"></image>
						<view class="item_text">接单时间</view>
					</view>
					<view class="item_content" @click="logout">
						<image class="item_icon" src="../../static/images/11.png"></image>
						<view class="item_text">退出登录</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 	<view style="margin-top: 30rpx;width: 100%;">
			<view style="padding: 20rpx 10rpx;width: 90%;margin-left: 5%;background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;border-radius: 10rpx;">退出登录</view>
		</view> -->
	</view>
</template>

<script>
var app = getApp();
import userServe from '../../libs/userServe.js';
import { toPageUserLoginTimer } from '../../libs/router.js';
import config from '@/config/config.js';

export default {
	data() {
		return {
			css: {
				pageTop: 0
			},
			isLogin: false,
			userInfo: {
				phone: '优厨用户',
				pic: '1.jpg', // TODO 暂时没有使用
				address: '',
				is_auth: true, // 是否是认证厨师
				cook_status: -1 // 是否是厨师
			},
			cookText: '厨师', // 厨师文本
			tel: '1000000'
		};
	},
	onLoad: function() {
		var that = this;

		uni.getSystemInfo({
			success: function(res) {
				that.css.pageTop = res.safeAreaInsets.top;

				// #ifdef MP-WEIXIN
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				that.css.pageTop = menuButtonInfo.top - 10; // TODO 先这样,计算不准确
				// #endif
			}
		});
	},
	onShow: function() {
		if (userServe.checkUserLogin()) {
			this.isLogin = true;
			this.userInfoRequest();
		} else {
			this.isLogin = false;
		}
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		if (userServe.checkUserLogin()) {
			this.userInfoRequest();
		}
	},
	methods: {
		userInfoRequest: function() {
			this.$api.users.me.request().then(data => {
				this.userInfo = data;

				if (this.userInfo.is_cook == 1) {
					this.cookText = '厨师';
				} else {
					if (this.userInfo.cook_status === 0) {
						this.cookText = '申请厨师';
					} else if (this.userInfo.cook_status === 1) {
						this.cookText = '厨师审核中';
					} else if (this.userInfo.cook_status === 2) {
						this.cookText = '厨师';
					} else if (this.userInfo.cook_status === 3) {
						this.cookText = '申请厨师';
					}
				}
			});
		},

		toPagesCook() {
			if (this.isLogin === false) {
				toPageUserLoginTimer();
				return false;
			}

			if (this.userInfo.cook_status === 0) {
				uni.navigateTo({
					url: '/pages/cook/apply/agreement'
				});
			} else {
				uni.navigateTo({
					url: '/pages/cook/apply/apply'
				});
			}
		},

		toPagesWorkTime() {
			if (this.isLogin === false) {
				toPageUserLoginTimer();
				return false;
			}

			if (this.userInfo.cook_status === 2) {
				this.toPages('/pages/cook/workTime');
			} else {
				uni.showToast({
					title: '申请成为厨师后可添加',
					icon: 'none'
				});
			}
		},

		toPages(url) {
			if (this.isLogin === true) {
				uni.navigateTo({
					url: url
				});
			} else {
				toPageUserLoginTimer();
			}
		},

		callPhone: function() {
			var that = this;

			if (config.mobile) {
				uni.makePhoneCall({
					phoneNumber: this.tel
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '敬请期待'
				});
			}
		},

		logout() {
			let that = this;
			uni.showModal({
				content: '确定退出登录',
				success(res) {
					if (res.confirm === true) {
						userServe.logout();
						that.isLogin = false;
						that.userInfo = {
							phone: '优厨用户',
							pic: '1.jpg',
							address: '',
							is_auth: false,
							is_cook: false
						};
					}
				}
			});
		},

		toPageLogin: function() {
			toPageUserLoginTimer();
		},

		toPagesApply() {
			uni.navigateTo({
				url: '/pages/cook/apply/agreement'
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
	position: absolute;
	bottom: -10rpx;
	left: 30rpx;
	z-index: 20;
	display: flex;
	justify-content: center;
	align-items: center;
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
	width: 110rpx;
	height: 110rpx;
	border-radius: 50%;
	border: 1px solid #fff;
	overflow: hidden;
}

.userName {
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

.list {
	background: #fff;
	border-radius: 14rpx;
	height: 104rpx;
	width: 690rpx;
}

.list_left {
	float: left;
	height: 48rpx;
	margin: 28rpx 0 0 18rpx;
	width: 47rpx;
}

.list .chushi {
	color: #262626;
	float: left;
	font-size: 34rpx;
	height: 104rpx;
	line-height: 104rpx;
	margin-left: 25rpx;
	width: auto;
}

.list_right {
	float: right;
	height: 34rpx;
	margin: 35rpx 20rpx 0 0;
	width: 20rpx;
}

.renzhengzhong {
	color: #ca9f58;
}

.renzhengzhong,
.shibai {
	float: left;
	font-size: 28rpx;
	height: 104rpx;
	line-height: 104rpx;
	text-align: right;
	width: 346rpx;
}

.shibai {
	color: #b32d1f;
}

.shibai image {
	height: 28rpx;
	margin-left: 10rpx;
	vertical-align: middle;
	width: 28rpx;
}

.wode {
	border-bottom: 1rpx solid #e5e5e5;
	border-radius: 14rpx 14rpx 0 0 !important;
}

.zhongj {
	border-bottom: 1px solid #e5e5e5;
	border-radius: 0rpx !important;
	margin-top: 0rpx;
}

.yuyue {
	border-radius: 0 0 14rpx 14rpx !important;
	margin-top: 0rpx !important;
}

.yijian {
	color: #429ce8;
	font-size: 30rpx;
	height: 164rpx;
	line-height: 164rpx;
	padding-bottom: 30rpx;
	text-align: center;
	width: 750rpx;
}

.weidl {
	height: 168rpx;
	width: 750rpx;
}

.weidl image {
	display: block;
	height: 66rpx;
	margin: 100rpx auto 0;
	width: 66rpx;
}

.weidl text {
	color: #e0e0e0;
	display: block;
	font-size: 26rpx;
	height: auto;
	margin-top: 10rpx;
	text-align: center;
	width: 750rpx;
}
</style>
