<template>
	<view class="container" style="background-color: #fff;">
		<view class="back" :style="'padding-top:' + css.pageTop + 'px;'" style="width: 100%;">
			<view class="banner">
				<swiper class="swiper-box" indicator-dots="true" autoplay="true" interval="4000" indicator-active-color="#e1251a" indicator-color="#fdfefe" style="height: 600rpx">
					<swiper-item v-for="(item, index) in banners" :key="index" style="height: 100%"><image @tap="jumpShop" :src="hostConst.fileHost + item.img" class="slide-image" height="100%" width="100%"></image></swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 	<view class="buttonCon" style="width: 95%;background-color: transparent;margin-top: 15rpx;padding: 0rpx;margin-top: 30rpx;">
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
		</view> -->

		<view style="position: relative;top:-110rpx; padding: 0rpx 25rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
			<image src="../../static/image/home-icon-1.png" style="width: 340rpx;height: 190rpx;" @click="toPageCustomization"></image>
			<image src="../../static/image/home-icon-2.png" style="width: 340rpx;height: 190rpx;" @click="jumpShop"></image>
			<image src="../../static/image/home-icon-3.png" style="width: 340rpx;height: 190rpx;margin-top: 25rpx;" @click="toPageCustomization"></image>
			<image src="../../static/image/home-icon-4.png" style="width: 340rpx;height: 190rpx;margin-top: 25rpx;" @click="showMessage"></image>
		</view>

		<!-- 		<view class="flex-row" style="margin-top: 35rpx;font-size:0;line-height:0">
			<view><image src="../../static/image/home-1.jpg" style="width: 280rpx;height: 300rpx;font-size:0;line-height:0" @click="toPageCustomization"></image></view>
			<view style="margin-left: 30rpx;width: 390rpx;">
				<image src="../../static/image/home-2.jpg" style="width: 390rpx;height: 140rpx;font-size:0;line-height:0" @click="jumpShop"></image>
				<image src="../../static/image/home-3.jpg" style="margin-top: 20rpx; width: 390rpx;height: 140rpx;font-size:0;line-height:0" @click="toPageCustomization"></image>
			</view>
		</view>
 -->
		<!-- 		<view style="margin-top: 40rpx;margin-bottom: 20rpx; text-align: center;font-size: 30rpx;">
			热门厨师
			<view style="margin-top: 8rpx; width: 390rpx;height: 12rpx;background-color: #dc9a47;border-radius: 20rpx;"></view>
		</view> -->

		<view style="position: relative;top: -60rpx;"><cookCard v-for="(item, index) in cookList" :info="item" :key="index"></cookCard></view>

		<!-- 	<view class="hotCon" style="width: 95%;">
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
		</view> -->
		<view style="width: 100%;height: 100rpx;"></view>
	</view>
</template>

<script>
var app = getApp();

import share from '@/mixin/share.js';
import hostConst from '@/config/hostConst.js';
import userServe from '@/libs/userServe.js';
import cookCard from '@/components/cookCard.vue';

export default {
	mixins: [share],
	components: { cookCard },
	data() {
		return {
			hostConst,
			css: {
				pageTop: 0
			},
			banners: [],
			hotList: [],
			cookList: []
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
						img: '/banner_5.jpg',
						uri: {
							url: 'party/info'
						}
					},
					{
						title: '订制家宴',
						img: '/banner_6.jpg',
						uri: {
							url: 'party/info'
						}
					},
					{
						title: '订制家宴',
						img: '/banner_7.jpg',
						uri: {
							url: 'party/info'
						}
					}
					// {
					// 	title: '订制家宴',
					// 	img: '/banner_4.jpg',
					// 	uri: {
					// 		url: 'party/info'
					// 	}
					// }
				],
				hot: [
					{
						title: '家常套餐',
						img: '/4.jpg',
						url: {
							url: 'party/info'
						}
					},
					{
						title: '烧烤外卖',
						img: '/5.jpg',
						url: {
							url: 'party/info'
						}
					}
				]
			};

			this.banners = data.banners;
			this.hotList = data.hot;

			this.cookListRequest();
			// this.$api.home.request().then(data => {
			// 	this.banners = data.banners;
			// 	this.hotList = data.hot;
			// });
		},
		cookListRequest: function() {
			this.$api.cooks.get.request().then(
				data => {
					data.map(item => {
						item.foodsList = JSON.parse(item.foods);
						return item;
					});

					this.cookList = data;
					console.log(this.cookList);
				},
				err => {}
			);
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
		},
		showMessage() {
			uni.showToast({
				icon: 'none',
				title: '敬请期待'
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
	width: 750rpx;
	height: 600rpx;
	border-radius: 0rpx;
}

.banner image {
	width: 100%;
	height: 100%;
	border-radius: 0rpx;
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
