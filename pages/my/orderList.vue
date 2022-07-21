<template>
	<view class="container">
		<view class="status-box">
			<view @tap="statusTap" :class="'status-label ' + (index == currentType ? 'active' : '')" :data-index="index" v-for="(item, index) in statusType" :key="index">
				{{ item }}
				<view></view>
			</view>
		</view>

		<view class="no-order" v-if="newTabel.length <= 0">
			<image class="no-order-img" src="/static/images/no-order.png"></image>
			<view class="text">暂无订单</view>
		</view>

		<view class="order-list" v-if="newTabel.length > 0">
			<block v-for="(item, index) in newTabel" :key="index">
				<view class="a-order" :key="index">
					<view @tap="jumpDetail" class="order-date" :data-id="item.id">
						<view class="providerTitle">下单时间:{{ item.created_at }}</view>
						<view class="status red">{{ item.status_text }}</view>
					</view>

					<view @tap="jumpDetail" class="goods-img-container" :data-id="item.id">
						<view class="img-box"><image class="goods-img" :src="fileHost + item.pic"></image></view>
						<view class="content">
							<view class="titleName">{{ item.name }}</view>
							<view class="date" style="margin-top: 5rpx;">价格 : ¥{{ item.price | moneyFrom }}</view>
							<view class="date" style="margin-top: 5rpx;">地址 : {{ item.address }}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import userServe from '@/libs/userServe.js';
import order from '../../mixin/order';
import table from '@/mixin/table.js';
import hostConst from '@/config/hostConst.js';

export default {
	mixins: [order, table],
	data() {
		return {
			fileHost: hostConst.fileHost2,
			statusType: ['全部', '待接单', '已接单'], //, '已完成'
			currentType: 0,
			length: 0,
			table: {},
			newTabel: []
		};
	},
	onLoad() {
		this.tableInit(this);
	},
	onShow: function() {
		if (userServe.checkUserLogin()) {
			this.tableRequest(this, this.getOrderList, 'reset');
		}
	},
	onPullDownRefresh: function() {
		uni.stopPullDownRefresh();

		if (userServe.checkUserLogin()) {
			this.tableRequest(this, this.getOrderList, 'reset');
		}
	},
	onReachBottom() {
		this.tableRequest(this, this.getOrderList);
	},
	methods: {
		statusTap: function(e) {
			this.currentType = e.currentTarget.dataset.index;
			// this.tableRequest(this, this.getOrderList, 'reset');
			this.newTabelChange();
		},

		getOrderList: function() {
			return new Promise((r, a) => {
				this.$api.orders.get.request().then(
					data => {
						console.log('哈哈', data);
						let statusList = {
							'-1': '已取消',
							0: '已下单',
							1: '已接单',
							10: '已完成'
						};

						let statusList2 = {
							0: 1,
							1: 2,
							10: 3
						};

						data.map(item => {
							item.price = parseFloat(item.price / 100);
							item.currentType = statusList2[item.status];
							item.status_text = statusList[item.status];
							return item;
						});

						setTimeout(() => {
							this.newTabelChange();
						}, 100);
						r(data);
					},
					err => {
						a();
					}
				);
			});
		},

		newTabelChange() {
			let list = this.table.data;
			let newData = list.filter(item => {
				if (this.currentType == 0 || item.currentType == this.currentType) {
					return true;
				} else {
					return false;
				}
			});

			this.newTabel = newData;
		}

		// jumpDetail: function(t) {
		// 	uni.navigateTo({
		// 		url: '/pages/my/orderDetail?id=' + t.currentTarget.dataset.id
		// 	});
		// }
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
	position: sticky;
	top: 0px;
	left: 0rpx;
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
	height: calc(100vh - 98rpx);
	text-align: center;
	background-color: #fbfbfb;
	display: flex;
	align-items: center;
	justify-content: center;
}

.no-order-img {
	width: 81rpx;
	height: 96rpx;
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
	margin-bottom: 25rpx;
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

.goods-img-container {
	box-sizing: border-box;
	white-space: nowrap;
	margin-left: 30rpx;
	padding: 30rpx 0;
	width: 720rpx;
	border-top: 1rpx solid #eee;
	border-bottom: 1rpx solid #eee;
	display: flex;
	align-items: center;
}

.goods-img-container .img-box {
	width: 300rpx;
	height: 150rpx;
	overflow: hidden;
	margin-right: 20rpx;
	background-color: #f7f7f7;
	display: inline-block;
}

.goods-img-container .img-box .goods-img {
	width: 300rpx;
	height: 150rpx;
}

.goods-img {
	border-radius: 20rpx;
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
	font-size: 34rpx;
	color: #000;
}

.content .date {
	font-size: 26rpx;
	color: #818181;
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
