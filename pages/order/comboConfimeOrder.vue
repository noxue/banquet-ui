<template>
	<view class="car-assessment-reserve flex-column-start-center">
		<view class="card-item">
			<image class="image" :src="fileHost2 + detail.pic"></image>
			<view class="text-cut text-lg text-bold ui-card-fixedTitle">
				<view class="bg-mask-bottom" style="display: flex;align-items: flex-end;font-size: 40rpx;">
					{{ detail.name }}
					<view style="font-size: 30rpx;margin-left: 12rpx;">¥{{ detail.price | moneyFrom }}</view>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">基础信息</view>
			<view class="user-ul">
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">联系人</view></view>
					<view class="value"><u-input v-model="form.username" placeholder="请输入联系人" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">联系电话</view></view>
					<view class="value"><u-input v-model="form.phone" placeholder="请输入联系电话" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">用餐日期</view></view>
					<view class="value"><u-input v-model="form.datetime" @click="datetimeModal.show = true" placeholder="请输入用餐日期" disabled height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">用餐地址</view></view>
					<view class="value"><u-input v-model="form.address" placeholder="请输入用餐地址" height="40" maxlength="50"></u-input></view>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">其他备注</view>
			<view class="user-ul"><u-input type="textarea" :border="true"></u-input></view>
		</view>

		<!-- 宣传图 -->
		<view class="user-content" style="padding: 0rpx;"><image :src="fileHost + '/banner_1.jpg'" style="width: 100%;"></image></view>

		<view style="width: 100%;height: 200rpx;"></view>
		<view class="introduce-img"><button class="button" type="default" @click="submit">预约</button></view>

		<u-keyboard v-model="numberModal.show" mode="number" :dot-enabled="false" @change="numberModalChange" @backspace="numberModalBackspace"></u-keyboard>
		<u-picker v-model="datetimeModal.show" mode="time" :params="datetimeModal.params" @confirm="datetimeChange" max-date="2050-01-01" safe-area-inset-bottom></u-picker>
	</view>
</template>

<script>
import { isEmpty } from '@/libs/utils.js';
import hostConst from '@/config/hostConst.js';
import uInput from '@/uview-ui/components/u-input/u-input.vue';
import uUpload from '@/uview-ui/components/u-upload/u-upload.vue';
import uPicker from '@/uview-ui/components/u-picker/u-picker.vue';
import uIcon from '@/uview-ui/components/u-icon/u-icon.vue';
import dataValidation from '@/utils/dataValidation.js';

