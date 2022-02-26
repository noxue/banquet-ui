<template>
	<view style="padding-left: 20rpx;padding-right: 20rpx;display: flex;flex-wrap: wrap;justify-content: space-between;margin-top:-35rpx;">
		<view style="width: 340rpx;border-radius: 20rpx;margin-top: 35rpx;" v-for="(item) in 20">
			<image src="https://imgck.5156dujia.com/FkIhSzn1afo3O8DAdwtaX3mbTP4h" style="width: 100%;height: 100%;border-radius: 20rpx;width: 340rpx;height: 450rpx;"></image>
			<view>
				<view style="font-weight: 600;font-size: 30rpx;">王大厨师</view>
				<view style="font-size: 24rpx;color: #777777;margin-top: 4rpx;">擅长撸菜擅长撸菜擅长撸菜擅</view>
			</view>
		</view>
		
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
		// this.cateId = a.id;
		// var t = uni.getSystemInfoSync();
		// this.windowHeight = t.windowHeight - 40;

		// this.getData();
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
	background-color: rgba(0, 0, 0, 0.2);
	/* background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.618), #000); */
	/* background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3), #7a7a7a); */
}
</style>
