<template>
	<view class="container">
		<view class="status-box">
			<view @tap="statusTap" :class="'status-label ' + (index == currentType ? 'active' : '')" :data-index="index" v-for="(item, index) in statusType" :key="index">{{ item.label }}</view>
		</view>

		<view v-if="couponList.length > 0" class="order-list">
			<view class="item" v-for="(item, index) in couponList" :key="index">
				<image class="itemImgs" src="/static/images/coupon-bg-off.png" v-if="item.status == 4"></image>
				<image class="itemImgs" src="/static/images/coupon-bg.png" v-else></image>
				<view class="content">
					<view class="price">{{ item.coupon.discount }}</view>
					<view class="rightCon">
						<view class="name">{{ item.name }}</view>
						<view class="text" style="margin-top: 10rpx">· {{ item.coupon.description }}</view>
						<view class="text">· 有效期至{{ item.to }}</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else class="no-order">
			<image class="no-order-img" src="/static/images/no-order.png"></image>
			<view class="text">暂无优惠券</view>
		</view>

		<!-- <view @tap="addCoupon" class="footCon">添加</view> -->
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			statusType: [
				{
					label: '未使用',
					value: 'valid'
				},
				{
					label: '已使用',
					value: 'used'
				},
				{
					label: '已过期',
					value: 'expired'
				}
			],
			currentType: 0,
			couponList: []
		};
	},
	onShow: function() {
		// this.currentType = 0;
		// this.getCouponList();
	},
	methods: {
		getCouponList: function(o) {
			this.$api.user.coupon
				.request({
					type: this.statusType[this.currentType].value
				})
				.then(data => {
					this.couponList = data.results;
				});
		},

		statusTap: function(o) {
			var a = o.currentTarget.dataset.index;
			this.currentType = a;
			// this.getCouponList();
		},

		addCoupon: function() {
			uni.navigateTo({
				url: '/pages/my/addCoupon'
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
	width: 100%;
}

.status-box {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	margin-bottom: 10rpx;
}

.status-box .status-label {
	width: 150rpx;
	height: 100%;
	text-align: center;
	font-size: 28rpx;
	color: #353535;
	box-sizing: border-box;
	position: relative;
}

.status-box .status-label.active {
	color: #e64340;
	border-bottom: 6rpx solid #e64340;
}

.status-box .status-label .red-dot {
	width: 16rpx;
	height: 16rpx;
	position: absolute;
	left: 116rpx;
	top: 23rpx;
	background-color: #f43530;
	border-radius: 50%;
}

.no-order {
	width: 100%;
	position: absolute;
	bottom: 0;
	top: 88rpx;
	left: 0;
	right: 0;
	text-align: center;
	padding-top: 203rpx;
	background-color: #f2f2f2;
}

.no-order-img {
	width: 81rpx;
	height: 96rpx;
	margin-bottom: 31rpx;
}

.no-order .text {
	font-size: 28rpx;
	color: #999;
	text-align: center;
}

.order-list {
	width: 100%;
	margin-bottom: 40px;
}

.item {
	position: relative;
	margin-bottom: 20rpx;
}

.item,
.itemImgs {
	width: 100%;
	height: 100px;
}

.itemImgs {
	z-index: 10;
}

.content,
.itemImgs {
	position: absolute;
	top: 0;
	left: 0;
}

.content {
	width: 100%;
	height: 100px;
	z-index: 20;
	display: flex;
	align-items: center;
}

.rightCon {
	margin-left: 16rpx;
}

.price {
	color: #fff;
	font-size: 100rpx;
	padding: 30rpx 0;
	text-align: center;
	margin-left: 86rpx;
}

.name {
	color: #fff;
	font-size: 30rpx;
}

.text {
	color: #fff;
	font-size: 26rpx;
}

.footCon {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	background-color: red;
	text-align: center;
	line-height: 40px;
	color: #fff;
	font-size: 32rpx;
	z-index: 1000;
}
</style>
