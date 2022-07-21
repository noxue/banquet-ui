<script>
export default {
	onLaunch: function() {
		var that = this;
	},
	globalData: {
		showToast: function(e, a) {
			var a = a || 'loading';
			uni.showToast({
				title: e,
				icon: a,
				duration: 1000
			});
		},

		urlencode: function(e) {
			return encodeURIComponent(e)
				.replace(/!/g, '%21')
				.replace(/'/g, '%27')
				.replace(/\(/g, '%28')
				.replace(/\)/g, '%29')
				.replace(/\*/g, '%2A')
				.replace(/%20/g, '+');
		}
	}
};
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import 'css/base.css';

page{
	background-color: #f5f5f9;
}

.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}

.introduce-img {
	position: fixed;
	z-index: 2000;
	bottom: 50rpx;

	.button {
		width: 655rpx;
		height: 90rpx;
		background-color: #f8d94a;
		border-radius: 18rpx;
		font-size: 36rpx;
		color: #ffffff;
	}
}

uni-button:after{
	border:none !important;
}
</style>
