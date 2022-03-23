<template>
	<view class="container" style="background-color: #fff;">
		<view class="back" :style="'padding-top:' + css.pageTop + 'px;'" style="width: 100%;">
			<view class="banner">
				<swiper class="swiper-box" indicator-dots="true" autoplay="true" interval="4000" indicator-active-color="#e1251a" indicator-color="#fdfefe" style="height: 340rpx">
					<swiper-item v-for="(item, index) in banners" style="height: 100%"><image @tap="jumpShop" :src="hostConst.fileHost + item.img" class="slide-image" height="100%" width="100%"></image></swiper-item>
				</swiper>
			</view>
		</view>

		<view class="buttonCon" style="width: 95%;background-color: transparent;margin-top: 15rpx;padding: 0rpx;margin-top: 30rpx;">
			<view @tap="toPageCustomization" class="leftCon" style="border-radius:20rpx;width: 47%;position: relative;height: 160rpx;">
				<view class="title" style="z-index: 10;position: absolute;left:30rpx;top: 30rpx;color: #FFFFFF;font-size: 45rpx;text-shadow: 1px 1px 1px #656565;">私人定制</view>
				<image src="/static/image/cai_2.png" style="width: 110rpx;height: 90rpx;position: absolute;right: 8rpx;bottom: 8rpx;z-index: 2;"></image>
				<image src="/static/image/top-bg1.png" style="width: 100%; height: 100%;position:relative;z-index: 0;border-radius: 20rpx;box-shadow: rgb(162, 208, 111) 0px 1px 2px;"></image>
			</view>

			<view @tap="jumpShop" class="rightCon" style="border-radius:20rpx;width: 47%;position: relative;height: 160rpx;">
				<view class="title" style="z-index: 10; position: absolute;left: 30rpx;top: 30rpx;color: #FFFFFF;font-size: 45rpx;text-shadow: 1px 1px 1px #656565;">宴会套餐</view>
				<image src="/static/image/cai_1.png" style="width: 170rpx;height: 100rpx;position: absolute;right: 8rpx;bottom: 8rpx;z-index: 2;"></image>
				<image src="/static/image/top-bg2.png" style="width: 100%; height: 100%;position:relative;z-index: 0;border-radius: 20rpx;box-shadow: rgb(229, 99, 99) 0px 1px 2px;"></image>
			</view>
		</view>

		<view class="hotCon" style="width: 95%;">
			<view class="titleCon" style="padding: 20rpx 0rpx;">
				<view class="line" style="width: 200rpx;"></view>
				<view class="title">招牌</view>
				<image src="../../static/image/chushi.png" style="width: 40rpx;height: 40rpx;"></image>
				<view class="title">菜品</view>
				<view class="line" style="width: 200rpx;"></view>
			</view>
			<view class="hotList">
				<template v-for="(item, index) in hotList">
					<view :key="index" @tap="jumpShop" :style="'background: url(' + hostConst.fileHost + item.img + ') no-repeat left top /100% 100%'" class="item"><image :src="item.img" style="width: 100%;height: 100%;"></image></view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();

import share from '@/mixin/share.js';
import hostConst from '@/config/hostConst.js';
import userServe from '@/libs/userServe.js';

export default {
	mixins: [share],
	data() {
		return {
			hostConst,
			css: {
				pageTop: 0
			},
			banners: [],
			hotList: []
		};
	},
	onLoad: function() {},
	onShow: function() {
		this.pageDataRequest();
	},
	onPullDownRefresh: function() {
		uni.stopPullDownRefresh();
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest: function() {
			let that = this;

			let data = {
				banners: [
					{
						title: '订制家宴',
						img: '/3.jpg',
						uri: {
							url: 'party/info'
						}
					}
				],
				hot: [
					{
						title: '家常套餐',
						img: '/1.jpg',
						url: {
							url: 'party/info'
						}
					},
					{
						title: '百家宴烧烤',
						img: '/2.jpg',
						url: {
							url: 'party/info'
						}
					}
				]
			};

			this.banners = data.banners;
			this.hotList = data.hot;

			// this.$api.home.request().then(data => {
			// 	this.banners = data.banners;
			// 	this.hotList = data.hot;
			// });
		},
		toPageCustomization: function() {
			if (userServe.checkUserLogin(true) === false) return false;

			uni.navigateTo({
				url: '/pages/order/chefConfimeOrder'
			});
		},
		toPageSetMeal: function() {
			if (userServe.checkUserLogin(true) === false) return false;

			uni.navigateTo({
				url: '/pages/order/balanceRecharge'
			});
		},
		jumpShop: function() {
			uni.navigateTo({
				url: '/pages/goods/shopList'
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

.banner {
	margin: 0rpx auto 0rpx;
	width: 702rpx;
	height: 340rpx;
	border-radius: 20rpx;
}

.banner image {
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
}

.swiper-item {
	height: 100%;
	border-radius: 20rpx;
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-position-x: center;
}

.back {
	/* padding: 20rpx; */
	/* background: white; */
	/* 	position: relative;
	z-index: 2; */
}

.back::after {
	/* 	content: '';
	width: 100%;
	position: absolute;
	top: 0px;
	z-index: -1;
	height: 330rpx;
	padding: 0rpx;
	background: #d92121;
	border-radius: 0px 0px 72rpx 72rpx; */
}

.timestyle {
	width: 41rpx;
	height: 41rpx;
	border-radius: 10rpx;
	color: #ffefee;
	display: flex;
	align-items: center;
	justify-content: center;
}

.u-full-content {
	background-color: #00c777;
}

.container {
	min-height: 100%;
}

.swiper-container {
	width: 750rpx;
	position: relative;
}

.swiper_box,
swiper-item image {
	width: 100%;
	height: 400rpx;
}

swiper-item image {
	display: inline-block;
	overflow: hidden;
}

.hotCon {
	width: 100%;
	background-color: #fff;
	margin-top: 20rpx;
}

.hotCon .titleCon {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10rpx 0;
}

.titleCon .line {
	height: 1px;
	width: 100rpx;
	background-color: #c3c3c3;
}

.titleCon .title {
	font-size: 28rpx;
	color: #444;
	margin: 0 10rpx;
}

.hotList {
	padding: 10rpx 20rpx;
}

.hotList .item {
	border-radius: 5px;
	margin-bottom: 20rpx;
	width: 100%;
	height: 400rpx;
	/* padding: 25% 0; */
	background-size: 100% 100%;
	box-shadow: 0rpx 0rpx 8rpx 5rpx rgba(87, 157, 255, 0.3);
}

.buttonCon {
	padding: 8px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	background-color: #fff;
	box-sizing: border-box;
}

.buttonCon .title {
	font-size: 28rpx;
}

.leftCon .imgCon,
.rightCon .imgCon {
	text-align: center;
}

.leftCon,
.rightCon {
	width: 40%;
	text-align: center;
}

.leftCon .imgCon image,
.rightCon .imgCon image {
	width: 54px;
	height: 54px;
}

.centerCon {
	width: 2px;
	height: 120rpx;
	background-color: #767676;
}
</style>
