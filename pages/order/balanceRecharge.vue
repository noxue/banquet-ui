<template>
	<view class="memberCon">
		<view @tap="payMember" :data-degree="item.degree" v-for="(item, index) in memberList" :key="index"><image class="memberImg" :src="item.img2"></image></view>
	</view>
</template>

<script>
var app = getApp();

/**
 * 余额充值
 */
export default {
	data() {
		return {
			memberList: []
		};
	},
	onLoad: function(e) {
		this.$api.memberCard.list.request().then(data => {
			this.memberList = data;
		});
	},
	methods: {
		payMember: function(e) {
			this.$api.order.balanceRechargePay
				.request(data => {
					type: e.currentTarget.dataset.degree;
				})
				.then(data => {
					console.log(data);
					uni.requestPayment({
						timeStamp: String(data.timeStamp),
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.paySign,
						success: function(a) {
							uni.showModal({
								title: '提示',
								content: '充值成功',
								showCancel: false,
								success: function(a) {
									if (a.confirm) {
										// TODO 充值成功后返回上一页返回上一页
									}
								}
							});
						},
						fail: function(a) {
							uni.showModal({
								title: '提示',
								content: '充值取消或失败',
								showCancel: false,
								success: function(a) {
									a.confirm;
								}
							});
						}
					});
				});
		}
	}
};
</script>
<style>
page {
	background-color: #f5f5f9;
}

.memberCon {
	padding: 20rpx;
}

.memberImg {
	width: 100%;
	height: 160px;
	margin-bottom: 20rpx;
}
</style>
