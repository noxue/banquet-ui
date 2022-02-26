<template>
	<view class="car-assessment-reserve flex-column-start-center">
		<view class="user-content">
			<view class="user-title">个人信息</view>
			<view class="user-ul">
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">姓名</view></view>
					<view class="value"><u-input v-model="form.name" placeholder="请输入姓名" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">昵称</view></view>
					<view class="value"><u-input v-model="form.nickname" placeholder="请输入昵称" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">手机号</view></view>
					<view class="value"><u-input v-model="form.phone" placeholder="请输入手机号" height="40" maxlength="11"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">性别</view></view>
					<view class="value"><u-input v-model="form.nickname" placeholder="请选择择性别" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">婚姻状况</view></view>
					<view class="value"><u-input v-model="form.nickname" placeholder="请选择婚姻状况" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">户籍地</view></view>
					<view class="value"><u-input v-model="form.nickname" placeholder="请选择户籍地" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">常住地址</view></view>
					<view class="value"><u-input v-model="form.footnote" placeholder="请输入常住地址" height="40" maxlength="50"></u-input></view>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">实名认证</view>
			<view class="user-desc">仅用作资料审核，不在页面显示</view>
			<view class="user-ul">
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload width="669rpx" height="379rpx" :custom-btn="true">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 669rpx; height: 379rpx" :src="fileUrl + '/idFace.png'"></image></view>
					</u-upload>
				</view>
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload width="669rpx" height="379rpx" :custom-btn="true">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 669rpx; height: 379rpx" :src="fileUrl + '/idEmblem.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">居住证</view>
			<view class="user-desc">非必填/仅用作资料审核，不在页面显示</view>
			<view class="user-ul">
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload width="669rpx" height="379rpx" :custom-btn="true">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 669rpx; height: 379rpx" :src="fileUrl + '/idEmblem.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">形象照</view>
			<view class="user-desc">请上传1张形象照,需穿戴厨师服、厨师帽</view>
			<view class="user-ul">
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload width="669rpx" height="379rpx" :custom-btn="true">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 669rpx; height: 379rpx" :src="fileUrl + '/idEmblem.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>
		
		<view class="user-content">
			<view class="user-title">请上传菜品的图片</view>
			<view class="user-desc">至少5张，最多10张；高质量图片有助于增加成交量</view>
			<view class="user-ul">
				<view class="flex-row-start-center u-upload" >
				  <u-upload width="144rpx" height="144rpx" :action="uploadImgUrl" @on-error="onError" @on-uploaded="onUploaded" @on-progress="onProgress" max-count="10"> </u-upload>
				</view>
			</view>
		</view>

		<view style="width: 100%;height: 200rpx;"></view>
		<view class="introduce-img"><button class="button" type="default" @click="submit">提交</button></view>
	</view>
</template>

<script>
import { isEmpty } from '@/libs/utils.js';
import uInput from '../../../uview-ui/components/u-input/u-input.vue';
import uUpload from '../../../uview-ui/components/u-upload/u-upload.vue'
import uIcon from '../../../uview-ui/components/u-icon/u-icon.vue'

/**
 * [通用版]
 */
export default {
	name: 'cookOne',
	components: { uInput,uUpload,uIcon },
	data() {
		return {
			uploadImgUrl: 'https://cdn.jinpaipingtai.com/app/car', // 上传的图片服务器地址
			fileUrl:'https://cdn.jinpaipingtai.com/app/car',
			user: {
				// 用户信息
				id: 0,
				idCard: '',
				idEmblem: '',
				idFace: '',
				name: '',
				phone: ''
			},
			form: {
				name: '',
				nickname: '',
				phone: '',
				sex: 1,
				marriage: '',
				region: '',
				dizhi: '',
				detailed: '',
				addressId: '',
				regionSel: '',
				identityZm: '',
				urlidentityZm: '',
				identityBm: '',
				urlidentityBm: '',
				permitList: '',
				urlpermitList: '',
				xingxList: '',
				urlxingxList: '',
				cookList:[]
			}
		};
	},
	onLoad(query) {},
	methods: {
		init() {},
		submit() {
			let params = {
				businessType: this.businessType,
				carId: this.carId,
				userId: this.userId,
				driverLicense: ''
			};

			// 合并上传数据
			Object.assign(params, this.form);

			// 拉取图片
			if (this.businessType === this.businessTypeConstant.transfer.key) {
				// 过户
				let filesList = this.filesListGetType2();
				params.dataListing = JSON.stringify(filesList.dataListing);
				params.buyerDataListing = JSON.stringify(filesList.buyerDataListing);
				params.driverLicense = filesList.driverLicense;
			} else {
				// 其他
				let filesList = this.filesListGetType1();
				params.dataListing = JSON.stringify(filesList.dataListing);
				params.driverLicense = filesList.driverLicense;
			}

			if (this.businessType === this.businessTypeConstant.transfer.key) {
				params.handOverType = this.transferType;
				if (isEmpty(params.handOverType)) {
					return uni.showToast({
						title: '请选择过户类型',
						icon: 'none',
						duration: 2000
					});
				}
			}

			this.submitRequest(params);
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
			padding: 0rpx 50rpx;

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

	.introduce-img {
		position: fixed;
		z-index: 2000;
		bottom: 50rpx;

		.button {
			width: 655rpx;
			height: 90rpx;
			background-color: #e72528;
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
</style>
