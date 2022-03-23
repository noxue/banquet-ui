<template>
	<view class="car-assessment-reserve flex-column-start-center">
		<view class="user-content">
			<view class="user-title">基础信息</view>
			<view class="user-ul">
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">联系人</view></view>
					<view class="value"><u-input v-model="form.name" placeholder="请输入联系人" height="40" maxlength="50"></u-input></view>
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
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">用餐人数</view></view>
					<view class="value"><u-input v-model="form.number_of_people" @click="numberModal.show = true" disabled placeholder="请输入用餐人数" height="40" maxlength="11"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">用餐地址</view></view>
					<view class="value"><u-input v-model="form.address" placeholder="请输入用餐地址" height="40" maxlength="50"></u-input></view>
				</view>
				<!-- 	<view class="user-li flex-row-start-center">
						<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">详细地址</view></view>
						<view class="value"><u-input v-model="form.address" placeholder="请输入详细地址" height="40" maxlength="50"></u-input></view>
					</view> -->
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">其他备注</view>
			<view class="user-ul"><u-input type="textarea" :border="true"></u-input></view>
		</view>

		<!-- 宣传图 -->
		<view class="user-content" style="padding: 0rpx;"><image :src="hostConst.fileHost + '/1.jpg'" style="width: 100%;"></image></view>

		<view style="width: 100%;height: 200rpx;"></view>
		<view class="introduce-img"><button class="button" type="default" @click="submit">提交</button></view>
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

/**
 * [通用版]
 */
export default {
	name: 'cookOne',
	components: { uInput, uUpload, uPicker,uIcon },
	data() {
		return {
			hostConst,
			numberModal: {
				show: false
			},
			datetimeModal: {
				show: false,
				params : {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true, // 1.3.7版本提供
				}
			},
			form: {
				name: '',
				phone: '',
				datetime: '',
				number_of_people: '',
				address: ''
			}
		};
	},
	onLoad() {
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest() {
			this.$api.users.me.request().then(data => {
				this.form.name = data.name;
				this.form.phone = data.phone;
				this.form.address = data.address;
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
					name: '联系人,r',
					phone: '手机号,r,mobile',
					datetime: '用餐时间,r',
					number_of_people: '用餐人数,r,nubmer',
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

			console.log('提交订单', this.form);
			this.form.number_of_people = parseInt(this.form.number_of_people);
			this.$api.reservations.post.request(this.form).then(data => {
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 2000);
			});
		}
	}
};
</script>

<style>
page {
	background-color: #fcfcfc;
}
</style>
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
</style>
