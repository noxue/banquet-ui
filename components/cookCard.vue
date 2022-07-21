<template>
	<view class="hotCookCon" @click="toPagesCookDetail">
		<view class="hotCookCon_left">
			<image v-if="info.photo" :src="fileHost + info.photo"></image>
			<image v-else src="../static/image/member-header.jpg"></image>
		</view>

		<view class="hotCookCon_right">
			<view class="hotCookCon_right_name">
				<view class="hotCookCon_right_name_name">{{ info.name }}</view>
			</view>
			<view style="margin-top:20rpx;">
				<view v-for="(item, index) in food_types" class="cookStyleIcon">{{ item }}</view>
			</view>
			<view v-if="info.description" class="hotCookCon_right_title text-line2">履历：{{ info.description }}</view>
			<view v-if="info.description" class="hotCookCon_right_title text-line2">服务范围：{{ info.origin_address ? info.origin_address + '-' : '' }} {{ info.address }}</view>
		</view>

		<view class="hotCookCon_bottom flex-row-between-center" style="width: 100%;">
			<template v-for="(foodsItem, foodsIndex) in info.foodsList">
				<image :key="foodsIndex" v-if="foodsIndex < 5" :src="fileHost + foodsItem"></image>
			</template>
		</view>
	</view>
</template>

<script>
import hostConst from '@/config/hostConst.js';

export default {
	props: {
		info: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	watch: {
		info() {
			this.food_types = this.info.food_types.split('|');
		}
	},
	data() {
		return {
			fileHost: hostConst.fileHost2,
			food_types: []
		};
	},
	created() {
		this.food_types = this.info.food_types.split('|');
	},
	methods: {
		toPagesCookDetail() {
			console.log(1);
			uni.navigateTo({
				url: '/pages/cook/cookDetail?id=' + this.info.id
			});
		}
	}
};
</script>
<style>
.cookStyleIcon {
	margin-right: 10rpx;
	padding: 5rpx 15rpx;
	border-radius: 20rpx;
	border: 1px solid #ff6464;
	color: #ff6464;
	display: inline-block;
	font-size: 24rpx;
}

.hotCookCon {
	border-radius: 14rpx;
	box-shadow: 0rpx 0rpx 20rpx #e2e2e2;
	margin: 20rpx auto 0rpx;
	padding: 30rpx 20rpx;
	overflow: hidden;
	width: 690rpx;
}

.hotCookCon_left {
	float: left;
	width: 250rpx;
	height: 330rpx;
	overflow: hidden;
	position: relative;
}

.hotCookCon_left image {
	border-radius: 10rpx 10rpx 0rpx 0rpx;
	height: 330rpx;
	left: 0rpx;
	position: absolute;
	top: 0rpx;
	width: 250rpx;
}

.hotCookCon_left text {
	background-size: 250rpx 119rpx;
	bottom: 0rpx;
	color: #fff;
	font-size: 26rpx;
	height: 119rpx;
	left: 0rpx;
	line-height: 170rpx;
	position: absolute;
	text-align: center;
	width: 250rpx;
}

.hotCookCon_right {
	float: right;
	height: 330rpx;
	overflow: hidden;
	width: 380rpx;
}

.hotCookCon_right_name {
	height: 50rpx;
	width: 380rpx;
}

.hotCookCon_right_name_name {
	height: 60rpx;
	color: #262626;
	font-size: 34rpx;
	line-height: 60rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.hotCookCon_right_name_tw {
	height: 60rpx;
	margin-left: 30rpx;
	width: auto;
}

.hotCookCon_right_name_tw image {
	height: 29rpx;
	margin-right: 10rpx;
	vertical-align: middle;
	width: 29rpx;
}

.hotCookCon_right_name_tw text {
	color: #ca9f58;
	font-size: 24rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: auto;
}

.hotCookCon_right_fen {
	float: left;
	height: 60rpx;
	width: 380rpx;
}

.hotCookCon_right_fen_name {
	color: #ca9f58;
	float: left;
	font-size: 36rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: auto;
}

.hotCookCon_right_fen_name text {
	font-size: 28rpx !important;
}

.hotCookCon_right_fen_pj {
	float: left;
	height: 60rpx;
	margin-left: 30rpx;
	width: auto;
}

.hotCookCon_right_fen_pj text {
	color: #429ce8;
	font-size: 24rpx;
	height: 60rpx;
	line-height: 70rpx;
	width: auto;
}

.hotCookCon_right_fen_pj image {
	height: 16rpx;
	margin-left: 10rpx;
	vertical-align: middle;
	width: 8rpx;
}

.hotCookCon_right_list {
	display: flex;
	float: left;
	height: 46rpx;
	margin-top: 20rpx;
	width: 380rpx;
}

.hotCookCon_right_list text {
	border: 1rpx solid #e8d4b5;
	border-radius: 32rpx;
	color: #ca9f58;
	float: left;
	font-size: 24rpx;
	height: 32rpx;
	margin-right: 14rpx;
	overflow: hidden;
	padding: 5rpx 16rpx;
	width: auto;
}

.hotCookCon_right_list text:last-child {
	margin-right: 0rpx;
}

.hotCookCon_right_title {
	margin-top: 20rpx;
	width: 380rpx;
	height: auto;
	color: #999;
	font-size: 26rpx;
}

.hotCookCon_right_jiage {
	float: left;
	height: 50rpx;
	margin-top: 28rpx;
	width: 380rpx;
}

.hotCookCon_right_jiage_left {
	color: #b32d1f;
	float: left;
	font-size: 42rpx;
	width: auto;
}

.hotCookCon_right_jiage_left1 {
	font-size: 26rpx;
}

.hotCookCon_right_jiage_left2 {
	color: #999;
	font-size: 24rpx;
}

.hotCookCon_right_jiage_right {
	color: #ca9f58;
	float: right;
	font-size: 24rpx;
	margin-top: 16rpx;
	width: auto;
}

.hotCookCon_bottom {
	float: left;
	margin-top: 25rpx;
}

.hotCookCon_bottom image {
	/* margin-right: 11rpx; */
	height: 110rpx;
	width: 110rpx;
	float: left;
	border-radius: 14rpx;
}

.hotCookCon_bottom image:last-child {
	margin-right: 0rpx;
}

.hotCookCon_juli {
	color: #999;
	float: left;
	font-size: 26rpx;
	height: 100rpx;
	width: 690rpx;
}

.hotCookCon_juli image {
	float: left;
	height: 26rpx;
	margin: 38rpx 0 0 20rpx;
	width: 20rpx;
}

.hotCookCon_juli1 {
	float: left;
	height: 100rpx;
	line-height: 100rpx;
	margin-left: 10rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 400rpx;
}

.hotCookCon_juli2 {
	float: right;
	height: 100rpx;
	line-height: 100rpx;
	margin-right: 20rpx;
	width: auto;
}
</style>
