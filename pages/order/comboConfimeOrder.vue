<template>
	<view class="container">
		<form @submit="createConfimeOrder">
			<view class="shopHead">
				<view class="shopImgCon"><image class="shopImgs" :src="shop.first_img"></image></view>
				<view class="shopContent">
					<view class="shopContentName">{{ shop.name }}</view>
					<view class="shopContentdec">{{ shop.people_num }}</view>
					<view class="shopContentprice">
						<text>{{ shop.price }}</text>
						元
					</view>
				</view>
			</view>

			<view @tap="addAddress" class="addressCon" style="height: 100rpx">
				<view v-if="!addressesSelect.id" style="text-align: center; line-height: 100rpx">选择地址</view>
				<view v-else class="addressInfoCon">
					<view class="names">{{ addressesSelect.name }}</view>
					<view class="phones">{{ addressesSelect.phone }}</view>
				</view>
				<view class="addressContent" v-if="addresses.length != 0">{{ addressesSelect.community }}{{ addressesSelect.door_number }}</view>
			</view>

			<view class="addressCon eatTimes">
				<picker @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" mode="multiSelector" :range="multiArray" :value="multiIndex">
					<view class="picker">{{ multiArray[0][multiIndex[0]] }} {{ multiArray[1][multiIndex[1]] }}：{{ multiArray[2][multiIndex[2]] }}</view>
				</picker>
			</view>

			<view class="addressCon markCon"><textarea name="memo" placeholder="川湘鲁粤苏闽浙徽吃哪个?酸甜苦辣冷热咸香好哪口?" :value="memo"></textarea></view>
			<view class="fixFoot">
				<view class="tips">—— 稍后将有专员联系 ——</view>
				<button class="saveBtn" formType="submit" type="warn">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
var app = getApp();
export default {
	data() {
		return {
			package_type: '3', // 商品类型
			work_hour: [],
			multiArray: [],
			multiIndex: [0, 0, 0],
			memo: '',
			shop: {
				first_img: '',
				name: '',
				people_num: '',
				price: ''
			},
			addresses: [],
			addressesSelect: {}
		};
	},
	onLoad: function(t) {
		var that = this;
		var d = app.globalData.dates;
		var s = [];
		var i = [];
		for (var o in d) {
			s.push(o);
			i.push(d[o]);
		}

		that.setData({
			multiArray: [s, i[0], ['00', '30']],
			work_hour: i
		});
		this.getShopInfo(t.id);
	},
	onShow: function() {
		this.getUserInfo();
	},
	methods: {
		getShopInfo: function(t) {
			var that = this;

			this.$api.goods.partyInfo
				.request({
					partyId: t
				})
				.then(data => {
					this.shop = data;
				});
		},

		// 获取用户信息 [地址,余额]
		getUserInfo: function() {
			var that = this;

			this.$api.user.info.request().then(data => {
				// 处理地址数据
				let addresses = data.addresses.length > 0 ? data.addresses : [];
				this.addresses = addresses;
				addresses.forEach(item => {
					if (item.is_default == 1) this.addressesSelect = item;
				});
			});
		},

		bindMultiPickerChange: function(a) {
			this.setData({
				multiIndex: a.detail.value
			});
		},

		bindMultiPickerColumnChange: function(a) {
			var that = this;
			var e = {
				multiArray: this.multiArray,
				multiIndex: this.multiIndex
			};
			switch (((e.multiIndex[a.detail.column] = a.detail.value), a.detail.column)) {
				case 0:
					if (e.multiIndex[0]) {
						e.multiArray[1] = that.work_hour[e.multiIndex[0]];
					}

					e.multiIndex[1] = 0;
					e.multiIndex[2] = 0;
					break;

				case 1:
					e.multiIndex[2] = 0;
			}

			this.setData(e);
		},

		// 创建确认订单
		createConfimeOrder: function(t) {
			console.log(t);
			var that = this;
			var memo = t.detail.value.memo;

			if (!this.addressesSelect.id) return this.prompt('请选择地址');

			var date = this.multiArray[0][this.multiIndex[0]] + ' ' + this.multiArray[1][this.multiIndex[1]] + ':' + this.multiArray[2][this.multiIndex[2]];
			var id = this.shop.id;

			this.$api.order.save
				.request({
					date: date,
					package: id,
					package_type: that.package_type,
					addressesId: this.addressesSelect.id,
					memo: memo
				})
				.then(data => {
					uni.navigateTo({
						url: '/pages/order/pay?id=' + data.orderId
					});
				});
		},

		addAddress: function() {
			uni.navigateTo({
				url: '/pages/address/list'
			});
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
	background-color: #f5f5f9;
}

textarea {
	width: 100%;
	padding: 30rpx 30rpx 20rpx 0;
}

.container {
	background-color: #f5f5f9;
	justify-content: normal;
}

.form-box {
	width: 100%;
	margin-bottom: 10rpx;
}

.form-box,
.shopHead {
	background-color: #fff;
}

.shopHead {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10rpx 0;
}

.shopImgs {
	width: 200rpx;
	height: 150rpx;
}

.shopContent {
	margin-left: 20rpx;
	font-size: 30rpx;
	color: #000;
}

.shopContentdec,
.shopContentprice {
	margin-top: 10rpx;
}

.shopContentprice text {
	color: red;
}

.addressCon {
	background-color: #fff;
	border-radius: 4px;
	margin: 40rpx 60rpx;
	padding: 30rpx 0;
	font-size: 28rpx;
	color: red;
}

.addressInfoCon {
	display: flex;
	justify-content: center;
}

.addressInfoCon .phones {
	margin-left: 50rpx;
}

.addressContent {
	text-align: center;
	margin-top: 10rpx;
}

.eatTimes {
	text-align: center;
	height: 100rpx;
}

.eatTimes .picker {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
}

.markCon {
	box-sizing: border-box;
}

.markCon textarea {
	padding: 0 20rpx !important;
	width: 630rpx;
	height: 100rpx !important;
}

.fixFoot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.fixFoot .tips {
	text-align: center;
	font-size: 26rpx;
	color: #989898;
	margin-bottom: 5rpx;
}

.fixFoot .saveBtn {
	border-radius: 0;
	background-color: red;
}

.row-wrap {
	height: 88rpx;
	line-height: 88rpx;
}

.row-wrap,
.row-wrap2 {
	width: 720rpx;
	padding-left: 30rpx;
	border-bottom: 1rpx solid #eee;
	display: flex;
	font-size: 28rpx;
}

.row-wrap2 {
	min-height: 88rpx;
}

.bg_f5 {
	background-color: #f5f5f5;
	color: #e64340;
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
	margin-bottom: 80rpx;
}

button[type='default'] {
	background-color: #fff;
	color: #000;
}

picker {
	height: 100%;
	flex: 1;
}
</style>
