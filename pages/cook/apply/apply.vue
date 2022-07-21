<template>
	<view class="car-assessment-reserve flex-column-start-center" style="position: relative;">
		<view v-if="userInfo.cook_status != 0" style="margin-top: 20rpx; width: 708rpx;padding: 16rpx 20rpx;background: rgb(189 246 228);font-size: 28rpx; color: #ff6b6b;border-radius: 10rpx;text-align: center;">
			<view>{{ cookText }}</view>
			<view v-if="userInfo.cook_status == 3 && this.cookMsg" style="word-break: break-all;word-wrap: break-word;">失败原因:{{ this.cookMsg }}</view>
		</view>

		<view v-if="userInfo.cook_status == 1 || userInfo.cook_status == 2" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 100;"></view>

		<view class="user-content">
			<view class="user-title">个人信息</view>
			<view class="user-ul">
				<view class="user-li flex-row-start-center required">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">真实姓名</view></view>
					<view class="value"><u-input v-model="form.name" placeholder="请输入真实姓名" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0 required"><view class="text-align-last flex-1">手机号</view></view>
					<view class="value"><u-input v-model="form.phone" placeholder="请输入手机号" height="40" maxlength="11"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">性别</view></view>
					<view class="value"><u-input :value="sexModal.list[form.sex].label" @click="sexModal.show = true" disabled placeholder="请选择择性别" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">婚姻状况</view></view>
					<view class="value"><u-input :value="marryModal.list[form.marry_status].label" @click="marryModal.show = true" disabled placeholder="请选择婚姻状况" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center required">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">户籍地</view></view>
					<view class="value"><u-input v-model="form.origin_address" @click="originAddressModal.show = true" disabled placeholder="请选择户籍地" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center required">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">常住地址</view></view>
					<view class="value"><u-input v-model="form.address" placeholder="请输入常住地址" height="40" maxlength="50"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center required">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">履历信息</view></view>
					<view class="value"><u-input v-model="form.description" type="textarea" placeholder="请输入履历信息"></u-input></view>
				</view>
				<view class="user-li flex-row-start-center">
					<view class="label flex-row flex-shrink-0"><view class="text-align-last flex-1">擅长菜系</view></view>
					<view class="value flex-row">
						<view class="flex-1"><u-tag style="margin-left: 15rpx;margin-top: 15rpx;" v-for="(item, index) in formData.food_types" :key="index" :text="item" type="info" :closeable="true" @close="cookStyleClose(index)" /></view>
						<u-icon name="plus-circle" size="35" style="color: #ff9090;" @click="cookStyleOpen"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title required2">形象照</view>
			<view class="user-desc">请上传1张形象照,需穿戴厨师服、厨师帽</view>
			<view class="user-ul">
				<view class="upload-image" style="width: 260rpx; margin-top: 20rpx;">
					<u-upload ref="photo" width="260rpx" height="340rpx" :custom-btn="true" max-count="1" :action="uploadImgUrl" :header="header" :file-list="formData.photo">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 260rpx; height: 340rpx" :src="fileUrl + '/chushi.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title required2">实名认证</view>
			<view class="user-desc">仅用作资料审核，不在页面显示</view>
			<view class="user-ul">
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload ref="identify_card1" width="605rpx" height="340rpx" :custom-btn="true" max-count="1" :action="uploadImgUrl" :header="header" :file-list="formData.identify_card1">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 605rpx; height: 340rpx" :src="fileUrl + '/idFace.png'"></image></view>
					</u-upload>
				</view>
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload ref="identify_card2" width="605rpx" height="340rpx" :custom-btn="true" max-count="1" :action="uploadImgUrl" :header="header" :file-list="formData.identify_card2">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 605rpx; height: 340rpx" :src="fileUrl + '/idEmblem.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">厨师证</view>
			<view class="user-desc">非必填</view>
			<view class="user-ul">
				<view class="upload-image" style="margin-top: 20rpx;">
					<u-upload ref="residence_permit" width="605rpx" height="340rpx" :custom-btn="true" max-count="1" :action="uploadImgUrl" :header="header" :file-list="formData.residence_permit">
						<view slot="addBtn" style="font-size: 0rpx" hover-class="slot-btn__hover" hover-stay-time="150"><image style="width: 605rpx; height: 340rpx" :src="fileUrl + '/juzhuzheng.png'"></image></view>
					</u-upload>
				</view>
			</view>
		</view>

		<!-- 
		<view class="user-content">
			<view class="user-title">擅长菜系</view>
			<view class="user-desc">请添加接单时间，方便推荐工作岗位</view>
			<view class="user-ul">
				<veiw style="width: 100%;height: 200rpx;display: flex;align-items: center;justify-content: center;">审核通过后添加</veiw>
			</view>
		</view> 
		-->

		<view class="user-content">
			<view class="user-title required2">请上传菜品的图片</view>
			<view class="user-desc">至少5张，最多10张；高质量图片有助于增加成交量</view>
			<view class="user-ul">
				<view class="flex-row-start-center u-upload"><u-upload ref="foods" width="144rpx" height="144rpx" :action="uploadImgUrl" :header="header" :file-list="formData.foods" max-count="10"></u-upload></view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-title">接单时间段</view>
			<view class="user-desc">请添加接单时间，方便推荐工作岗位</view>
			<view class="user-ul">
				<veiw style="width: 100%;height: 200rpx;display: flex;align-items: center;justify-content: center;">审核通过后添加</veiw>
				<!-- 	<u-time-line style="margin-top: 30rpx;">
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
				</u-time-line> -->
			</view>
		</view>

		<u-select v-model="sexModal.show" :list="sexModal.list" @confirm="sexModalCange"></u-select>
		<u-select v-model="marryModal.show" :list="marryModal.list" @confirm="marryModalCange"></u-select>
		<u-select v-model="timeList.show" mode="mutil-column" :list="timeList.data" @confirm="changWorkConfirm"></u-select>
		<u-select v-model="cookStyleModal.show" :list="cookStyleModal.list" @confirm="cookStyleAdd"></u-select>
		<u-picker v-model="originAddressModal.show" mode="region" @confirm="originAddressModalChange"></u-picker>
		<view style="width: 100%;height: 200rpx;"></view>
		<view v-if="userInfo.cook_status == 0 || userInfo.cook_status == 3" class="introduce-img">
			<button class="button" type="default" @click="submit">{{ userInfo.cook_status == 0 ? '申请' : '' }} {{ userInfo.cook_status == 3 ? '重新申请' : '' }}</button>
		</view>
	</view>
