<template>
	<view class="orderDetail">
		<view class="downTimes" v-if="orderDetail.status == 5">支付剩余时间 : {{ downTimes }}</view>
		<view class="module">
			<view class="statusCon">
				<view class="status">
					<view class="name">{{ orderDetail.status_text.name }}</view>
					<view class="title">{{ orderDetail.status_text.title }}</view>
				</view>
				<view @tap="jumpOrderStatus" class="allStatus">全部状态</view>
			</view>
			<view class="infoCon">
				<view class="info">
					<view class="user">联系人: {{ orderDetail.name }}</view>
					<view class="phone">{{ orderDetail.phone }}</view>
				</view>
				<view class="addressCon">
					<view class="addressTitle">服务地址:</view>
					<view class="address">{{ orderDetail.area }}{{ orderDetail.community }}{{ orderDetail.door_number }}</view>
				</view>
			</view>
		</view>
		<view class="module">
			<view class="order-date">
				<image class="providerImg" :src="orderDetail.kitchener.head_small" v-if="orderDetail.kitchener.head_small"></image>
				<image class="providerImg" src="/static/images/no_user.png" v-if="!orderDetail.kitchener.head_small"></image>
				<view class="providerTitle">{{ orderDetail.kitchener.name ? orderDetail.kitchener.name : '未分配厨师' }}</view>
			</view>
			<view class="shopCon">
				<view class="shopInfo">
					<view class="shopTitle">类型: {{ orderDetail.package_name }}/{{ orderDetail.pay_price }}元</view>
					<view>时间: {{ orderDetail.date }}</view>
				</view>
				<image class="imgCon" :src="orderDetail.parti_item.first_img"></image>
			</view>
		</view>
		<view class="module">
			<view class="payItem">
				<view class="payTitle">支付方式</view>
				<view class="payRes" v-if="orderDetail.pay_status == 0">未支付</view>
				<view class="payRes" v-else>{{ orderDetail.pay_method == 1 ? '微信支付' : orderDetail.pay_type == 2 ? '支付宝支付' : '余额支付' }}</view>
			</view>
			<view class="payItem">
				<view class="payTitle">订单金额</view>
				<view class="payRes">{{ orderDetail.package_price }}元</view>
			</view>
			<view class="payItem" v-if="orderDetail.coupon">
				<view class="payTitle">优惠券</view>
				<view class="payRes">-{{ orderDetail.coupon.discount }}元</view>
			</view>
			<view class="payItem">
				<view class="payTitle">应付</view>
				<view class="payRes1">{{ orderDetail.pay_price }}元</view>
			</view>
		</view>
		<view class="footBtnCon" v-if="orderDetail.status == 5">
			<view @tap="cancelOrderTap" class="cancelBtn">取消订单</view>
			<view @tap="toPayTap" class="payBtn">去支付</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
