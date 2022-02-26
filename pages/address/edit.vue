<template>
	<view class="container">
		<form @submit="bindSave">
			<view class="form-box">
				<view class="row-wrap">
					<view class="label">联系人</view>
					<view class="label-right"><input class="input" name="name" placeholder="姓名" type="text" :value="addressData.name" /></view>
				</view>
				<view class="row-wrap">
					<view class="label">手机号码</view>
					<view class="label-right"><input class="input" maxlength="11" name="phone" placeholder="11位手机号码" type="number" :value="addressData.phone" /></view>
				</view>
				<view class="row-wrap">
					<view class="label">小区名称</view>
					<navigator :extraData="addressData" url="/pages/address/search">
						<view class="label-right"><input class="input" name="community" placeholder="例如三里屯北小区" type="text" :value="addressData.community" /></view>
					</navigator>
				</view>
				<view class="row-wrap">
					<view class="label">门牌号</view>
					<view class="label-right"><input class="input" name="door_number" placeholder="例如1号楼501" type="text" :value="addressData.door_number" /></view>
				</view>
			</view>
			<button class="save-btn" formType="submit" type="warn">保存</button>
		</form>
	</view>
</template>

<script>
var app = getApp();

var t = require('../../utils/cache.js');

export default {
	data() {
		return {
			id: null,
			addressData: {
				name: null,
				phone: null,
				area: null,
				community: null,
				door_number: null,
				lat: null,
				lng: null
			}
		};
	},
	onLoad: function(a) {
		if (a.id) {
			this.setData({
				id: a.id
			});
			this.getAddressDetail(a.id);
		} else {
			this.addressData.name = a.userName;
			this.addressData.phone = a.phone;
			this.setData({
				addressData: this.addressData
			});
		}
	},
	onShow: function() {
		var a = t.get('address_select_item');

		if (a) {
			this.addressData.area = a.district;
			this.addressData.community = a.name;
			this.addressData.lng = a.location.lng;
			this.addressData.lat = a.location.lat;
			this.setData({
				addressData: this.addressData
			});
		}

		console.log(this.addressData);
	},
	methods: {
		// 获取地址信息
		getAddressDetail: function(id) {
			var that = this;

			this.$api.user.addressInfo.request({ id: id }).then(data => {
				that.addressData = data;
				t.set('address_select_text', that.addressData.community, 1);
			});
		},

		bindSave: function(t) {
			var e = t.detail.value.name;
			var s = t.detail.value.phone;
			var d = (t.detail.value.area, t.detail.value.community);
			var o = t.detail.value.door_number;
			var i = /^((0\d{2,3}-?\d{7,8})|(1[35784]\d{9}))$/;

			if ('' != e && i.test(s) && '' != d && '' != o) {
				var params = {
					name: e,
					phone: s,
					community: d,
					door_number: o,
					lng: this.addressData.lng,
					lat: this.addressData.lat
				};

				if (this.id) {
					var l = app.globalData.user.editAddress;
					params.id = this.id;
					this.$api.user.addressSave.request(params).then(data => {
						uni.showModal({
							title: '提示',
							content: '保存成功',
							showCancel: false,
							success: function(a) {
								if (a.confirm) {
									uni.navigateBack({});
								} else {
									if (a.cancel) {
										console.log('用户点击取消');
									}
								}
							}
						});
					});
				} else {
					this.$api.user.addressSave.request(params).then(data => {
						uni.showModal({
							title: '提示',
							content: '保存成功',
							showCancel: false,
							success: function(a) {
								if (a.confirm) {
									uni.navigateBack({});
								} else {
									if (a.cancel) {
										console.log('用户点击取消');
									}
								}
							}
						});
					});
				}
			} else {
				this.prompt('请输入联系人');
			}
		},

		prompt: function(a) {
			uni.showModal({
				title: '提示',
				content: a,
				showCancel: false,
				confirmText: '知道了',
				success: function(a) {}
			});
		}
	}
};
</script>
<style>
page {
	height: 100%;
}

.container,
page {
	background-color: #f5f5f9;
}

.container {
	justify-content: normal;
}

.form-box {
	width: 100%;
	background-color: #fff;
	margin-top: 10rpx;
}

.row-wrap {
	width: 720rpx;
	height: 88rpx;
	line-height: 88rpx;
	margin-left: 30rpx;
	border-bottom: 1rpx solid #eee;
	display: flex;
	font-size: 28rpx;
}

.row-wrap .label {
	width: 160rpx;
	color: #000;
}

.row-wrap .label-right {
	flex: 1;
	height: 88rpx;
	line-height: 88rpx;
}

.row-wrap .label-right input {
	height: 100%;
	font-size: 28rpx;
	padding-right: 30rpx;
}

.row-wrap .right-box {
	margin-right: 30rpx;
}

.cancel-btn,
.save-btn {
	width: 690rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	margin-top: 30rpx;
	border-radius: 6rpx;
	box-sizing: border-box;
}

.save-btn {
	background-color: #e64340;
	color: #fff;
}

button[type='default'] {
	background-color: #fff;
	color: #000;
}
</style>
