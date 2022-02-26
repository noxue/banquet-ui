<template>
	<view class="balancePage">
		<view class="balancePrice">
			<view class="title">会员余额</view>
			<view class="price">￥{{ total }}</view>
		</view>
		<view class="fill"></view>
		<view class="list">
			<view class="DetailedTitle">余额明细</view>
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="left">
					<view class="title">{{ item.operation == 'expend' ? '消费' : item.operation == 'present' ? '赠送' : item.operation == 'recharge' ? '充值' : '退款' }}</view>
					<view class="time">{{ item.dateline }}</view>
				</view>

				<view class="right">{{ item.operation == 'expend' ? '' : '+' }}{{ item.total_fee }}</view>
			</view>
		</view>
		<view @tap="goPay" class="footBtn">充值</view>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			total: 0,
			list: []
		};
	},
	onLoad: function(t) {
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest: function() {
			this.$api.user.balance.request().then(data => {
				this.total = data.total;
			});

			this.$api.user.balanceLog.request().then(data => {
				this.list = data.result;
			});
		},

		goPay: function() {
			uni.navigateTo({
				url: '/pages/order/balanceRecharge'
			});
		}
	}
};
</script>
<style>
.balancePage,
page {
	background-color: #fff;
}

.balancePrice .title {
	text-align: center;
	font-size: 30rpx;
	margin-top: 10rpx;
}

.balancePrice .price {
	text-align: center;
	font-size: 36rpx;
	margin-top: 10rpx;
	font-weight: 700;
	padding-bottom: 20rpx;
}

.fill {
	width: 100%;
	height: 20rpx;
	background-color: #f6f6f6;
}

.list {
	padding-bottom: 40px;
}

.DetailedTitle {
	text-align: center;
	font-size: 30rpx;
	padding: 10rpx 0;
}

.list .item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 20rpx;
	border-bottom: 1px solid #eee;
}

.list .item .title {
	font-size: 30rpx;
	color: #545454;
}

.list .item .time {
	font-size: 26rpx;
	color: #545454;
	margin-top: 5rpx;
}

.list .item .right {
	font-size: 28rpx;
	color: #094;
}

.footBtn {
	background-color: red;
	color: #fff;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	line-height: 40px;
	text-align: center;
	font-size: 30rpx;
	box-sizing: border-box;
}
</style>
