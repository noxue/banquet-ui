<template>
	<view class="car-assessment-reserve flex-column-start-center" style="position: relative;">
		<view class="user-content">
			<view class="user-title">工作时间段</view>
			<view class="user-desc">请添加工作时间，方便推荐工作岗位</view>
			<view class="user-ul">
				<div style="margin-top: 30rpx;">
					<u-time-line>
						<template v-for="(item, index) in form.workTime">
							<u-time-line-item :key="index">
								<template v-slot:content>
									<view style="display: flex;align-items: center;">
										<view style="padding: 10rpx 20rpx;background-color: rgb(234, 235, 235);border-radius: 15rpx;" @click="changWorkTime(index, 'start_time')">{{ item.start_time ? item.start_time : '设置时间' }}</view>
										<view style="margin: 0rpx 10rpx;">至</view>
										<view style="padding: 10rpx 20rpx;background-color: rgb(234, 235, 235);border-radius: 15rpx;" @click="changWorkTime(index, 'end_time')">{{ item.end_time ? item.end_time : '设置时间' }}</view>
										<view style="margin-left: 30rpx;" @click="deleteWorkTime(index)">删除</view>
									</view>
								</template>
							</u-time-line-item>
						</template>
						<u-time-line-item>
							<template v-slot:content>
								<view style="display: flex;" @click="addWorkTime"><view style="padding: 10rpx 20rpx;background-color: rgb(234, 235, 235);border-radius: 15rpx;">添加时间</view></view>
							</template>
						</u-time-line-item>
					</u-time-line>
				</div>
			</view>
		</view>

		<u-select v-model="timeList.show" mode="mutil-column" :list="timeList.data" @confirm="changWorkConfirm"></u-select>
		<view style="width: 100%;height: 200rpx;"></view>
		<view class="introduce-img"><button class="button" type="default" @click="submit">提交</button></view>
	</view>
</template>

<script>
import { isEmpty } from '@/libs/utils.js';
import uTimeLine from '@/uview-ui/components/u-time-line/u-time-line.vue';
import uTimeLineItem from '@/uview-ui/components/u-time-line-item/u-time-line-item.vue';
import uSelect from '@/uview-ui/components/u-select/u-select.vue';

import timeList from '@/libs/time.js';
import hostConst from '@/config/hostConst.js';
import dataValidation from '@/utils/dataValidation.js';

export default {
	name: 'cookOne',
	components: { uTimeLine, uTimeLineItem, uSelect },
	data() {
		return {
			fileUrl: hostConst.fileHost,
			timeList: {
				show: false,
				data: timeList,
				index: 0,
				index2: 0
			},
			form: {
				workTime: []
			}
		};
	},
	onLoad(query) {
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest() {
			this.$api.users.me.request().then(data => {
				this.userInfo = data;

				this.$api.cooks.workTime.get
					.request(
						{},
						{
							url: hostConst.apiHost + `/cooks/${data.id}/spare_time`
						}
					)
					.then(data => {
						this.form.workTime = data;
					});
			});
		},
		addWorkTime() {
			let data = {
				start_time: '',
				end_time: ''
			};

			this.form.workTime.push(data);
		},
		changWorkTime(index, index2) {
			this.timeList.show = true;
			this.timeList.index = index;
			this.timeList.index2 = index2;
		},
		changWorkConfirm(data) {
			this.form.workTime[this.timeList.index][this.timeList.index2] = data[0].value + ':' + data[1].value;
		},
		deleteWorkTime(index) {
			this.form.workTime.splice(index, 1);
			this.form.workTime = this.form.workTime;
		},
		submit() {
			let workTimeChcek = true;
			this.form.workTime.map(item => {
				if (!item.start_time || !item.end_time) {
					workTimeChcek = false;
				}
			});

			if (workTimeChcek === false) {
				return uni.showToast({
					icon: 'none',
					title: '请输入正确的工作时间'
				});
			}

			console.log('规则', this.formRule);
			console.log('表单', this.form);
			let check = dataValidation.validation(this.formRule, this.form);
			if (check.flag === false) {
				return uni.showToast({
					icon: 'none',
					title: check.msg
				});
			}

			this.$api.cooks.workTime.post
				.request(this.form.workTime, {
					url: hostConst.apiHost + `/cooks/${this.userInfo.id}/spare_time`
				})
				.then(data => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/my/my'
						});
					}, 1500);
				});
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
			position: relative;
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
			padding: 0rpx 50rpx;

			.user-li {
				position: relative;
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
					flex: 1;
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
					height: 340rpx;
					background-color: #fff9fa;
					border-radius: 20rpx;
				}
			}
		}
	}

	.upload-image {
		width: 100%;
		height: 340rpx;
		background-color: #fff9fa;
		border-radius: 20rpx;
	}

	.introduce-img {
		position: fixed;
		z-index: 2000;
		bottom: 50rpx;

		.button {
			width: 655rpx;
			height: 90rpx;
			// background-color: #e72528;
			border-radius: 18rpx;
			font-size: 36rpx;
			color: #ffffff;
		}
	}
}

.u-upload {
	flex-wrap: wrap;
	align-items: center;
	margin-top: 10rpx;
}

.required::before {
	content: '*';
	position: absolute;
	left: -10rpx;
	color: red;
}

.required2::before {
	content: '*';
	position: absolute;
	left: 7rpx;
	color: red;
}
</style>
