<template>
	<view class="container">
		<form @submit="bindSave" :reportSubmit="true">
			<view class="tipTitle">选择服务信息</view>
			<view class="addressInfo">
				<view @tap="addAddress" class="addresss">
					<view v-if="!addressesSelect.id">选择服务地址</view>
					<view class="addressContent" v-else>
						<view>
							{{ addressesSelect.name }}
							<text class="phone">{{ addressesSelect.phone }}</text>
						</view>
						<view class="doorNumber">{{ addressesSelect.community }}{{ addressesSelect.door_number }}</view>
					</view>
				</view>
				<view class="dateCon">
					<picker @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" mode="multiSelector" :range="multiArray" :value="multiIndex">
						<view class="picker">{{ multiArray[0][multiIndex[0]] }} {{ multiArray[1][multiIndex[1]] }}</view>
					</picker>
				</view>
			</view>
			<view class="tipTitle">选择套餐</view>
			<view class="setMeals">
				<picker @change="bindPickerChange" :range="mealArray" rangeKey="namePrice" :value="mealIndex">
					<view class="picker">{{ mealArray[mealIndex].namePrice }}</view>
				</picker>
			</view>
			<view class="tipTitle">备注</view>
			<view class="markCon"><textarea name="memo" placeholder="川湘鲁粤苏闽浙徽吃哪个?酸甜苦辣冷热咸香好哪口?" :value="memo"></textarea></view>
			<view class="fixFoot">
				<view class="tips">—— 稍后将有专员联系 ——</view>
				<button class="saveBtn" formType="submit" type="warn">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
var app = getApp();

/**
 * 厨师确认订单
 */
export default {
	data() {
		return {
			package_type: '1', // 商品类型
			multiArray: [],
			multiIndex: [0, 0],
			mealArray: [],
			mealIndex: 0,
			memo: null,
			addresses: [], // 地址列表
			addressesSelect: {
				// 当前选择地址信息
				community: '',
				door_number: '',
				name: '',
				phone: ''
			}
		};
	},
	packages: {}, // 菜品
	work_days: {}, // 时间段
	package_prices: {}, // 菜品+时间段 对应的价格
	onShow: function() {
		this.getBespeakInfo();
		this.getInfoDetail();
	},
	methods: {
		// 获取预约信息
		getBespeakInfo: function() {
			let that = this;
			this.$api.goods.bespeakInfo.request().then(data => {
				that.packages = data.quick.packages;
				that.package_prices = data.quick.package_prices;
				that.work_days = data.quick.work_days;
				var i = [[], []];

				for (var s in that.package_prices) {
					i[0].push(s);
				}

				this.multiArray = i;
				that.resetTime();
			});
		},

		// 获取用户最新消息
		getInfoDetail: function() {
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
			var t = {
				multiArray: this.multiArray,
				multiIndex: this.multiIndex
			};

			switch (((t.multiIndex[a.detail.column] = a.detail.value), a.detail.column)) {
				case 0:
					this.resetTime();
					break;

				case 1:
					this.resetPrice();
			}

			this.setData(t);
		},

		// 重置价格
		resetPrice: function() {
			var a = this.multiArray[0][this.multiIndex[0]];
			var t = this.multiArray[1][this.multiIndex[1]];
			var e = [];
			for (var i in this.packages[a]) {
				e.push({
					id: this.packages[a][i].id,
					date: a + ' ' + t,
					namePrice: this.packages[a][i].name + '/' + this.package_prices[a][t][this.packages[a][i].id] + '元'
				});
			}

			e[this.mealIndex] || (this.mealIndex = 0);
			this.setData({
				mealArray: e,
				mealIndex: this.mealIndex
			});
		},

		// 重置时间
		resetTime: function() {
			var a = [];
			var t = this.multiArray[0][this.multiIndex[0]];
			var e = this.multiArray[1][this.multiIndex[1]];
			a = this.work_days[t];
			this.multiArray[1] = a;
			this.package_prices[t][e] || (this.multiIndex[1] = 0);
			this.setData({
				multiArray: this.multiArray,
				multiIndex: this.multiIndex
			});
			this.resetPrice();
		},

		bindPickerChange: function(a) {
			this.setData({
				mealIndex: a.detail.value
			});
		},

		// 提交订单
		bindSave: function(t) {
			console.log(t);
			var that = this;
			var memo = t.detail.value.memo;

			if (!this.addressesSelect.id) return this.prompt('请选择地址');

			let params = {
				date: this.multiArray[0][this.multiIndex[0]] + ' ' + this.multiArray[1][this.multiIndex[1]],
				package: this.mealArray[this.mealIndex].id,
				package_type: this.package_type,
				memo: memo,
				addressesId: this.addressesSelect.id,
				app: 13
			};

			this.$api.order.save.request(params).then(data => {
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
}

.container,
page {
	background-color: #f5f5f9;
}

.container {
	justify-content: normal;
}

.tipTitle {
	font-size: 24rpx;
	color: #989898;
	text-align: center;
	margin: 20rpx 0;
}

.addressInfo {
	display: flex;
	margin: 0 30rpx;
	align-items: center;
}

.addresss {
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.addresss,
.dateCon {
	flex: 1;
	text-align: center;
	color: red;
	font-size: 26rpx;
	background-color: #fff;
	border-radius: 6px;
}

.dateCon {
	line-height: 120rpx;
}

.addressContent .phone,
.dateCon {
	margin-left: 20rpx;
}

.addressContent .doorNumber {
	margin-top: 10rpx;
}

.setMeals {
	border-radius: 6px;
	line-height: 150rpx;
	text-align: center;
	font-size: 28rpx;
}

.markCon,
.setMeals {
	background-color: #fff;
	margin: 0 30rpx;
}

.form-box {
	width: 100%;
	background-color: #fff;
	margin-bottom: 10rpx;
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

textarea {
	width: 630rpx;
	height: 150rpx;
	font-size: 28rpx;
	color: red;
	padding: 30rpx 30rpx 20rpx;
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
</style>
