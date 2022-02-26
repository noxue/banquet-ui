<template>
	<view class="container">
		<view class="status-box">
			<view @tap="statusTap" :class="'status-label ' + (index == currentType ? 'active' : '')" :data-index="index" v-for="(item, index) in statusType" :key="index">
				{{ item }}
				<view :class="tabClass[index]"></view>
			</view>
		</view>

		<view class="no-order" v-if="orderList.length <= 0">
			<image class="no-order-img" src="/static/images/no-order.png"></image>
			<view class="text">暂无订单</view>
		</view>

		<view class="order-list" v-if="orderList.length > 0">
			<view class="a-order" v-for="(item, index) in orderList" :key="index">
				<view @tap="jumpDetail" class="order-date" :data-id="item.id">
					<image class="providerImg" :src="item.kitchener.head_small" v-if="item.kitchener.head_small"></image>
					<image class="providerImg" src="/static/images/no_user.png" v-if="!item.kitchener.head_small"></image>
					<view class="providerTitle">{{ item.kitchener.name ? item.kitchener.name : '未分配厨师' }}</view>
					<view class="status red">{{ item.status_text.state }}</view>
				</view>

				<view @tap="jumpDetail" class="goods-img-container" :data-id="item.id">
					<view class="img-box"><image class="goods-img" :src="item.goods_images"></image></view>
					<view class="content">
						<view class="titleName">{{ item.goods_name }}</view>
						<!-- <view class="date" style="margin-top: 5rpx;">就餐时间 : {{ item.date }}</view> -->
					</view>
				</view>

				<view class="price-box">
					<view class="total-price">实付：¥ {{ item.pay_price }}</view>
					<view @tap="cancelOrderTap" class="btn cancel-btn" :data-id="item.id" v-if="item.status == 5">取消订单</view>
					<view @tap="toPayTap" class="btn topay-btn" :data-id="item.id" v-if="item.status == 5">马上付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();

import order from '../../mixin/order';

export default {
	mixins: [order],
	data() {
		return {
			statusType: ['全部', '待接单', '已接单'],
			currentType: 0,
			tabClass: ['', '', '', '', ''],
			orderList: [],
			length: 0,
			fslse: ''
		};
	},
	onLoad: function(t) {},
	onReady: function() {},
	onShow: function() {
		if (app.globalData.orderShow) {
			uni.switchTab({
				url: '/pages/my/my'
			});
		} else {
			this.getOrderList();
		}
	},
	onPullDownRefresh: function() {
		this.getOrderList();
	},
	methods: {
		statusTap: function(e) {
			console.log('e', e);
			this.currentType = e.currentTarget.dataset.index;
			this.getOrderList();
		},

		getOrderList: function() {
			this.$api.user.orderList.request({ orderType: this.currentType }).then(data => {
				this.orderList = data.result;
			});
		},

		cancelOrderTap: function(e) {
			let that = this;
			this.orderCancel(e.currentTarget.dataset.id, () => {
				app.globalData.showToast('取消成功', 'success');
				that.getOrderList(app.globalData.order.myOrder);
			});
		},

		orderDetail: function(t) {
			var e = t.currentTarget.dataset.id;
			uni.navigateTo({
				url: '/pages/order-details/index?id=' + e
			});
		},

		toPayTap: function(t) {
			uni.navigateTo({
				url: '/pages/order/pay?id=' + t.currentTarget.dataset.id
			});
		},

		jumpDetail: function(t) {
			uni.navigateTo({
				url: '/pages/my/orderDetail?id=' + t.currentTarget.dataset.id
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
}

.order-list .a-order {
	width: 100%;
	background-color: #fff;
	margin-bottom: 10rpx;
}

.order-list .a-order .order-date {
	padding: 0 30rpx;
	height: 88rpx;
	display: flex;
	font-size: 26rpx;
	color: #000;
	align-items: center;
}

.order-list .a-order .order-date .red {
	font-size: 26rpx;
	color: #e64340;
}

.a-order .goods-info,
.goods-img-container {
	width: 720rpx;
	margin-left: 30rpx;
	border-top: 1rpx solid #eee;
	border-bottom: 1rpx solid #eee;
	padding: 30rpx 0;
	display: flex;
	align-items: center;
}

.goods-info .img-box {
	overflow: hidden;
	margin-right: 30rpx;
	background-color: #f7f7f7;
}

.goods-img-container .img-box .goods-img,
.goods-info .img-box,
.goods-info .img-box .goods-img {
	width: 120rpx;
	height: 120rpx;
}

.goods-img {
	border-radius: 20rpx;
}

.goods-info .goods-des {
	width: 540rpx;
	height: 78rpx;
	line-height: 39rpx;
	font-size: 26rpx;
	color: #000;
	overflow: hidden;
}

.goods-img-container {
	height: 180rpx;
	box-sizing: border-box;
	white-space: nowrap;
}

.goods-img-container .img-box {
	width: 120rpx;
	height: 120rpx;
	overflow: hidden;
	margin-right: 20rpx;
	background-color: #f7f7f7;
	display: inline-block;
}

.order-list .a-order .price-box {
	position: relative;
	width: 720rpx;
	height: 100rpx;
	margin-left: 30rpx;
	box-sizing: border-box;
	padding: 20rpx 30rpx 20rpx 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
}

.order-list .a-order .price-box .total-price {
	font-size: 26rpx;
	color: #e64340;
}

.a-order .price-box .btn {
	width: 166rpx;
	height: 60rpx;
	box-sizing: border-box;
	text-align: center;
	line-height: 60rpx;
	border-radius: 6rpx;
	margin-left: 20rpx;
}

.a-order .price-box .cancel-btn {
	border: 1rpx solid #ccc;
	position: absolute;
	right: 216rpx;
	top: 20rpx;
}

.a-order .price-box .topay-btn {
	border: 1px solid #e64340;
	color: #e64340;
}

.content .titleName {
	font-size: 30rpx;
	color: #000;
}

.content .date {
	font-size: 26rpx;
	color: #444;
	margin-top: 5rpx;
}

.providerImg {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
}

.providerTitle {
	flex: 1;
	margin-left: 10rpx;
}
</style>
