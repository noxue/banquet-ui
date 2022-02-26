<template>
	<view class="orderPage">
		<view class="downTimes" v-if="orderDetail.status == 5">支付剩余时间 : {{ downTimes }}</view>
		<view class="headCon">
			<view class="title">类型 : {{ orderDetail.package_name }}/{{ orderDetail.pay_price }}元</view>
			<view class="address">服务地址 : {{ orderDetail.area }}{{ orderDetail.community }}{{ orderDetail.door_number }}</view>
			<view class="address">
				联系人 : {{ orderDetail.name }}
				<text>{{ orderDetail.phone }}</text>
			</view>
			<view class="address">用餐时间 : {{ orderDetail.date }}</view>
		</view>

		<view class="couponCons">
			<view class="my-item">
				<view class="title">优惠券</view>
				<picker @change="bindPickerChange" :range="couponList" rangeKey="name" :value="mealIndex">
					<view class="picker">{{ couponList[mealIndex].name }}</view>
				</picker>
				<image class="right-icon" src="/static/images/arrow.png"></image>
			</view>
		</view>

		<view class="payCon">
			<view class="payTitle">支付方式</view>
			<view class="payList">
				<view class="wxpay" @tap="choosePay(1)">
					<image class="typeImg" src="/static/images/icon_wechat.png"></image>
					<view class="content">
						<view class="payName">微信支付</view>
						<view class="dec">推荐安装有微信的用户使用</view>
					</view>
					<image v-if="payType == 1" class="chooseImg" src="/static/images/adress-icon_03@Android.png"></image>
					<image v-else class="chooseImg" src="/static/images/adress-icon_10@Android.png"></image>
				</view>
				<view v-if="degree != '0'" @tap="choosePay(2)" class="wxpay">
					<image class="typeImg" src="/static/images/icon_vip.png"></image>
					<view class="content">
						<view class="payName">余额支付</view>
						<view class="dec">推荐会员用户使用</view>
					</view>
					<image v-if="payType == 2" class="chooseImg" src="/static/images/adress-icon_03@Android.png"></image>
					<image v-else class="chooseImg" src="/static/images/adress-icon_10@Android.png"></image>
				</view>
				<view v-else @tap="jumpMember" class="wxpay">
					<image class="typeImg" src="/static/images/coupons.png"></image>
					<view class="content">
						<view class="payName">开通会员</view>
						<view class="dec">推荐开通会员支付</view>
					</view>
					<image class="right-icon" src="/static/images/arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="price">实付: ￥{{ orderDetail.pay_price }}</view>
			<view @tap="toPay" class="payBtns">立即支付</view>
		</view>
	</view>
</template>

<script>
var app = getApp();

