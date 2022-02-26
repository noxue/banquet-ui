<template>
	<block>
		<view class="step">
			<view class="zh1 step_t1">
				<text class="biao">1</text>
				<view class="xian"></view>
				<text class="wenzi1">上传个人信息</text>
			</view>
			<view class="zh2 step_t2">
				<text class="biao">2</text>
				<view class="xian hui"></view>
				<text class="wenzi2">作品展示</text>
			</view>
			<view class="zh3 step_t3">
				<text class="biao hui">3</text>
				<view class="xian hui"></view>
				<text class="wenzi3">职业履历</text>
			</view>
			<view class="zh3 step_t3" style="width: 130rpx">
				<text class="biao hui">4</text>
				<view class="xian hui"></view>
				<text class="wenzi3">服务信息</text>
			</view>
			<view class="zh4 step_t4">
				<text class="biao4 hui">5</text>
				<view class="xian hui"></view>
				<text class="wenzi4">完成</text>
			</view>
		</view>
		
		<view class="container">
			<view class="photo">
				<view @tap="cookImg" class="photo_con">
					<image src="https://cookwaptest.5156dujia.com/img/shiming_t4.png"></image>
					<view style="margin-top: -4rpx">请上传本人所作菜品的图片（{{ cookList.length }}）张</view>
					<view class="text_icon" style="margin-top: 0">
						至少5张，最多10张；高质量图片有助于增加成交量；
						<text style="color: red">禁用网图</text>
					</view>
				</view>
				<view class="photo_img" v-if="cookList.length == 0 ? false : true">
					<view class="voucher_con_img" v-for="(item, index) in cookList" :key="index">
						<image @tap="deleteList" class="guan" :data-index="index" src="https://cookwaptest.5156dujia.com/img/guanbi.png"></image>

						<image class="zhu" :src="item"></image>
					</view>
				</view>
			</view>
		</view>
		<view :style="'width:750rpx;height:150rpx;padding-bottom:' + paddingBottom + 'px;'"></view>
		<view class="mackFix" :style="'padding-bottom:' + paddingBottom + 'px;'">
			<view class="mackFix_right">
				<view @tap="cancel" class="mackFix_right2">取消</view>
				<view @tap="nextTap" class="mackFix_right3">下一步</view>
			</view>
		</view>
	</block>
</template>

<script>
var app = getApp();

var e = require('../../../utils/thorttle.js');
var a = require('../../../utils/imgUpload.js');

export default {
	data() {
		return {
			isNext: false,
			token: '',
			cookList: [],
			qncookList: [],
			state: '',
			cookCode: '',
			paddingBottom: 0,
			gender: '',
			marriage: ''
		};
	},
	onLoad: function(o) {
		uni.hideShareMenu();
		this.setData({
			state: o.state,
			cookCode: o.cookcode,
			paddingBottom: app.globalData.paddingBottom
		});
		console.log(o);
		this.getQiniuToken();

		if (null != this.state && null != this.cookCode) {
			this.findChefDetail();
		}
	},
	methods: {
		findChefDetail: function(t) {
			var that = this;
			var a = {
				cookCode: that.cookCode
			};

			this.$api.chefInfo.service.findChefDetail.request(a).then(t => {
				console.log('查询申请厨师详情信息', t);
				var o = t.data.data.foodPicList;
				console.log(o);

				for (var a = [], i = 0; i < o.length; i++) {
					a.push(o[i].url);
				}

				that.setData({
					cookList: a
				});
				uni.hideLoading();
			});
		},

		bindGender: function(t) {
			var o = t.detail.value;
			this.setData({
				gender: this.genderList[o]
			});
		},

		bindMarriage: function(t) {
			var o = t.detail.value;
			this.setData({
				marriage: this.marriageList[o]
			});
		},

		cookImg: function(t) {
			var o;
			var that = this;
			if (10 == that.cookList.length) {
				uni.showToast({
					title: '菜品最多上传十张',
					icon: 'none',
					duration: 3000,
					mask: true
				});
			} else {
				if (0 === that.cookList.length) {
					o = 9;
				} else {
					that.cookList.length < 10 && (o = 10 - that.cookList.length);
				}

				uni.showActionSheet({
					itemList: ['拍照', '从手机相册选择'],
					success: function(t) {
						var a;

						if (0 == t.tapIndex) {
							a = 'camera';
							that.picImg(a, o);
						}

						if (1 == t.tapIndex) {
							a = 'album';
							that.picImg(a, o);
						}
					},
					fail: function(t) {
						console.log(t.errMsg);
					}
				});
			}
		},

		picImg: function(t, o) {
			var that = this;
			var i = false;
			uni.chooseImage({
				count: o,
				sizeType: ['original', 'compressed'],
				sourceType: [t],
				success: function(t) {
					t.tempFiles.forEach(function(t) {
						if (t.size > 0 && t.size <= 4194304) {
							i = true;
						} else {
							if (0 == t.size || t.size > 4194304) {
								i = false;
							}
						}
					});

					if (1 == i) {
						a.uploadimg({
							url: 'https://upload.qiniup.com',
							path: t.tempFilePaths,
							token: that.token,
							that: that,
							arr: that.cookList,
							arrName: 'cookList'
						});
					} else {
						setTimeout(function() {
							uni.showToast({
								title: '选择了无效的图片,请重新选择',
								duration: 2000,
								icon: 'none',
								mask: true
							});
						}, 1500);
					}
				}
			});
		},

		deleteList: function(t) {
			var o = this.cookList;
			var e = t.currentTarget.dataset.index;
			o.splice(e, 1);
			this.setData({
				cookList: o
			});
		},

		nextTap: e.throttle(function(t) {
			this.next();
		}, 1000),

		next: function(t) {
			return 0 == this.cookList.length
				? (uni.showToast({
						title: '请上传菜品图片',
						icon: 'none',
						duration: 3000,
						mask: true
				  }),
				  false)
				: this.cookList.length < 5
				? (uni.showToast({
						title: '上传菜品图片不能小于5张',
						icon: 'none',
						duration: 3000,
						mask: true
				  }),
				  false)
				: (console.log(this.cookList),
				  uni.setStorageSync('stepTow', this.cookList),
				  void (null != this.state && null != this.cookCode
						? uni.navigateTo({
								url: '../cookThree/cookThree?state=fail&cookcode=' + this.cookCode
						  })
						: uni.navigateTo({
								url: '../cookThree/cookThree'
						  })));
		},

		cancel: function(t) {
			uni.switchTab({
				url: '../my/my'
			});
		}
	}
};
</script>
<style>
page {
	background: #fff;
}

