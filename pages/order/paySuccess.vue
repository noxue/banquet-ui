<template>
	<view class="order-pay-success">
		<view class="banner">
			<image class="image" src="@/static/images/bg-2.png"></image>
			<view v-if="isPaySuccess == 0" class="text-content">
				<view class="text-1">{{ msg }}</view>
				<image class="icon-1" src="@/static/images/icon-1.png"></image>
			</view>
			<view v-if="isPaySuccess == 1" class="text-content">
				<view class="text-1">感谢您对我们的信任与支持，欢迎下次再来！</view>
				<image class="icon-1" src="@/static/images/icon-1.png"></image>
			</view>
		</view>
		<view v-if="isPaySuccess == 0" class="text-2">正在获取支付信息...</view>
		<view v-if="isPaySuccess == 1" class="text-2">稍后平台将联系您</view>
		<view class="button-content"><view class="button-1" @click="toPagesHome">返回</view></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			orderId: '131231',
			info: {
				order_id: '',
				name: '',
				price: ''
			},
			isPaySuccess: 0, // 是否支付成功
			msg: '',
			showType: 1, // 显示类型 1 支付成功  2 提交成功
			timer: ''
		};
	},
	onLoad(option) {
		this.orderId = option.orderId;
		this.timer = setInterval(() => {
			this.payRequest();
		}, 1000);
	},
	onShow() {},
	onUnload() {
		if (this.timer) clearInterval(this.timer);
	},
	methods: {
		payRequest() {
			this.$api.orders.payGet
				.request(
					{},
					{
						url: this.$api.orders.payGet.url + '/' + this.orderId
					}
				)
				.then(
					data => {
						this.info = data;
						this.isPaySuccess = 1;

						if (this.timer) clearInterval(this.timer);
					},
					err => {
						this.msg = er.msg;
						this.info = error.data;
						this.isPaySuccess = 0;
					}
				);
		},
		toPagesHome() {
			uni.switchTab({
				url: '/pages/my/orderList'
			});
		}
	}
};
</script>
<style>
page {
	background: #fff;
}
</style>
<style scoped lang="scss">
.order-pay-success {
	.banner {
		position: relative;
		width: 750rpx;
		height: 465rpx;

		.image {
			width: 750rpx;
			height: 465rpx;
		}

		.text-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 465rpx;
		}

		.text-1 {
			margin-top: 219rpx;
			text-align: center;
			font-size: 28rpx;
			color: #ffffff;
		}

		.icon-1 {
			position: absolute;
			left: 50%;
			bottom: -46rpx;
			transform: translateX(-50%);
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
	}

	.text-2 {
		margin-top: 103rpx;
		text-align: center;
		font-size: 28rpx;
		color: #8e8d8d;
	}

	.button-content {
		position: fixed;
		bottom: 54rpx;

		margin-left: 40rpx;
		.button-1 {
			width: 670rpx;
			height: 90rpx;
			background-color: #f8d94a;
			border-radius: 20rpx;
			font-size: 36rpx;
			line-height: 90rpx;
			color: #ffffff;
			text-align: center;
		}

		.button-2 {
			margin-top: 46rpx;
			width: 670rpx;
			height: 90rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			border: solid 3rpx #ff3c3f;
			font-size: 36rpx;
			line-height: 90rpx;
			color: #e72528;
			text-align: center;
		}
	}
}
</style>