export default {
	name: 'cookOne',
	components: { uInput, uUpload, uIcon, uPicker },
	data() {
		return {
			fileHost: hostConst.fileHost,
			fileHost2: hostConst.fileHost2,
			id: '',
			numberModal: {
				show: false
			},
			datetimeModal: {
				show: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true // 1.3.7版本提供
				}
			},
			userInfo: {
				id: '',
				phone: '',
				pic: '',
				address: '地址',
				is_auth: false,
				is_cook: false
			},
			detail: {
				name: '',
				pic: '',
				price: '',
				description: ''
			},
			form: {
				menu_id: '',
				username: '',
				phone: '',
				datetime: '',
				address: ''
			}
		};
	},
	onLoad(query) {
		this.id = query.id;
		this.form.menu_id = parseInt(query.id);
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest() {
			this.$api.users.me.request().then(data => {
				this.userInfo = data;
				this.form.username = this.userInfo.name;
				this.form.phone = this.userInfo.phone;
				this.form.address = this.userInfo.address;
			});

			this.$api.menus.detail
				.request(
					{},
					{
						url: this.$api.menus.detail.url + this.id
					}
				)
				.then(data => {
					this.detail = data;
				});
		},
		numberModalBackspace(e) {
			let number = this.form.number_of_people;
			this.form.number_of_people = number.slice(0, number.length - 1);
		},
		numberModalChange(e) {
			this.form.number_of_people = this.form.number_of_people + '' + e;
		},
		datetimeChange(e) {
			this.form.datetime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
		},
		submit() {
			let check = dataValidation.validation(
				{
					username: '联系人,r',
					phone: '手机号,r,mobile',
					datetime: '用餐时间,r',
					address: '用餐地址,r'
				},
				this.form
			);
			if (check.flag === false) {
				return uni.showToast({
					icon: 'none',
					title: check.msg
				});
			}

			this.$api.orders.post.request(this.form).then(data => {
				let orderId = data.order_id;
				// #ifdef APP
				let pay_type = 'weCahtApp';
				// #endif

				// #ifdef MP-WEIXIN
				let pay_type = 'weCahtMini';
				// #endif

				let params = {
					orderId,
					pay_type
				};

				this.$api.orders.pay.request(params).then(payData => {
					// {
					//   appid:"",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
					//   partnerid:"",   // 微信支付商户号
					//   prepay_id:"",   // 统一下单订单号
					//   sign:"",  // 签名
					//   noncestr:"", // 随机字符串
					//   timeStamp:"", // 时间戳
					//  }

					if (params.pay_type == 'weChatMini') {
						uni.requestPayment({
							appId: payData.appid,
							signType: 'MD5',
							nonceStr: payData.noncestr,
							package: 'prepay_id=' + payData.prepay_id,
							paySign: payData.sign,
							timeStamp: payData.timeStamp,
							success: e => {
								this.paySuccess(orderId);
							},
							fail: e => {
								uni.showModal({
									content: '支付失败,原因为: ' + e.errMsg,
									showCancel: false
								});
							},
							complete: () => {}
						});
					} else if (params.pay_type == 'weCahtApp') {
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: {
								appid: payData.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								noncestr: payData.noncestr, // 随机字符串
								package: 'Sign=WXPay', // 固定值
								partnerid: payData.partnerid, // 微信支付商户号
								prepayid: payData.prepay_id, // 统一下单订单号
								timestamp: payData.timeStamp, // 时间戳（单位：秒）
								sign: payData.sign // 签名，这里用的 MD5/RSA 签名
							},
							success: e => {
								this.paySuccess(orderId);
							},
							fail: e => {
								uni.showModal({
									content: '支付失败,原因为: ' + e.errMsg,
									showCancel: false
								});
							},
							complete: () => {}
						});
					}
				});
				setTimeout(() => {
					// TODO 支付开发
					uni.switchTab({
						url: '/pages/order/paySuccess'
					});
				}, 2000);
			});
		},
		// 支付成功
		paySuccess(orderId) {
			uni.showToast({
				title: '支付成功',
				icon: 'none'
			});

			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/order/paySuccess?orderId=' + orderId
				});
			}, 1500);
		}
	}
};
</script>

<style scoped lang="scss">
.car-assessment-reserve {
	.banner-content {
		margin-top: 22rpx;
	}

	.user-content {
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		width: 705rpx;
		background-color: #ffffff;
		border-radius: 20rpx;

		.user-title {
			padding-left: 25rpx;
			height: 90rpx;
			font-size: 30rpx;
			line-height: 90rpx;
			color: #151515;
		}

		.user-desc {
			padding-left: 25rpx;
			font-size: 24rpx;
			color: #a6a6a6;
		}

		.user-ul {
			padding: 0rpx 40rpx;

			.user-li {
				padding: 20rpx 0rpx;
				border-bottom: 2rpx solid #f9f9f9;

				.label {
					margin-left: 10rpx;
					width: 120rpx;

					.text-align-last {
						text-align-last: justify;
					}

					&::after {
						content: ':';
					}
				}

				.value {
					margin-left: 80rpx;
				}
			}
		}
	}

	.data-content {
		margin-top: 20rpx;
		padding: 0rpx 40rpx;
		width: 100%;
		background-color: #fff;

		.data-title {
			height: 57rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #151515;
		}

		.data-ul {
			.transfer-title {
				margin-top: 30rpx;
				margin-bottom: 20rpx;
				text-align: center;
				font-size: 30rpx;
				color: #151515;
			}

			.data-item {
				margin-top: 35rpx;

				.upload-image {
					width: 669rpx;
					height: 379rpx;
					background-color: #fff9fa;
					border-radius: 20rpx;
				}
			}
		}
	}

	.upload-image {
		width: 100%;
		height: 379rpx;
		background-color: #fff9fa;
		border-radius: 20rpx;
	}
}

.u-upload {
	flex-wrap: wrap;
	align-items: center;
	margin-top: 10rpx;
}

.value {
	flex: 1;
}

.card-item {
	position: relative;
	margin-top: 30rpx;
	// margin-left: 20rpx;
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
