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
					<view v-if="item.status == '-2'" @click="submit(item)" style="margin-left: 30rpx;margin-right: 30rpx;padding: 15rpx 0;display: flex;justify-content: flex-end;"><view class="button">支付</view></view>
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
			statusType: ['全部', '待付款', '待接单', '已接单'], //, '已完成'
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
							'-2': '未付款',
							0: '已下单',
							1: '已接单',
							5: '已付款',
							10: '已完成'
						};

						let statusList2 = {
							0: 0,
							'-2': 1,
							5: 2,
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
		},

		submit(item) {
			let order_id = item.id;

			if (!order_id) return false;

			let params = {
				order_id,
				pay_type: ''
			};

			// #ifdef MP-WEIXIN
			let pay_type = 'WxMini';

			let openid = uni.getStorageSync('openid');
			if (openid) {
				params.pay_type = pay_type;
				params.openid = openid;
				this.payRequest(params);
			} else {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						console.log('这里', loginRes);

						this.$api.users.code2openid.request({ code: loginRes.code }).then(data => {
							uni.setStorageSync('openid', data);
							params.pay_type = pay_type;
							params.openid = data;
							this.payRequest(params);
						});
					}
				});
			}
			// #endif

			// #ifdef APP
			let pay_type = 'WxApp';
			params.pay_type = pay_type;
			this.payRequest(params);
			// #endif
		},

		payRequest(params) {
			this.$api.orders.pay.request(params).then(payData => {
				// {
				//   appid:"",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				//   partnerid:"",   // 微信支付商户号
				//   prepay_id:"",   // 统一下单订单号
				//   sign:"",  // 签名
				//   noncestr:"", // 随机字符串
				//   timeStamp:"", // 时间戳
				//  }

				if (params.pay_type == 'WxMini') {
					uni.requestPayment({
						appId: payData.appid,
						signType: 'MD5',
						nonceStr: payData.noncestr,
						package: 'prepay_id=' + payData.prepay_id,
						paySign: payData.sign,
						timeStamp: payData.timestamp,
						success: e => {
							this.paySuccess(params.order_id);
						},
						fail: e => {
							uni.showModal({
								content: '支付失败,原因为: ' + e.errMsg,
								showCancel: false
							});
						},
						complete: () => {}
					});
				} else if (params.pay_type == 'WxApp') {
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							appid: payData.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							noncestr: payData.noncestr, // 随机字符串
							package: 'Sign=WXPay', // 固定值
							partnerid: payData.partnerid, // 微信支付商户号
							prepayid: payData.prepay_id, // 统一下单订单号
							timestamp: payData.timestamp, // 时间戳（单位：秒）
							sign: payData.sign // 签名，这里用的 MD5/RSA 签名
						},
						success: e => {
							this.paySuccess(params.order_id);
						},
						fail: e => {
							uni.showModal({
								content: '支付失败,原因为: ' + e.errMsg,
								showCancel: false
							});
						},
						complete: () => {}
					});
				}
			});
		},

		// 支付成功
		paySuccess(orderId) {
			uni.showToast({
				title: '支付成功',
				icon: 'none'
			});

			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/order/paySuccess?orderId=' + orderId
				});
			}, 1500);
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

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200rpx;
	height: 60rpx;
	background-color: #f1c525;
	border-radius: 10rpx;
	font-size: 36rpx;
	color: #ffffff;
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