</template>

<script>
import { isEmpty } from '@/libs/utils.js';
import uInput from '../../../uview-ui/components/u-input/u-input.vue';
import uUpload from '../../../uview-ui/components/u-upload/u-upload.vue';
import uTag from '@/uview-ui/components/u-tag/u-tag.vue';
import uIcon from '@/uview-ui/components/u-icon/u-icon.vue';
import uTimeLine from '@/uview-ui/components/u-time-line/u-time-line.vue';
import uTimeLineItem from '@/uview-ui/components/u-time-line-item/u-time-line-item.vue';
import uSelect from '@/uview-ui/components/u-select/u-select.vue';

import userServe from '@/libs/userServe.js';
import timeList from '@/libs/time.js';
import hostConst from '@/config/hostConst.js';
import dataValidation from '@/utils/dataValidation.js';

export default {
	name: 'apply',
	components: { uInput, uUpload, uIcon, uTag, uTimeLine, uTimeLineItem, uSelect },
	data() {
		return {
			uploadImgUrl: hostConst.upFileHost, // 上传的图片服务器地址
			fileUrl: hostConst.fileHost,
			fileUrl2: hostConst.fileHost2,
			header: {
				Authorization: ''
			},
			timeList: {
				show: false,
				data: timeList,
				index: 0,
				index2: 0
			},
			sexModal: {
				show: false,
				list: [
					{
						value: 0,
						label: '未知'
					},
					{
						value: 1,
						label: '男'
					},
					{
						value: 2,
						label: '女'
					}
				]
			},
			marryModal: {
				show: false,
				list: [
					{
						value: 0,
						label: '未知'
					},
					{
						value: 1,
						label: '未婚'
					},
					{
						value: 2,
						label: '已婚'
					}
				]
			},
			originAddressModal: {
				show: false
			},
			cookStyleModal: {
				// 烹饪样式列表
				show: false,
				list: []
			},
			userInfo: {
				// 用户信息
				id: 0,
				cook_status: 0,
				idCard: '',
				idEmblem: '',
				idFace: '',
				name: '',
				phone: ''
			},
			cookText: '',
			cookMsg: '',
			formData: {
				// 涉及到转换的提交数据
				photo: [], // 上传文件后返回的相对路径
				identify_card1: [], // 上传文件后返回的相对路径
				identify_card2: [], // 上传文件后返回的相对路径
				residence_permit: [], // 上传文件后返回的相对路径
				foods: [], // 可选，厨师擅长的食物列表，组装成json数组，如果没有，传 null
				food_types:[]
			},
			form: {
				// 最终提交数据
				name: '', // 必填,用户姓名
				phone: '', // 注：前端界面上为了提高体验，可以自动把个人信息中的手机号填进去
				sex: 0, //数字类型，可选，默认为 0 未知， 1 男，2 女
				marry_status: 0, // 数字类型，可选， 婚姻状态：0 未知，1 未婚，2 已婚
				origin_address: '', // 可选，默认为空
				address: '', // 可选，默认为空
				description: '', // 可选，默认为空
				photo: '', // 上传文件后返回的相对路径
				identify_card1: '', // 上传文件后返回的相对路径
				identify_card2: '', // 上传文件后返回的相对路径
				residence_permit: '', // 上传文件后返回的相对路径
				foods: '', // 可选，厨师擅长的食物列表，组装成json数组，如果没有，传 null
				workTime: [],
				food_types: ''
			},
			formRule: {
				name: '真实姓名,r', // 必填,用户姓名
				phone: '手机号,r,mobile', // 注：前端界面上为了提高体验，可以自动把个人信息中的手机号填进去
				origin_address: '户籍地,r', // 可选，默认为空
				address: '常住地址,r', // 可选，默认为空
				description: '履历信息,l|max-100', // 可选，默认为空
				photo: '形象照,r', // 上传文件后返回的相对路径
				identify_card1: '身份证正面,r', // 上传文件后返回的相对路径
				identify_card2: '身份证背面,r', // 上传文件后返回的相对路径
				foods: '上传菜品,r,array|5-10' // 可选，厨师擅长的食物列表，组装成json数组，如果没有，传 null
				// workTime: '工作时间段,r,array|min-1'
			}
		};
	},
	onLoad(query) {
		console.log(userServe.getUserToken());
		this.header.Authorization = 'Bearer ' + userServe.getUserToken();
		this.pageDataRequest();
	},
	methods: {
		pageDataRequest() {
			this.$api.cooks.food_types.request().then(data => {
				if (data.length > 0) {
					this.cookStyleModal.list = data.split('|').map(item => {
						return {
							value: item,
							label: item
						};
					});
					
					console.log('怕減肥的',this.cookStyleModal)
				}
			});

			this.$api.users.me.request().then(data => {
				this.userInfo = data;

				if (this.userInfo.is_cook == 1) {
					this.cookText = '厨师';
				} else {
					if (this.userInfo.cook_status === 0) {
						this.cookText = '请申请';
					} else if (this.userInfo.cook_status === 1) {
						this.cookText = '审核中';
					} else if (this.userInfo.cook_status === 2) {
						this.cookText = '已通过';
					} else if (this.userInfo.cook_status === 3) {
						this.cookText = '申请驳回';
					}
				}

				this.form.name = data.name;
				this.form.phone = data.phone;

				this.cooksMeRequest();
			});
		},
		cooksMeRequest() {
			this.$api.cooks.me.request().then(data => {
				console.log('哈哈', data);
				this.form.name = data.name;
				this.form.phone = data.phone;
				this.form.sex = data.sex;
				this.form.marry_status = data.marry_status;
				this.form.origin_address = data.origin_address;
				this.form.address = data.address;
				this.form.description = data.description;

				this.cookMsg = data.msg;

				this.formData.photo = [
					{
						url: this.fileUrl2 + data.photo,
						urlSoure: data.photo
					}
				];

				this.formData.identify_card1 = [
					{
						url: this.fileUrl2 + data.identify_card1,
						urlSoure: data.identify_card1
					}
				];

				this.formData.identify_card2 = [
					{
						url: this.fileUrl2 + data.identify_card2,
						urlSoure: data.identify_card2
					}
				];

				this.formData.residence_permit = [
					{
						url: this.fileUrl2 + data.residence_permit,
						urlSoure: data.residence_permit
					}
				];

				let list = JSON.parse(data.foods);
				this.formData.foods = list.map((item, index) => {
					return {
						url: this.fileUrl2 + item,
						urlSoure: item
					};
				});

				this.formData.food_types = data.food_types.split('|');
				this.formData.workTime = data.workTime;

				console.log(this.formData);
			});
		},
		// sexModalClick() {
		// 	this.sexModal.show = true;
		// },
		sexModalCange(e) {
			this.form.sex = e[0].value;
		},
		// marryModalClick() {
		// 	this.marryModal.show = true;
		// },
		marryModalCange(e) {
			this.form.marry_status = e[0].value;
		},
		originAddressModalChange(e) {
			this.form.origin_address = e.province.label + e.city.label + e.area.label;
		},
		// 打开选择器
		cookStyleOpen() {
			this.cookStyleModal.show = !this.cookStyleModal.show;
		},
		cookStyleAdd(data) {
			this.formData.food_types.push(data[0].value);
			console.log(this.formData.food_types);
		},
		cookStyleClose(index) {
			this.formData.food_types.splice(index, 1);
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
			this.form.photo = '';
			this.$refs.photo.lists.filter(val => {
				console.log(val);
				if (val.progress == 100) {
					if (val.response) {
						this.form.photo = val.response.data.src;
					} else if (val.url) {
						this.form.photo = val.url.replace(this.fileUrl2, '');
					}
				}
			});

			this.form.identify_card1 = '';
			this.$refs.identify_card1.lists.filter(val => {
				if (val.progress == 100) {
					if (val.response) {
						this.form.identify_card1 = val.response.data.src;
					} else if (val.url) {
						this.form.identify_card1 = val.url.replace(this.fileUrl2, '');
					}
				}
			});

			this.form.identify_card2 = '';
			this.$refs.identify_card2.lists.filter(val => {
				if (val.progress == 100) {
					if (val.response) {
						this.form.identify_card2 = val.response.data.src;
					} else if (val.url) {
						this.form.identify_card2 = val.url.replace(this.fileUrl2, '');
					}
				}
			});

			this.form.residence_permit = '';
			this.$refs.residence_permit.lists.filter(val => {
				console.log('居住证');
				if (val.progress == 100) {
					if (val.response) {
						this.form.residence_permit = val.response.data.src;
					} else if (val.url) {
						this.form.residence_permit = val.url.replace(this.fileUrl2, '');
					}
				}
			});

			this.form.foods = [];
			this.$refs.foods.lists.filter(val => {
				if (val.progress == 100) {
					if (val.response) {
						this.form.foods.push(val.response.data.src);
					} else if (val.url) {
						this.form.foods.push(val.url.replace(this.fileUrl2, ''));
					}
				}
			});
			
			this.form.food_types = this.formData.food_types.join('|')

			// let workTimeChcek = true;
			// this.form.workTime.map(item => {
			// 	if (!item.start_time || !item.end_time) {
			// 		workTimeChcek = false;
			// 	}
			// });

			// if (workTimeChcek === false) {
			// 	return uni.showToast({
			// 		icon: 'none',
			// 		title: '请输入正确的工作时间'
			// 	});
			// }

			console.log('规则', this.formRule);
			console.log('表单', this.form);
			let check = dataValidation.validation(this.formRule, this.form);
			if (check.flag === false) {
				return uni.showToast({
					icon: 'none',
					title: check.msg
				});
			}

			this.form.foods = JSON.stringify(this.form.foods);
			this.$api.cooks.post.request(this.form).then(data => {
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
	background-color: #f9f9f9;

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
			height: 80rpx;
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
