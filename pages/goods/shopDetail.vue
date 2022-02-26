<template>
	<view>
		<view class="newHead">
			<image :src="shop.list_img" :style="'width: 100%;height: ' + (windowHeight + 'px') + ';'"></image>
			<view class="newName">{{ shop.name }}</view>
			<view class="headInfo">
				<view class="title">{{ shop.title }}</view>
				<view class="line"><image src="/static/images/simple_family_feast_xian.png"></image></view>
				<view class="desc">{{ shop.price_info }}</view>
			</view>
			<view class="triangle"></view>
		</view>
		<view class="newMenu">
			<view class="newTitle">
				<view class="lines"></view>
				<view class="name">宴会菜单</view>
				<view class="lines"></view>
			</view>
			<view class="foodList">
				<view class="foodItem" v-for="(item, index) in shop.menu" :key="index">
					<view class="foodTitle">
						<view class="single"></view>
						<view class="foodName">{{ item.tag_name }}</view>
						<view class="single"></view>
					</view>

					<view class="material" v-for="(itemName, idx) in item.items" :key="itemName.idx">{{ itemName }}</view>
				</view>
			</view>
		</view>
		<view>
			<view class="newTitle">
				<view class="lines"></view>
				<view class="name">菜品展示</view>
				<view class="lines"></view>
			</view>
			<view class="swiper-container">
				<view class="triangleBotoom"></view>
				<swiper :autoplay="true" class="swiper_box" indicatorActiveColor="rgba(255, 255, 255, .8)" indicatorColor="rgba(134, 151, 145, .8)" :indicatorDots="true">
					<swiper-item v-for="(item, index) in shop.imgs" :key="index"><image @tap="previewImg" class="slide-image" :data-url="item.img" height="400rpx" :src="item.img" width="750rpx"></image></swiper-item>
				</swiper>
			</view>
		</view>
		<view>
			<view class="newTitle">
				<view class="lines"></view>
				<view class="name">服务须知</view>
				<view class="lines"></view>
			</view>
			<view class="description" v-for="(item, index) in shop.description" :key="index">·{{ item }}</view>
		</view>
		<view class="fixFoot">
			<view class="priceInfo">{{ shop.price_info }}</view>
			<view @tap="jumpOrder" class="saveBtn"><view class="btn">立即预定</view></view>
		</view>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			partyId: '',
			shop: {
				list_img: '',
				name: '',
				title: '',
				price_info: '',
				menu: [],
				imgs: [],
				description: []
			},

			windowHeight: 600,
			shopImges: ''
		};
	},
	onLoad: function(a) {
		this.partyId = a.id;

		var t = uni.getSystemInfoSync();
		this.windowHeight = t.windowHeight - 40;

		uni.showNavigationBarLoading();
		this.getData();
	},
	methods: {
		getData: function(t) {
			var that = this;
			uni.showLoading();
			this.$api.goods.partyInfo
				.request({
					partyId: this.partyId
				})
				.then(data => {
					uni.setNavigationBarTitle({
						title: data.name,
						success: function() {
							uni.hideNavigationBarLoading();
						}
					});

					var images = [];
					data.imgs.map(function(a) {
						images.push(a.img);
					});

					this.shop = data;
					this.shopImges = images;
				});
		},

		jumpOrder: function() {
			var that = this;
			uni.navigateTo({
				url: '/pages/order/comboConfimeOrder?id=' + that.shop.id
			});
		},

		previewImg: function(a) {
			var that = this;
			uni.previewImage({
				current: a.currentTarget.dataset.url,
				urls: that.shopImges
			});
		}
	}
};
</script>
<style>
page {
	background-color: #fff;
	padding-bottom: 200rpx;
}

.newHead {
	position: relative;
}

.newName {
	position: absolute;
	top: 20%;
	left: 46%;
	color: #fff;
	font-size: 70rpx;
	width: 20rpx;
}