export default {
	data() {
		return {
			mealIndex: 0,
			couponList: [
				{
					name: '没有可用的优惠券',
					id: null,
					discount: 0
				}
			],
			payType: 1,
			orderDetail: null,
			orderId: null,
			downTimes: 0,
			degree: 0
		};
	},
	onLoad: function(a) {
		this.orderId = a.id;
		this.getDetail();
		this.getUserInfo();
	},

	methods: {
		// 获取详情
		getDetail: function() {
			this.$api.order.payDetail.request({ orderId: this.orderId }).then(data => {
				this.orderDetail = data;
				this.getCouponList();
				this.payDownTime(data.downtime);
			});
		},

		// 获取优惠卷列表
		getCouponList: function() {
			var that = this;

			this.$api.user.coupon.request().then(data => {
				var o = [];

				if (0 == data.total) {
					o = [
						{
							name: '没有可用的优惠券',
							id: null,
							discount: that.orderDetail.package_price
						}
					];
				} else {
					o = [
						{
							name: '你有' + data.total + '张可用的优惠券',
							id: null,
							discount: that.orderDetail.package_price
						}
					];
				}

				var d = data.results;
				d.map(function(a, e) {
					a.name = '￥' + a.discount + '/' + a.name;

					if (that.orderDetail.coupon && that.orderDetail.coupon.id == a.id) {
						that.setData({
							mealIndex: e + 1
						});
					}
				});
				var i = o.concat(d);

				that.couponList = i;
			});
		},

		// 获取用户信息->余额
		getUserInfo: function() {
			this.$api.user.info.request().then(data => {
				this.degree = data.degree;
			});
		},

		// 选择支付
		choosePay: function(type) {
			this.payType = type;
		},

		// 优惠卷发生变化
		bindPickerChange: function(a) {
			console.log('picker发送选择改变，携带值为', a.detail.value);

			if (0 == a.detail.value) {
				this.orderDetail.pay_price = parseFloat(this.couponList[a.detail.value].discount);
			} else {
				this.orderDetail.pay_price = this.couponList[0].discount - parseFloat(this.couponList[a.detail.value].discount);
			}

			this.setData({
				mealIndex: a.detail.value,
				orderDetail: this.orderDetail
			});
		},

		// 立即支付
		toPay: function() {
			var that = this;

			this.$api.order.payConfirm
				.request({
					id: that.orderId,
					pay_method: that.payType,
					coupon_id: that.couponList[that.mealIndex].id ? that.couponList[that.mealIndex].id : null
				})
				.then(data => {
					if (1 == that.payType) {
						that.wxpay();
					} else {
						that.balancePays();
					}
				});
		},

		// 微信支付
		wxpay: function() {
			var that = this;

			this.$api.order.pay.request({ orderId: that.orderId, type: 'wx' }).then(data => {
				uni.requestPayment({
					timeStamp: String(data.timeStamp),
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					success: function(a) {
						uni.showModal({
							title: '提示',
							content: '支付成功',
							showCancel: false,
							success: function(a) {
								if (a.confirm) {
									uni.redirectTo({
										url: '/pages/my/orderDetail?id=' + that.orderId
									});
								}
							}
						});
					},
					fail: function(a) {
						uni.showModal({
							title: '提示',
							content: '支付取消或失败',
							showCancel: false,
							success: function(a) {
								a.confirm;
							}
						});
					}
				});
			});
		},

		// 余额支付
		balancePays: function() {
			var that = this;

			this.$api.order.pay.request({ orderId: that.orderId, type: 'balance' }).then(data => {
				uni.redirectTo({
					url: '/pages/my/orderDetail?id=' + that.orderId
				});
			});
		},

		payDownTime: function(a) {
			var t = a;
			var that = this;
			var o = setInterval(function() {
				if (0 == --t) {
					clearInterval(o);
					that.cancelOrderPost();
					that.setData({
						downTimes: 0
					});
				}

				parseInt(t / 60 / 60 / 24);
				var a = parseInt((t / 60 / 60) % 24);
				var d = parseInt((t / 60) % 60);
				var i = parseInt(t % 60);
				if (a < 10) {
					a = '0' + a;
				}

				if (d < 10) {
					d = '0' + d;
				}

				if (i < 10) {
					i = '0' + i;
				}

				that.setData({
					downTimes: d + '分钟' + i + '秒'
				});
			}, 1000);
		},

		cancelOrderPost: function() {
			var that = this;

			this.$api.order.cancel
				.request({
					orderId: that.orderId
				})
				.then(data => {
					uni.showModal({
						title: '订单超时,已自动取消',
						content: '',
						showCancel: false,
						success: function(a) {
							if (a.confirm) {
								uni.navigateBack({});
							}
						}
					});
				});
		},

		// 加入会员
		jumpMember: function() {
			uni.navigateTo({
				url: '/pages/order/balanceRecharge'
			});
		}
	}
};
</script>
<style>
.orderPage,
page {
	background-color: #f5f5f9;
}

.downTimes {
	width: 100%;
	padding: 15rpx 0;
	background-color: #fde8d4;
	color: #de832a;
	text-align: center;
	font-size: 24rpx;
}

.headCon {
	padding: 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.headCon .title {
	color: #000;
	font-size: 34rpx;
}

.headCon .address {
	color: #444;
	font-size: 28rpx;
	margin-top: 15rpx;
}

.couponCons {
	padding: 0 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.couponCons .my-item {
	width: 100%;
	padding: 10rpx 0;
	border-bottom: 1px solid #f5f5f5;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	display: flex;
	align-items: center;
}

.right-icon {
	width: 40rpx;
	height: 28rpx;
}

picker {
	height: 100%;
	flex: 1;
	text-align: right;
	margin-right: 10rpx;
}

.payCon {
	background-color: #fff;
}

.payTitle {
	border-bottom: 1px solid #f5f5f5;
	padding: 10rpx 20rpx;
	color: #000;
	font-size: 32rpx;
}

.payList {
	padding: 20rpx;
}

.wxpay {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f5f5f5;
	padding: 10rpx 0;
}

.wxpay .typeImg {
	width: 80rpx;
	height: 80rpx;
}

.wxpay .content {
	flex: 1;
	margin-left: 10rpx;
}

.wxpay .content .payName {
	color: #000;
	font-size: 32rpx;
}

.wxpay .content .dec {
	color: #444;
	font-size: 26rpx;
	margin-top: 10rpx;
}

.wxpay .chooseImg {
	width: 60rpx;
	height: 60rpx;
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	background-color: #fff;
	width: 100%;
	display: flex;
	height: 100rpx;
	align-items: center;
	justify-content: space-between;
	padding: 0 50rpx;
	box-sizing: border-box;
}

.footer .price {
	color: red;
	font-size: 32rpx;
}

.footer .payBtns {
	background-color: red;
	color: #fff;
	font-size: 32rpx;
	padding: 10rpx 40rpx;
	border-radius: 6px;
}
</style>
