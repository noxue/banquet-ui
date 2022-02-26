<template>
	<view class="statusPage">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="left">
					<view class="cirle"></view>
					<view class="line" v-if="index != 0"></view>
				</view>

				<view class="right">
					<view class="title">{{ item.title }}</view>
					<view class="content">
						<view>{{ item.memo }}</view>
						<view>{{ item.dateline }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad: function(t) {
		this.$api.order.statusList.request({ orderId: t.orderId }).then(data => {
			this.list = data;
		});
	}
};
</script>
<style>
page {
	background-color: #f6f6f6;
}

.list {
	padding: 30rpx;
}

.item {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.item .left .cirle {
	width: 25rpx;
	height: 25rpx;
	background-color: #c9c9c9;
	border-radius: 50%;
}

.right {
	flex: 1;
	margin-left: 30rpx;
	background-color: #fff;
	border-radius: 4px;
	padding: 20rpx;
}

.title {
	font-size: 30rpx;
	color: #000;
}

.content {
	display: flex;
	justify-content: space-between;
	margin-top: 10rpx;
	font-size: 28rpx;
	color: #bfbfbf;
}

.item .left {
	position: relative;
}

.line {
	width: 2rpx;
	height: 160rpx;
	position: absolute;
	bottom: 0;
	left: 11rpx;
	background-color: #c3c3c3;
}
</style>
