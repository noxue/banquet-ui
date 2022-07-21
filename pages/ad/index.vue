<template>
	<view style="background-color: #f3cc4e;width: 100%;height: 100vh;"><image src="http://image.noxue.com/baijiayan/hone.jpg" style="width: 100%;height: 100%;" mode="aspectFit"></image></view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {};
	},
	onLoad: function(a) {
		setTimeout(() => {
			uni.switchTab({
				url:"/pages/index/index"
			})
		},2000)
	},
	onShow: function() {},
	methods: {}
};
</script>
<style></style>
