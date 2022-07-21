<template>
	<view>
		<template v-if="table.data.length > 0">
			<view v-for="(item, index) in table.data" class="card-item" @click="toPageDetails(item.id)">
				<image class="image" :src="fileHost2 + item.pic"></image>
				<view class="text-cut text-lg text-bold ui-card-fixedTitle">
					<view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">
						{{ item.name }}
						<view style="font-size: 30rpx;margin-left: 12rpx;">¥{{ item.price | moneyFrom }}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="'cookZanwu" style="display: flex;flex-direction: column;align-items: center;justify-content: center;;">
				<image :src="fileHost + '/cookList_bj.png'"></image>
				<view>暂无套餐列表</view>
			</view>
		</template>
		
		<view style="width: 100%;height: 50rpx;"></view>
	</view>
</template>

<script>
import table from '@/mixin/table.js';
import hostConst from '@/config/hostConst.js';

export default {
	mixins: [table],
	data() {
		return {
			fileHost: hostConst.fileHost,
			fileHost2: hostConst.fileHost2,
			table: {
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
		this.tableRequest(this, this.pageDataRequest, 'reset');
	},
	methods: {
		pageDataRequest: function() {
			return new Promise((r, a) => {
				this.$api.menus.get.request(this.table).then(
					data => {
						data.map(item => {
							item.price = parseFloat(item.price / 100);
						});
						r(data);
					},
					err => {
						a();
					}
				);
			});
		},
		toPageDetails: function(id) {
			uni.navigateTo({
				url: '/pages/goods/shopDetail?id=' + id
			});
		}
	}
};
</script>
<style>
page {
	background-color: #fff;
}

.card-item {
	position: relative;
	margin-top: 30rpx;
	margin-left: 20rpx;
	width: 710rpx;
	height: 300rpx;
	background-color: #ffffff;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 1px 1px 4px 2px rgba(23, 23, 23, 0.4);
}

.card-item .image {
	z-index: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
}

.card-item .text {
	z-index: 1;
	position: relative;
	color: #fff;
	padding: 45px 30px;
	font-size: 30px;
	font-weight: 300;
	-webkit-transform: skew(-10deg, 0deg);
	transform: skew(-10deg, 0deg);
	position: relative;
	text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.swiper-container {
	width: 750rpx;
	position: relative;
}

.swiper_box {
	width: 100%;
	text-align: center;
}

.newName {
	top: 10%;
	left: 50rpx;
	font-size: 50rpx;
	width: 20rpx;
}

.newName,
.newPriceInfo {
	position: absolute;
	color: #fff;
}

.newPriceInfo {
	bottom: 40rpx;
	left: 0;
	font-size: 28rpx;
	width: 100%;
}

swiper-item image {
	width: 100%;
	display: inline-block;
	overflow: hidden;
}

.head {
	background: none no-repeat;
	background-size: 100% auto;
	margin: 0 0 10px;
	padding: 22% 0;
	height: 0;
	overflow: hidden;
}

.head .title {
	text-shadow: 0 0 5px red;
	margin: -36px 0 5px;
	line-height: 36px;
	font-size: 20px;
	font-weight: 400;
	color: #fff;
	text-align: center;
}

.line {
	width: 100%;
	height: 5px;
}

.line image {
	width: 60%;
	height: 100%;
	display: block;
	margin: 0 auto;
}

.head .desc {
	text-shadow: 0 0 4px red;
	margin: 5px;
	text-align: center;
	color: #fff;
	font-size: 16px;
}

.menu {
	font-size: 16px;
	color: #484848;
}

.list,
.menu {
	margin: 10rpx;
}

.item {
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #ddd;
}

.item .imgCon {
	width: 100px;
	overflow: hidden;
}

.item .imgCon .img {
	width: 100%;
	height: 100%;
}

.content {
	flex: 1;
	margin-left: 20rpx;
}

.content .title {
	font-size: 15px;
	font-weight: 700;
}

.content .desc,
.content .price {
	font-size: 14px;
	margin-top: 5px;
}

.content .price text {
	color: #f06e43;
}

.fixFoot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}

.fixFoot .line {
	width: 150rpx;
	height: 1px;
	background-color: #000;
}

.fixFoot .data {
	font-size: 30rpx;
	margin: 0 20rpx;
}

.ui-card-fixedTitle {
	padding: 10rpx 20rpx;
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	z-index: 2;
}

.text-cut {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	color: #fff;
	background-color: rgba(0, 0, 0, 0.2);
}
</style>
