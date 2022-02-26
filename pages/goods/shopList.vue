<template>
	<view>
		<!-- 		<view class="swiper-container">
			<swiper @change="changeImg" class="swiper_box" nextMargin="40rpx" previousMargin="40rpx" :style="'height: ' + (windowHeight + 'px') + ';'">
				<swiper-item @tap="jumpDetail" :data-id="item.id" v-for="(item, index) in shop.items" :key="index">
					<view class="newName">{{ item.name }}</view>
					<view class="newPriceInfo">{{ item.price_info }}</view>
					<image class="slide-image" :src="item.list_img" mode="aspectFill" :style="'height: ' + (windowHeight + 'px') + ';width: 650rpx;'"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="fixFoot">
			<view class="line"></view>
			<view class="data">{{ current }}/{{ shop.items.length }}</view>
			<view class="line"></view>
		</view> -->

<!-- 		<view class="card-item">
			<image class="image" src="../../static/image/1.jpg"></image>
			<view class="text">家长菜 111元</view>
		</view>

		<view class="card-item">
			<image class="image" src="../../static/image/1.jpg"></image>
			<view class="text">家长菜 111元</view>
		</view>

		<view class="card-item">
			<image class="image" src="../../static/image/1.jpg"></image>
			<view class="text">家长菜 111元</view>
		</view> -->
		
	<!-- 	<view class="card-item" style="margin-top: 0rpx;">
			<image class="image" src="../../static/mock/goods_1.png"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">龙皇献彩卷 <view style="font-size: 30rpx;margin-left: 12rpx;">199元</view></view></view>
		</view>
		
		<view class="card-item">
			<image class="image" src="../../static/mock/goods_2.png"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">红袍添喜庆 <view style="font-size: 30rpx;margin-left: 12rpx;">299元</view></view></view>
		</view>
		
		<view class="card-item">
			<image class="image" src="../../static/mock/goods_3.png"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">喜鹊报佳音 <view style="font-size: 30rpx;margin-left: 12rpx;">499元</view></view></view>
		</view>
		</view>
		
		<view class="card-item">
			<image class="image" src="../../static/mock/goods_4.png"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">带子共欢聚 <view style="font-size: 30rpx;margin-left: 12rpx;">299元</view></view></view>
		</view>
		
		<view class="card-item">
			<image class="image" src="../../static/mock/goods_5.png"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">群龙贺新喜 <view style="font-size: 30rpx;margin-left: 12rpx;">399元</view></view></view>
		</view> -->
		
<!-- 		<view class="card-item">
			<image class="image" src="https://cdn.idachu.com/uimgs/201906/b5b76a95cbf961e724ffe3373e4f97b6.jpg"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">家长菜 <view style="font-size: 30rpx;margin-left: 12rpx;">199元</view></view></view>
		</view>
		 -->
<!-- 		<view class="card-item">
			<image class="image" src="../../static/image/1.jpg"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">家长菜 <view style="font-size: 30rpx;margin-left: 12rpx;">199元</view></view></view>
		</view>

		<view class="card-item">
			<image class="image" src="https://cdn.idachu.com/uimgs/201906/b5b76a95cbf961e724ffe3373e4f97b6.jpg"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">家长菜 <view style="font-size: 30rpx;margin-left: 12rpx;">199元</view></view></view>
		</view>
		
		<view class="card-item">
			<image class="image" src="../../static/image/1.jpg"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle"><view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">家长菜 <view style="font-size: 30rpx;margin-left: 12rpx;">199元</view></view></view>
		</view>
		 -->

		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			cateId: '',
			shop: {
				items: []
			},
			current: 1,
			windowHeight: ''
		};
	},
	onLoad: function(a) {
		this.cateId = a.id;
		var t = uni.getSystemInfoSync();
		this.windowHeight = t.windowHeight - 40;

		this.getData();
	},
	methods: {
		getData: function(t) {
			var that = this;

			this.$api.goods.partyList
				.request({
					cateId: this.cateId
				})
				.then(data => {
					uni.setNavigationBarTitle({
						title: data.name,
						success: function() {
							uni.hideNavigationBarLoading();
						}
					});

					this.shop = data;
					app.globalData.dates = data.dates;
				});
		},

		jumpDetail: function(a) {
			uni.navigateTo({
				url: '/pages/goods/shopDetail?id=' + a.currentTarget.dataset.id
			});
		},

		changeImg: function(a) {
			this.setData({
				current: a.detail.current + 1
			});
		}
	}
};
</script>
<style>
page {
	background-color: #fff;
}

.card-item {
	position: relative;
	margin-top: 30rpx;
	margin-left: 20rpx;
	width: 710rpx;
	height: 300rpx;
	background-color: #ffffff;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 1px 1px 4px 2px rgba(23, 23, 23, 0.4);
}

.card-item .image {
	z-index: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
}

.card-item .text {
	z-index: 1;
	position: relative;
	color: #fff;
	padding: 45px 30px;
	font-size: 30px;
	font-weight: 300;
	-webkit-transform: skew(-10deg, 0deg);
	transform: skew(-10deg, 0deg);
	position: relative;
	text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.swiper-container {
	width: 750rpx;
	position: relative;
}

.swiper_box {
	width: 100%;
	text-align: center;
}

.newName {
	top: 10%;
	left: 50rpx;
	font-size: 50rpx;
	width: 20rpx;
}

.newName,
.newPriceInfo {
	position: absolute;
	color: #fff;
}

.newPriceInfo {
	bottom: 40rpx;
	left: 0;
	font-size: 28rpx;
	width: 100%;
}

swiper-item image {
	width: 100%;
	display: inline-block;
	overflow: hidden;
}

.head {
	background: none no-repeat;
	background-size: 100% auto;
	margin: 0 0 10px;
	padding: 22% 0;
	height: 0;
	overflow: hidden;
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
	color: #fff;
	font-size: 16px;
}

.menu {
	font-size: 16px;
	color: #484848;
}

.list,
.menu {
	margin: 10rpx;
}

.item {
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #ddd;
}

.item .imgCon {
	width: 100px;
	overflow: hidden;
}

.item .imgCon .img {
	width: 100%;
	height: 100%;
}

.content {
	flex: 1;
	margin-left: 20rpx;
}

.content .title {
	font-size: 15px;
	font-weight: 700;
}

.content .desc,
.content .price {
	font-size: 14px;
	margin-top: 5px;
}

.content .price text {
	color: #f06e43;
}

.fixFoot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}

.fixFoot .line {
	width: 150rpx;
	height: 1px;
	background-color: #000;
}

.fixFoot .data {
	font-size: 30rpx;
	margin: 0 20rpx;
}

.ui-card-fixedTitle {
	padding: 10rpx 20rpx;
	position: absolute;
	width: calc(100% - 40rpx);
	left: 0;
	bottom: 0;
	z-index: 2;
}

/* [class*='bg-mask']::before {
	content: '';
	border-radius: inherit;
	width: 100%;
	height: 100%;
	position: absolute !important;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 0;
} */

/* .ui-card-fixedTitle::before {
	opacity: 0.6;
} */

/* .bg-mask-bottom {
	padding: 20rpx 20rpx;
	background-color: transparent;
	background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.618), #000);
	background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.618), #000);
} */

.text-cut {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	
	color: #fff;
	background-color: rgba(0,0,0,0.2);
	/* background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.618), #000); */
	/* background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3), #7a7a7a); */
}
</style>
