<template>
	<view style="padding: 20rpx 30rpx;">
		<view class="title"><text>成为上门厨师的条件</text></view>
		<view class="tiaojian">
			<text>1.申请上门厨师的用户需年满18周岁；</text>
			<text>2.有比较擅长烹饪的菜系菜品，厨龄在1年以上；</text>
			<text>3.有一定的闲余时间可以用来提供上门烹饪服务；</text>
			<text>4.拥有良好的服务精神和契约精神；</text>
			<text>5.拥有厨师业界公认的厨师类证书以及餐厅就职经历，可提高 申请通过率。</text>
		</view>
		<view class="title"><text>上门厨师的保障</text></view>
		<view class="tiaojian">
			<text>1.平台会为您提供优质的客户资源；</text>
			<text>2.快速收到服务佣金；</text>
		</view>
		<view class="title">
			<text>
				上门厨师的承诺
			
			</text>
		</view>
		<view class="danxuan">
			<label @tap.stop.prevent="checkedTap1" class="checked-lable"><radio :checked="checked1" color="#e72528"></radio></label>
			<view>提供给平台的本人信息皆为真实可信的</view>
		</view>
		<view class="danxuan">
			<label @tap.stop.prevent="checkedTap2" class="checked-lable"><radio :checked="checked2" color="#e72528"></radio></label>
			<view>不做违背法律法规的事情，如有违背造成的严重后果，全部责任由厨师本人承担</view>
		</view>
		<view class="danxuan">
			<label @tap.stop.prevent="checkedTap3" class="checked-lable"><radio :checked="checked3" color="#e72528"></radio></label>
			<view>
				遵守
				<text @tap="cookAgreement">《厨师商家协议》</text>
				、
				<text @tap="foodCommitment">《食品安全承诺书》</text>
				及
				<text @tap="fuwuBiaozhun">《服务规范与标准流程》</text>
				里的其他需要规则
			</view>
		</view>
		<view class="chengdan">以上是您对平台和客户需要付出的承诺，务必仔细阅读知悉,否则造成的严重后果将由您本人自行承担。</view>
		<view :style="'width:750rpx;height:100rpx; padding-bottom:' + paddingBottom + 'px;'"></view>
		<view style="width: 100%;height: 100rpx;"></view>
		
		<button @tap="checks" class="button" :style="'background:' + (checked1 && checked2 && checked3 ? '#e72528' : '#c7c7c7;')">{{ checked1 && checked2 && checked3 ? '申请成为上门厨师' : '请阅读并勾选上门厨师的说明和承诺' }}</button>
		
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			checked1: false,
			checked2: false,
			checked3: false,
			paddingBottom: 0
		};
	},
	onLoad: function(o) {
		// this.setData({
		// 	city: app.globalData.city,
		// 	paddingBottom: app.globalData.paddingBottom
		// });
	},
	methods: {
		checkedTap1: function() {
			var t = this.checked1;
			this.checked1 = !t;
		},

		checkedTap2: function() {
			var t = this.checked2;
			this.checked2 = !t;
		},

		checkedTap3: function() {
			var t = this.checked3;
			this.checked3 = !t;
		},
		checks: function(t) {
			if (this.checked1 && this.checked2 && this.checked3) {
				uni.setStorageSync('addressCook', []);
				uni.navigateTo({
					url: '/pages/cook/apply/apply'
				});
			} else {
				uni.showToast({
					title: '请认真阅读厨师上门说明',
					icon: 'none',
					duration: 2000
				});
			}
		},

		cookAgreement: function(t) {
			uni.navigateTo({
				url: '../cookAgreement/cookAgreement'
			});
		},

		foodCommitment: function() {
			uni.navigateTo({
				url: '../foodCommitment/foodCommitment'
			});
		},

		fuwuBiaozhun: function(t) {
			uni.navigateTo({
				url: '../fuwuBiaozhun/fuwuBiaozhun'
			});
		}
	}
};
</script>
<style>
page {
	background: #fff;
}

.button {
	position: fixed;
	bottom: 50rpx;
	left: calc((750rpx - 655rpx) / 2);
	width: 655rpx;
	height: 90rpx;
	background-color: #e72528;
	border-radius: 18rpx;
	font-size: 36rpx;
	color: #ffffff;
}

.banner {
	height: 300rpx;
	margin-top: 50rpx;
	width: 750rpx;
}

.banner image {
	height: 300rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.city {
	color: #333;
	font-size: 30rpx;
	line-height: 50rpx;
	margin: 25rpx 30rpx 0;
}

.city,
.title {
	height: 50rpx;
	width: 100%;
  text-align: center;
}

.title {
	margin: 40rpx 0rpx 30rpx 0rpx;
}

.title image {
	float: left;
	height: 42rpx;
	margin-top: 4rpx;
	width: 48rpx;
}

.title text {
  font-size: 45rpx;
}

.title text text {
	float: right;
	font-size: 28rpx;
	margin-left: 0rpx;
}

.tiaojian {
	height: auto;
	/* margin: 0rpx 20rpx; */
	width: 690rpx;
	overflow: hidden;
}

.tiaojian text {
	color: #333;
	display: inline-block;
	font-size: 30rpx;
	line-height: 56rpx;
	text-align: justify;
	width: 690rpx;
}

.danxuan {
	width: 690rpx;
	height: auto;
	margin-bottom: 10rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
}

.checked-lable {
	float: left;
}

.danxuan view {
	color: #333;
	float: right;
	font-size: 30rpx;
	line-height: 50rpx;
	width: 630rpx;
}

.danxuan view text {
	color: #429ce8;
	width: auto !important;
}

.chengdan {
	color: #e6944b;
	font-size: 26rpx;
	height: auto;
	line-height: 46rpx;
	margin-top: 40rpx;
	/* margin: 80rpx 30rpx 30rpx; */
	overflow: hidden;
	width: 690rpx;
}

.chengnuo {
	background: #fff;
	border-top: 1rpx solid #ececec;
	bottom: 0rpx;
	height: 97rpx;
	left: 0rpx;
	position: fixed;
	right: 0rpx;
	width: 750rpx;
}

.chengnuo text {
	background: #c7c7c7;
	border-radius: 14rpx;
	color: #fff;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin: 15rpx 0 0 30rpx;
	text-align: center;
	width: 690rpx;
}
</style>