.wenzi1 {
	font-size: 30rpx;
}

.step {
	background: #fff;
	display: flex;
	flex-flow: row;
	height: 100rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.step .zh1 {
	width: 268rpx;
	width: 200rpx;
}

.step .zh1,
.step .zh2 {
	height: 100rpx;
	position: relative;
}

.step .zh2 {
	width: 218rpx;
	width: 170rpx;
}

.step .zh3 {
	width: 176rpx;
	width: 150rpx;
}

.step .zh3,
.step .zh4 {
	height: 100rpx;
	position: relative;
}

.step .zh4 {
	width: 28rpx;
}

.biao {
	left: 0rpx;
}

.biao,
.biao4 {
	background: #ddc18c;
	border-radius: 26rpx;
	color: #fff;
	font-size: 26rpx;
	height: 26rpx;
	line-height: 26rpx;
	position: absolute;
	text-align: center;
	top: 31rpx;
	width: 26rpx;
	z-index: 9;
}

.biao4 {
	right: 0rpx;
}

.xian {
	background: #ca9f58;
	height: 4rpx;
	left: 0rpx;
	position: absolute;
	top: 42rpx;
	width: 100%;
}

.wenzi1 {
	font-size: 22rpx;
	left: 0rpx;
	width: 180rpx;
}

.wenzi1,
.wenzi2 {
	color: #ca9f58;
	height: auto !important;
	position: absolute;
	top: 66rpx;
}

.wenzi2 {
	font-size: 30rpx;
	font-size: 22rpx;
	left: -46rpx;
	left: -32rpx;
	width: 190rpx;
}

.wenzi3 {
	left: -46rpx;
	left: -32rpx;
	width: 122rpx;
}

.wenzi3,
.wenzi4 {
	color: #999;
	font-size: 30rpx;
	font-size: 22rpx;
	height: auto !important;
	position: absolute;
	top: 66rpx;
}

.wenzi4 {
	right: 0rpx;
	right: -8rpx;
	text-align: right;
	width: 60rpx;
}

.step_t1,
.step_t2 {
	color: #ca9f58 !important;
}

.hui {
	background: #d2d2d2 !important;
}

.container {
	border-radius: 14rpx;
	box-shadow: 0rpx 0rpx 20rpx #e2e2e2;
	height: auto;
	margin: 50rpx auto 0rpx;
	overflow: hidden;
	padding-bottom: 30rpx;
	width: 690rpx;
}

.blue {
	background: #f5f9fc;
	height: 20rpx;
	width: 690rpx;
}

.title {
	color: #000;
	font-size: 36rpx;
	height: auto;
	margin: 40rpx 20rpx 0;
	width: 650rpx;
}

.title text {
	color: #333;
	font-size: 28rpx;
}

.title .mihao {
	color: #c91212;
	float: left;
	line-height: 40rpx;
	margin-right: 10rpx;
	width: auto;
}

.goodAt {
	height: auto;
	overflow: hidden;
	padding-bottom: 50rpx;
	width: 690rpx;
}

.essential_picker {
	border-bottom: 1px solid #e5e5e5;
	height: 112rpx;
	margin: 0 20rpx;
	width: 650rpx;
}

.essential_picker view {
	font-size: 32rpx;
	width: 140rpx;
}

.essential_picker text,
.essential_picker view {
	color: #262626;
	float: left;
	height: 112rpx;
	line-height: 112rpx;
}

.essential_picker text {
	font-size: 30rpx;
	text-align: right;
	width: 490rpx;
}

.essential_picker image {
	float: right;
	height: 26rpx;
	margin: 46rpx 0 0;
	width: 10rpx;
}

.essential_none {
	border-bottom: none !important;
}

.essential_newly {
	height: auto;
	margin: 0 20rpx;
	overflow: hidden;
	width: 650rpx;
}

.essential_newly_left {
	float: left;
	height: 100%;
	overflow: hidden;
	width: 62rpx;
}

.essential_newly_left image {
	float: left;
	height: 42rpx;
	margin-top: 80rpx;
	width: 42rpx;
}

.essential_newly_right {
	float: right;
	height: 100%;
	overflow: hidden;
	width: 588rpx;
}

.essential_newly_right_con {
	border-bottom: 1px solid #e5e5e5;
	float: right;
	height: 102rpx;
	width: 588rpx;
}

.essential_newly_right_con view {
	color: #262626;
	float: left;
	font-size: 32rpx;
	height: 102rpx;
	line-height: 102rpx;
	width: 140rpx;
}

.essential_newly_right_con text {
	color: #262626;
	float: left;
	font-size: 30rpx;
	height: 102rpx;
	line-height: 102rpx;
	text-align: right;
	width: 438rpx;
}

.essential_newly_right_con image {
	float: right;
	height: 26rpx;
	margin: 46rpx 0 0;
	width: 10rpx;
}

.newly {
	border: 1rpx solid #ca9f58;
	border-radius: 14rpx;
	color: #ca9f58;
	font-size: 30rpx;
	height: 86rpx;
	line-height: 86rpx;
	margin: 30rpx 20rpx 0;
	text-align: center;
	width: 648rpx;
}

.photo {
	height: auto;
	overflow: hidden;
	padding-bottom: 30rpx;
	width: 690rpx;
}

.photo_con {
	height: 122rpx;
	margin: 50rpx 20rpx 0;
	overflow: hidden;
	width: 650rpx;
}

.photo_con image {
	float: left;
	height: 122rpx;
	margin-right: 20rpx;
	width: 122rpx;
}

.photo_con view {
	color: #333;
	font-size: 30rpx;
}

.photo_con .text_icon,
.photo_con view {
	float: left;
	height: auto;
	margin-top: 4rpx;
	width: 508rpx;
}

.photo_con .text_icon {
	color: #b2b2b2;
	font-size: 26rpx;
}

.photo_img {
	height: auto;
	margin: 50rpx 20rpx 0;
	width: 650rpx;
}

.voucher_con_img {
	float: left;
	margin-bottom: 40rpx;
	margin-right: 20rpx;
	position: relative;
}

.voucher_con_img,
.zhu {
	height: 210rpx;
	width: 314rpx;
}

.zhu {
	border-radius: 16rpx;
	left: 0rpx;
	top: 0rpx;
}

.guan,
.zhu {
	position: absolute;
}

.guan {
	height: 30rpx;
	right: -12rpx;
	top: -12rpx;
	width: 30rpx;
	z-index: 10;
}

.voucher_con_img:nth-child(2n) {
	margin-right: 0rpx;
}

.mackFix {
	background: #fff;
	border-top: 1rpx solid #ececec;
	bottom: 0rpx;
	height: 97rpx;
	left: 0rpx;
	position: fixed;
	right: 0rpx;
	width: 750rpx;
	z-index: 99;
}

.mackFix_left {
	float: left;
	height: 97rpx;
	margin-left: 30rpx;
	width: auto;
}

.mackFix_left image {
	float: left;
	height: 40rpx;
	margin-top: 28rpx;
	width: 40rpx;
}

.mackFix_left text {
	color: #333;
	font-size: 28rpx;
	margin-left: 12rpx;
}

.mackFix_left_qian,
.mackFix_left text {
	float: left;
	line-height: 97rpx;
	width: auto;
}

.mackFix_left_qian {
	color: #262626;
	font-size: 26rpx;
	height: 97rpx;
	margin-left: 30rpx;
}

.mackFix_left_qian1 {
	clear: both;
	color: #b32d1f;
	font-size: 36rpx;
}

.mackFix_left_qian2 {
	clear: both;
	font-size: 26rpx;
}

.mackFix_right {
	float: right;
	height: 97rpx;
	margin-right: 30rpx;
	width: auto;
}

.mackFix_right1 {
	margin-top: 15rpx;
}

.mackFix_right1,
.mackFix_right2 {
	border: 1rpx solid #666;
	border-radius: 14rpx;
	color: #262626;
	float: left;
	font-size: 28rpx;
	height: 66rpx;
	line-height: 66rpx;
	text-align: center;
	width: 148rpx;
}

.mackFix_right2 {
	margin: 15rpx 20rpx 0;
}

.mackFix_right3 {
	background: #ca9f58;
	border-radius: 14rpx;
	color: #fff;
	float: right;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin-top: 15rpx;
	text-align: center;
	width: 150rpx;
}
</style>