import order from '@/mixin/order.js';
export default {
	mixins: [order],
	data() {
		return {
			orderId: null,
			downTimes: 0,
			timerSign: null, // 定时器标志
			orderDetail: {
				status: 0,
				status_text: {
					name: '',
					title: ''
				},
				name: '',
				phone: '',
				area: '',
				community: '',
				door_number: '',
				kitchener: {
					head_small: '',
					name: false
				},
				package_name: '',
				pay_price: '',
				date: '',
				parti_item: {
					first_img: ''
				},
				pay_status: 0,
				pay_method: 0,
				pay_type: 0,
				package_price: '',
				coupon: {
					discount: ''
				}
			}
		};
	},
	onLoad: function(t) {
		this.orderId = t.id;
	},
	onShow: function() {
		this.getDetail();
	},
	onPullDownRefresh: function() {
		this.getDetail();
	},

	methods: {
		getDetail: function(a) {
			this.$api.user.orderDetail.request({ orderId: this.orderId }).then(data => {
				this.orderDetail = data;
				this.downTime(data.downtime);
			});
		},

		cancelOrderTap: function(t) {
			console.log('取消订单');
			let that = this;
			this.orderCancel(this.orderId, () => {
				app.globalData.showToast('取消成功', 'success');
				that.getDetail(that.orderId);
				// uni.showModal({
				// 	title: '订单超时,已自动取消',
				// 	content: '',
				// 	showCancel: false,
				// 	success: function(t) {
				// 		if (t.confirm) {
				// 			that.getDetail(that.orderId);
				// 		}
				// 	}
				// });
			});
		},

		/**
		 * 倒计时
		 * @param {Object} t
		 */
		downTime: function(t) {
			if (this.timerSign) {
				clearInterval(timerSign);
				this.timerSign = null;
			}

			if (0 != t) {
				var a = t;
				var that = this;
				this.timerSign = setInterval(function() {
					a--;
					console.log(a);

					if (0 == a) {
						clearInterval(o);
						that.cancelOrderPost();
						that.setData({
							downTimes: 0
						});
					}

					parseInt(a / 60 / 60 / 24);
					var t = parseInt((a / 60 / 60) % 24);
					var n = parseInt((a / 60) % 60);
					var r = parseInt(a % 60);
					if (t < 10) {
						t = '0' + t;
					}

					if (n < 10) {
						n = '0' + n;
					}

					if (r < 10) {
						r = '0' + r;
					}

					that.setData({
						downTimes: n + '分钟' + r + '秒'
					});
				}, 1000);
			}
		},

		toPayTap: function() {
			uni.navigateTo({
				url: '/pages/order/pay?id=' + this.orderId
			});
		},

		jumpOrderStatus: function() {
			uni.navigateTo({
				url: '/pages/my/orderStatus?id=' + this.orderId
			});
		}
	}
};
</script>
<style>
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

.module {
	background-color: #fff;
	padding: 10rpx 0 10rpx 20rpx;
	margin-bottom: 20rpx;
}

.statusCon {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f5f5f5;
	padding-bottom: 10rpx;
	padding-right: 20rpx;
}

.statusCon .status {
	flex: 1;
}

.statusCon .status .name {
	color: red;
	font-size: 32rpx;
}

.statusCon .status .title {
	color: #999;
	font-size: 28rpx;
	margin-top: 10rpx;
}

.allStatus {
	border: 1px solid red;
	border-radius: 4px;
	color: red;
	font-size: 26rpx;
	padding: 8rpx 16rpx;
}

.infoCon {
	color: #000;
	font-size: 26rpx;
	padding-right: 20rpx;
}

.infoCon .info {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0 10rpx;
}

.infoCon .addressCon {
	padding: 10rpx 0;
}

.infoCon .addressCon,
.order-date {
	display: flex;
}

.order-date {
	height: 88rpx;
	font-size: 26rpx;
	color: #000;
	align-items: center;
	border-bottom: 1px solid #f5f5f5;
}

.providerImg {
	width: 40rpx;
	height: 40rpx;
}

.providerTitle {
	flex: 1;
	margin-left: 10rpx;
}

.shopCon {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 20rpx 20rpx 0;
	border-bottom: 1px solid #f5f5f5;
}

.shopTitle {
	margin-bottom: 10rpx;
}

.shopCon .imgCon {
	width: 100rpx;
	height: 100rpx;
}

.payItem,
.shopInfo {
	color: #000;
	font-size: 26rpx;
}

.payItem {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #f5f5f5;
	padding: 20rpx 20rpx 20rpx 0;
}

.payRes1 {
	color: red;
}

.footBtnCon {
	display: flex;
	justify-content: center;
	margin-top: 60rpx;
}

.cancelBtn {
	color: red;
	margin-right: 40rpx;
}

.cancelBtn,
.payBtn {
	width: 240rpx;
	height: 60rpx;
	border: 1px solid red;
	text-align: center;
	line-height: 60rpx;
	font-size: 30rpx;
	border-radius: 4px;
}

.payBtn {
	color: #fff;
	margin-right: 20rpx;
	background-color: red;
}
</style>