.headInfo {
	position: absolute;
	bottom: 8%;
	left: 0;
	width: 100%;
}

.headInfo .desc,
.headInfo .title {
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 30rpx;
}

.triangle {
	width: 0;
	height: 0;
	border-color: transparent transparent #fff;
	border-style: solid;
	border-width: 0 40rpx 40rpx;
	position: absolute;
	left: 45%;
	bottom: 0;
}

.newTitle {
	display: flex;
	align-items: center;
	font-size: 32rpx;
	justify-content: center;
	margin: 30rpx 0;
}

.newTitle .name {
	margin: 0 10rpx;
}

.lines {
	width: 240rpx;
	height: 6rpx;
	border-bottom: 1px solid #a4a4a4;
	border-top: 2px solid #696969;
}

.foodItem {
	text-align: center;
}

.foodItem .material {
	font-size: 28rpx;
	color: #6f6f6f;
	margin: 10rpx 0;
}

.foodTitle {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20rpx 0;
}

.foodTitle .single {
	width: 100rpx;
	height: 1px;
	background-color: #696969;
}

.foodTitle .foodName {
	font-size: 30rpx;
	margin: 0 10rpx;
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

.triangleBotoom {
	width: 0;
	height: 0;
	border-color: #fff transparent transparent;
	border-style: solid;
	border-width: 30rpx 30rpx 0;
	position: absolute;
	left: 46%;
	top: 0;
	z-index: 1000;
}

.description {
	font-size: 28rpx;
	text-align: center;
	margin: 10rpx 0;
}

.fixFoot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	display: flex;
	padding: 0 30rpx;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #e0e0e0;
	background-color: #fff;
	box-sizing: border-box;
}

.fixFoot .priceInfo {
	color: #1f1919;
	font-size: 30rpx;
}

.fixFoot .saveBtn {
	border: 1px solid #1f1919;
	border-radius: 4px;
	padding: 4rpx;
}

.fixFoot .btn {
	background-color: #1f1919;
	color: #fff;
	font-size: 30rpx;
	padding: 5rpx 10rpx;
	border-radius: 4px;
}

.head {
	background: none no-repeat;
	background-size: 100% auto;
	margin: 0 0 10px;
	padding: 22% 0;
	height: 0;
	overflow: hidden;
	position: relative;
}

.head .title {
	text-shadow: 0 0 5px red;
	margin: -36px 0 5px;
	line-height: 36px;
	font-size: 20px;
	font-weight: 400;
	color: #fff;
	text-align: center;
}

.line {
	width: 100%;
	height: 5px;
	margin: 10rpx 0;
}

.line image {
	width: 60%;
	height: 100%;
	display: block;
	margin: 0 auto;
}

.head .desc {
	text-shadow: 0 0 4px red;
	margin: 5px;
	text-align: center;
}

.head .desc,
.topPrice {
	color: #fff;
	font-size: 16px;
}

.topPrice {
	padding: 2px 6px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	border-radius: 5px;
	background-color: #f0ad4e;
}

.menu {
	font-size: 16px;
	color: #484848;
	margin: 10rpx;
}

.menuList {
	padding: 10rpx;
	overflow: hidden;
}

.menuList text {
	font-size: 14px;
	color: #484848;
}

.samllImg {
	box-sizing: border-box;
	height: 0;
	font-size: 0;
	border-right: 4px solid #fff;
	width: 25%;
	overflow: hidden;
	padding: 12.5% 0;
	margin-bottom: 15px;
	background-size: auto 100%;
	background-position: 50%;
	float: left;
}

.flow {
	font-size: 14px;
	color: #333;
}

.btnCon {
	margin: 30px 0;
}

.btnCon view {
	width: 80%;
	border-radius: 4px;
	background-color: #f06e43;
	border-color: #f06e43;
	color: #fff;
	line-height: 60rpx;
	text-align: center;
	margin: 0 auto;
	font-size: 26rpx;
}
</style>
