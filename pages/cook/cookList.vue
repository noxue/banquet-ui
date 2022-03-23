<template>
	<view style="position: relative;">
		<view class="hotCook">
			<view v-if="table.data.length > 0">
				<view class="hotCookCon" :data-code="item.code" v-for="(item, index) in table.data" :key="index">
					<view class="hotCookCon_left"><image :src="fileHost + item.photo"></image></view>

					<view class="hotCookCon_right">
						<view class="hotCookCon_right_name">
							<view class="hotCookCon_right_name_name">{{ item.name }}</view>
						</view>
						<view v-if="item.description" class="hotCookCon_right_title">履历：{{ item.description }}</view>
						<view class="hotCookCon_bottom">
							<template v-for="(foodsItem, foodsIndex) in item.foodsList">
								<image :key="foodsIndex" v-if="foodsIndex < 6" :style="foodsIndex > 2 ? 'margin-top:5rpx;' : ''" :src="fileHost + foodsItem"></image>
							</template>
						</view>
					</view>
				</view>
			</view>

			<view v-else class="cookZanwu" style="display: flex;flex-direction: column;align-items: center;justify-content: center;;">
				<image src="https://cookwaptest.5156dujia.com/img/cookList_bj.png"></image>
				<view>暂无符合厨师</view>
			</view>
		</view>
	</view>
</template>

<script>
import table from '@/mixin/table.js';
import hostConst from '@/config/hostConst.js';
import userServe from '@/libs/userServe.js';

export default {
	mixins: [table],
	data() {
		return {
			fileHost: hostConst.fileHost2,
			table: {
				// 表格数据
				data: [],
				total: 0,
				pageSize: 10,
				pageNum: 1,
				pageStatus: 0
			}
		};
	},
	onLoad: function(a) {
		this.tableInit(this);
	},
	onShow: function() {
		if (userServe.checkUserLogin()) {
			this.pageDataRequest();
		}
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		
		if (userServe.checkUserLogin()) {
			this.pageDataRequest();
		}
	},
	methods: {
		// 获取厨师列表
		pageDataRequest: function(type) {
			this.tableRequest(this, this.cookListRequest, 'reset');
		},
		cookListRequest: function() {
			return new Promise((r, a) => {
				this.$api.cooks.get.request().then(
					data => {
						data.map(item => {
							item.foodsList = JSON.parse(item.foods);
							return item;
						});
						r(data);
					},
					err => {
						a();
					}
				);
			});
		}
	}
};
</script>
<style>
page {
	background: #fff;
}

.hotCook {
	padding-bottom: 30rpx;
	width: 750rpx;
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
	background: url('https://cookwaptest.5156dujia.com/img/cookYy.png') no-repeat;
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
	float: left;
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
	float: left;
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
	width: 380rpx;
	height: auto;
	color: #999;
	font-size: 26rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
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
	margin-top: 10rpx;
	/* height: 122rpx; */
	/* margin: 25rpx 0 0 20rpx; */
	/* width: 690rpx; */
}

