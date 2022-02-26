<template>
	<block>
		<input @input="bindKeyInput" class="input" :focus="true" placeholder="搜索小区、大厦等名称" value="" />
		<view class="list-group">
			<view @tap="selectItem" class="list-group-item" :data-result="item" v-for="(item, index) in results" :key="index">{{ item.name }}</view>
		</view>
	</block>
</template>

<script>
var app = getApp();

var e = require('../../utils/bmap-wx.min.js');
var n = require('../../utils/cache.js');

// TODO 没有对接
export default {
	data() {
		return {
			results: []
		};
	},
	methods: {
		selectItem: function(t) {
			n.set('address_select_item', t.target.dataset.result, 1);
			uni.navigateBack();
		},

		bindKeyInput: function(n) {
			var that = this;
			new e.BMapWX({
				ak: 'PNUERGy8KR3LrEhCWIHUTGx7376vz0mu'
			}).suggestion({
				query: n.detail.value,
				region: app.globalData.getCityName(),
				city_limit: true,
				fail: function(t) {
					console.log(t);
				},
				success: function(t) {
					that.setData({
						results: t.result
					});
				}
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
	border-radius: 4px;
}

.input,
.list-group {
	background-color: #fff;
}

.list-group {
	margin-top: 14rpx;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	flex-direction: column;
	padding-left: 10px;
	padding-right: 10px;
}

.list-group-item {
	position: relative;
	display: block;
	padding: 10rpx 0;
	border-bottom: 1px solid #eee;
}
</style>
