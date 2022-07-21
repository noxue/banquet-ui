<template>
	<view style="position: relative;">
		<view class="hotCook">
			<view v-if="table.data.length > 0"><cookCard v-for="(item, index) in table.data" :key="index" :info="item"></cookCard></view>

			<view v-else class="cookZanwu" style="display: flex;flex-direction: column;align-items: center;justify-content: center;;">
				<image :src="fileHost + '/cookList_bj.png'"></image>
				<view>暂无符合厨师</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 100rpx;"></view>
	</view>
</template>

<script>
import table from '@/mixin/table.js';
import hostConst from '@/config/hostConst.js';
import userServe from '@/libs/userServe.js';
import cookCard from '@/components/cookCard.vue';

export default {
	mixins: [table],
	components: { cookCard },
	data() {
		return {
			fileHost: hostConst.fileHost,
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
		this.pageDataRequest();
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();

		this.pageDataRequest();
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
</style>