.hotCookCon_bottom image {
	margin-right: 11rpx;
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

.cookZanwu {
	height: 1000rpx;
	overflow: hidden;
	padding-bottom: 30rpx;
	width: 750rpx;
}

.cookZanwu image {
	display: block;
	height: 265rpx;
	margin: 100rpx auto 0;
	width: 356rpx;
}

.cookZanwu text {
	color: #999;
	display: block;
	font-size: 30rpx;
	height: auto;
	margin-top: 50rpx;
	text-align: center;
	width: 750rpx;
}

.show {
	display: block;
}

.hide {
	display: none;
}

.sort,
.sort_bj {
	z-index: 100;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 750rpx;
	height: 100vh;
}

.sort_bj {
	background: #000;
	opacity: 0.5;
}

.sort_con {
	z-index: 110;
	position: fixed;
	top: 199rpx;
	left: 0rpx;
	width: 750rpx;
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
}

.sort_con view {
	border-bottom: 1rpx solid #f3f3f3;
	color: #333;
	display: inline-block;
	height: 90rpx;
	line-height: 90rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.sort_con view text {
	font-size: 26rpx;
}

.sort_con view image {
	float: right;
	height: 22rpx;
	margin-top: 29rpx;
	width: 30rpx;
}

.sort_con view:last-child {
	border-bottom: none;
}

.sort_con .act {
	color: #ca9f58;
	margin: 0rpx;
	padding: 0 30rpx;
	width: 690rpx;
}

.services,
.services_bj {
	z-index: 100;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 750rpx;
	height: 100vh;
}

.services_bj {
	background: #000;
	opacity: 0.5;
}

.services_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.services_charge {
	height: auto;
	margin: 0 30rpx 0rpx;
	overflow: hidden;
	width: 690rpx;
}

.services_charge_title {
	color: #999;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin: 20rpx 0 30rpx;
	width: 690rpx;
}

.services_jiage {
	height: 68rpx;
	margin-top: 30rpx;
	width: 690rpx;
}

.services_jiage view {
	background: #f6f6f6;
	border-radius: 10rpx;
	color: #999;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	width: 260rpx;
}

.services_jiage_left {
	width: auto;
}

.services_jiage_left text {
	float: left;
	height: 68rpx;
	line-height: 68rpx;
	margin-left: 30rpx;
	width: auto;
}

.services_jiage_left image {
	float: right;
	height: 9rpx;
	margin: 29rpx 30rpx 0 0;
	vertical-align: middle;
	width: 16rpx;
}

.services_jiage_right {
	width: auto;
}

.services_jiage_right text {
	float: left;
	height: 68rpx;
	line-height: 68rpx;
	margin-left: 30rpx;
	width: auto;
}

.services_jiage_right image {
	float: right;
	height: 9rpx;
	margin: 29rpx 30rpx 0 0;
	vertical-align: middle;
	width: 16rpx;
}

.services_charge_xian {
	color: #999;
	float: left;
	font-size: 30rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin: 0 40rpx;
	width: auto;
}

.services_people {
	height: auto;
	margin: 20rpx 30rpx 0;
	overflow: hidden;
	width: 690rpx;
}

.services_people_left {
	background: #f6f6f6;
	border-radius: 10rpx;
	float: left;
	height: 68rpx;
	width: 260rpx;
}

.services_people_left input {
	color: #262626;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 30rpx;
	text-align: center;
	width: 200rpx;
}

.services_people_left input::-webkit-input-placeholder {
	color: #999;
}

.services_people_left input::placeholder {
	color: #999;
}

.services_people_right {
	background: #f6f6f6;
	border-radius: 10rpx;
	float: left;
	height: 68rpx;
	width: 260rpx;
}

.services_people_right input {
	color: #262626;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 30rpx;
	text-align: center;
	width: 200rpx;
}

.services_people_right input::-webkit-input-placeholder {
	color: #999;
	font-size: 28rpx;
}

.services_people_right input::placeholder {
	color: #999;
	font-size: 28rpx;
}

.services_fixed {
	border-top: 1rpx solid #e5e5e5;
	height: 100rpx;
	margin-top: 75rpx;
	width: 750rpx;
}

.services_fixed_xx {
	margin: 10rpx 0 0 30rpx;
}

.services_fixed_cz,
.services_fixed_xx {
	border: 1rpx solid #999;
	border-radius: 10rpx;
	color: #333;
	float: left;
	font-size: 30rpx;
	height: 78rpx;
	line-height: 78rpx;
	text-align: center;
	width: 168rpx;
}

.services_fixed_cz {
	margin: 10rpx 0 0 20rpx;
}

.services_fixed_qd {
	background: #ca9f58;
	border-radius: 10rpx;
	color: #fff;
	float: right;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 10rpx 30rpx 0 0;
	text-align: center;
	width: 310rpx;
}

.qualifications,
.qualifications_bj {
	height: 100vh;
	left: 0rpx;
	position: fixed;
	top: 0rpx;
	width: 750rpx;
}

.qualifications_bj {
	background: #000;
	opacity: 0.5;
}

.qualifications_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.qualifications_con_title {
	color: #999;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin: 20rpx 30rpx 0;
	width: 690rpx;
}

.jianyeshu_right {
	height: 42rpx;
	margin: 35rpx 0 0 30rpx;
	width: 180rpx;
}

.jianyeshu_right image {
	height: 42rpx;
	width: 42rpx;
}

.jian {
	float: left;
}

.jianyeshu_right input {
	color: #ca9f58;
	float: left;
	font-size: 32rpx;
	height: 42rpx;
	line-height: 42rpx;
	margin-left: 10rpx;
	text-align: center;
	width: 80rpx;
}

.jia {
	float: right;
}

.qualifications_cuisine {
	height: auto;
	margin: 20rpx 30rpx 0;
	overflow: hidden;
	width: 690rpx;
}

.qualifications_cuisine text {
	background: #f6f6f6;
	border-radius: 10rpx;
	color: #333;
	float: left;
	font-size: 26rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin: 28rpx 20rpx 0 0;
	overflow: hidden;
	text-align: center;
	width: 122rpx;
}

.qualifications_cuisine text:nth-child(5n) {
	margin: 28rpx 0rpx 0 0;
}

.cxdis {
	background: #faf5ee !important;
	border: 1rpx solid #ca9f58 !important;
	border-radius: 10rpx !important;
	color: #ca9f58 !important;
	float: left;
	height: 64rpx !important;
	line-height: 64rpx !important;
	margin: 28rpx 20rpx 0 0;
	text-align: center;
	width: 118rpx !important;
}

.distance,
.distance_bj {
	height: 100vh;
	left: 0rpx;
	position: fixed;
	top: 0rpx;
	width: 750rpx;
}

.distance_bj {
	background: #000;
	opacity: 0.5;
}

.distance_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.distance_con view {
	border-bottom: 1rpx solid #f3f3f3;
	color: #333;
	display: inline-block;
	font-size: 26rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.distance_con view text {
	font-size: 26rpx;
}

.distance_con view image {
	float: right;
	height: 22rpx;
	margin-top: 29rpx;
	width: 30rpx;
}

.distance_con view:last-child {
	border-bottom: none;
}

.distance_con .km {
	color: #ca9f58;
	margin: 0rpx;
	padding: 0 30rpx;
	width: 690rpx;
}
</style>
