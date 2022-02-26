<template>
	<view>
		<view class="swiper-container">
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
		</view>
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
</style>
