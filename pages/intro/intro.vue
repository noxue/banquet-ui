<template>
	<view class="container1">
		<view class="tour">
			<view class="title">厨师形象</view>
			<view class="pic-list">
				<view class="li"><image class="img" src="https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg" /></view>
				<view class="li r"><image class="img" src="https://cdn.idachu.com/uimgs/202006/568ab4f4c84f40650a36ef3b020333cf.jpg" /></view>
				<view class="li"><image class="img" src="https://cdn.idachu.com/uimgs/202006/d96ce96e3d3859444a5c50f405953420.jpg" /></view>
				<view class="li r"><image class="img" src="https://cdn.idachu.com/uimgs/202006/6ec239c051feabef18214539d23ed329.jpg" /></view>
			</view>
		</view>
		<view class="tour">
			<view class="title">服务场景</view>
			<view class="pic-list">
				<view class="li"><image class="img" src="https://cdn.idachu.com/uimgs/202006/01b254f3a740e5f56db1b0ea45ba80ed.jpg" /></view>
				<view class="li r"><image class="img" src="https://cdn.idachu.com/uimgs/202006/8b23dd142a637cce78855d6ee6c82cc4.jpg" /></view>
				<view class="li"><image class="img" src="https://cdn.idachu.com/uimgs/202006/aca310a555c43cbc85a976bc7d03f2fa.jpg" /></view>
				<view class="li r"><image class="img" src="https://cdn.idachu.com/uimgs/202006/a41ef035347d67881aacbc9663996ef2.jpg" /></view>
			</view>
		</view>
		<view class="tour">
			<view class="title">服务说明</view>
			<view class="ol">
				<view class="li">1.请您提前1-7天预约大厨</view>
				<view class="li">2.如需取消服务，请至少提前1天进行退订，用餐当天不支持取消</view>
				<view class="li">3.如需大厨代买食材，请提前电话沟通，大厨凭超市/市场小票向您报销</view>
				<view class="li">4.大厨服务完毕后会负责清洁厨房台面，不包含饭后涮洗工作</view>
				<view class="li">
					5.服务细节请您阅读下方的详细说明，客服电话：
					<a href="tel:18513256892">18513256892</a>
				</view>
			</view>
			<view class="btn btn-success" style="margin-top: 20rpx;" @click="toPages">查看详细</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad: function(n) {},
	onReady: function() {},
	onShow: function() {},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh: function() {},
	onReachBottom: function() {},
	onShareAppMessage: function() {},
	methods: {
		toPages() {
			uni.navigateTo({
				url: '/pages/intro/details'
			});
		}
	}
};
</script>
<style>
view {
	box-sizing: border-box;
}
.container1 {
	padding-left: 16rpx;
	padding-right: 16rpx;
	margin-right: auto;
	margin-left: auto;
}

.tour {
	padding: 0 20rpx;
}

.tour .title {
	font-size: 32rpx;
	font-weight: bold;
	border-left: 12rpx solid #e13300;
	padding-left: 10rpx;
	margin: 40rpx 0 40rpx 0;
}

.tour .pic-list {
	margin: 0;
	padding-left: 0px;
	display: flex;
	flex-wrap: wrap;
}

.tour .pic-list .li {
	width: 50%;
	height: 256rpx;
	padding-right: 10rpx;
	padding-bottom: 20rpx;
}

.tour .pic-list .li.r {
	padding-right: 0rpx;
	padding-left: 10rpx;
}

.tour .pic-list .li .img {
	width: 100%;
	height: 100%;
}

.tour p {
	font-size: 24rpx;
	color: #666666;
}

#ico {
	text-align: center;
	margin-bottom: 40rpx;
	margin-top: 40rpx;
}

#ico img {
	padding: 4rpx;
	border-radius: 20rpx;
}

.tour .ol {
	font-size: 28rpx;
	padding-left: 20rpx;
}

.btn {
	display: inline-block;
	padding: 6px 12px;
	margin-bottom: 0;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.42857143;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 4px;
}

.btn-success {
	color: #fff;
	background-color: #f06e43;
	border-color: #f06e43;
}
</style>
