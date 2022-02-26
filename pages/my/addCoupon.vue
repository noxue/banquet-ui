<template>
	<view>
		<form @submit="bindSave">
			<view class="form-box"><input class="input" name="coupon" placeholder="请输入优惠码" type="text" :value="phone" /></view>
			<button class="save-btn" formType="submit" type="warn">添加</button>
		</form>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			phone: ''
		};
	},
	methods: {
		bindSave: function(n) {
			var coupon = n.detail.value.coupon;

			if (coupon) {
				this.$api.user.couponAdd
					.request({
						code: coupon
					})
					.then(data => {
						app.globalData.showToast('添加成功');
						uni.navigateBack({});
					});
			} else {
				this.prompt('请输入正确的优惠码');
			}
		},

		prompt: function(o) {
			uni.showModal({
				title: '提示',
				content: o,
				showCancel: false,
				confirmText: '知道了',
				success: function(o) {}
			});
		}
	}
};
</script>
<style>
page {
	background-color: #f5f5f9;
	box-sizing: border-box;
}

.input,
page {
	padding: 20rpx;
}

.input {
	font-size: 30rpx;
	background-color: #fff;
	border-radius: 4px;
}

.save-btn {
	margin-top: 40rpx;
	line-height: 40px;
}
</style>
