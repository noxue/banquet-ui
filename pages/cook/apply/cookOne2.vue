<template>
	<view>
		<!-- 审核状态-->
		<view v-if="status == 'audit_fail' || status == 'fail'" class="err">审核失败：{{ err == 'null' ? '详询客服' : err == null ? '详询客服' : err == '' ? '详询客服' : err }}</view>

		<!-- 提交信息 -->
		<view class="container">
			<view class="essential">
				<view class="title">
					<text class="mihao">✲</text>
					基本信息
				</view>
				<view class="essential_input">
					<view>姓名</view>
					<input :value="form.name" @input="inputChange" data-filed="name" placeholder="请填写真实姓名(仅对已下单客户展示)" placeholderClass="phClass" type="text" />
				</view>
				<view class="essential_input">
					<view>昵称</view>
					<input :value="form.flower" @input="inputChange" data-filed="flower" placeholder="非必填(六个字内)" placeholderClass="phClass" type="text" />
				</view>
				<view class="essential_picker">
					<picker :value="form.sex" :range="sexList" :rangeKey="'label'" @change="inputChange" data-filed="sex">
						<view>性别</view>
						<text>{{ formText.sex }}</text>
						<image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
					</picker>
				</view>
				<view class="essential_picker">
					<picker :value="form.marriage" :range="marriageList" :rangeKey="'label'" @change="inputChange" data-filed="marriage">
						<view>婚姻状况</view>
						<text>{{ formText.marriage }}</text>
						<image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
					</picker>
				</view>
				<view class="essential_input">
					<view>手机号</view>
					<input :value="form.userTel" @input="inputChange" data-filed="userTel" maxlength="11" placeholder="请填写" placeholderClass="phClass" type="number" />
				</view>
				<region-picker :value="form.region" :customItem="customItem" @change="inputChange" data-filed="region">
					<view class="essential_hujidi">
						<view>户籍地</view>
						<text>{{ region }}</text>
						<image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
					</view>
				</region-picker>
				<view @tap="addressFun" class="essential_hujidi essnone">
					<view>常住地址</view>
					<text v-if="state == 'fail'">{{ detailed == null || detailed == 'null' || detailed == '' ? '' : detailed }}</text>
					<text v-if="state != 'fail'">{{ address.street }}{{ address.place }}{{ address.addressDetail }}</text>
					<image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
				</view>
			</view>

			<view class="blue"></view>

			<view class="content-item">
				<view class="title">
					<text class="mihao">✲</text>
					实名认证
					<text>(仅用作资料审核，不在页面显示)</text>
				</view>
				<view @tap="picImg" class="real_con" data-isid="zm">
					<image :src="identityZm.length == 0 ? 'https://cookwaptest.5156dujia.com/img/shenfenzheng02.jpg' : identityZm[0]"></image>
					<text>身份证人像面</text>
				</view>
				<view @tap="picImg" class="real_con" data-isid="bm">
					<image :src="identityBm.length == 0 ? 'https://cookwaptest.5156dujia.com/img/sfz.png' : identityBm[0]"></image>
					<text>身份证国徽面</text>
				</view>
			</view>

			<view class="blue"></view>

			<view class="content-item">
				<view class="title">
					居住证
					<text>(非必填/仅用作资料审核，不在页面显示)</text>
				</view>
				<view @tap="identity" class="permit_con" data-isid="permit">
					<image :src="permitList.length == 0 ? 'https://cookwaptest.5156dujia.com/img/shiming_t3.png' : permitList[0]"></image>
					<text>上传居住证或暂住证</text>
				</view>
			</view>

			<view class="blue"></view>

			<view class="content-item">
				<view class="title">
					<text class="mihao">✲</text>
					形象照(请上传1张形象照)
				</view>
				<view @tap="identity" class="photo_con" data-isid="xingx" style="display: flex; flex-flow: column">
					<image :src="xingxList.length == 0 ? 'https://cookwaptest.5156dujia.com/img/xingxiangzhao.jpg' : xingxList[0]"></image>
					<text>需穿戴厨师服、厨师帽</text>
				</view>
			</view>

			<view class="content-item">
				<view class="title">
					<text class="mihao">✲</text>
					请上传本人所作菜品的图片（{{ cookList.length }}）张
				</view>
				<view @tap="cookImg" class="photo_con">
					<image src="https://cookwaptest.5156dujia.com/img/shiming_t4.png" style="width: 150rpx;height: 150rpx;"></image>
					<view class="text_icon" style="margin-top: 0">
						至少5张，最多10张；高质量图片有助于增加成交量；
					</view>
				</view>
				
				<view class="photo_img" v-if="cookList.length <= 0 ? false : true">
					<view class="voucher_con_img" v-for="(item, index) in cookList" :key="index">
						<image @tap="deleteList" class="guan" :data-index="index" src="https://cookwaptest.5156dujia.com/img/guanbi.png"></image>
						<image class="zhu" :src="item"></image>
					</view>
				</view>
			</view>
		</view>

		<view :style="'width:750rpx;height:150rpx; padding-bottom:' + paddingBottom + 'px;'"></view>

		<view class="mackFix" :style="'padding-bottom:' + paddingBottom + 'px;'">
			<view class="mackFix_right">
				<view @tap="cancel" class="mackFix_right2">取消</view>
				<view @tap="nextTap" class="mackFix_right3">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();

var i = require('../../../utils/city.js');
var a = require('../../../utils/thorttle.js');

export default {
	data() {
		return {
			status: '',
			err: '',
			sexList: [
				{
					label: '男',
					value: 1
				},
				{
					label: '女',
					value: 2
				}
			],
			marriageList: [
				{
					label: '未婚',
					value: 0
				},
				{
					label: '已婚',
					value: 1
				}
			],
			userTel: '',
			region: [],
			regionIndex: [],
			regionSel: [],
			city: [
				{
					code: '0100',
					name: '北京市'
				}
			],
			cityIndex: [0, 0, 0],
			address: [],
			token: '',
			identityZm: [],
			urlidentityZm: [],
			identityBm: [],
			urlidentityBm: [],
			permitList: [],
			urlpermitList: [],
			xingxList: [],
			urlxingxList: [],
			state: '',
			cookCode: '',
			dizhi: '',
			addressId: '',
			detailed: '',
			paddingBottom: 0,
			customItem: '',
			cookList: [
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
				'https://cookwaptest.5156dujia.com/img/guanbi.png',
			],
			formText: {
				// form表单某些的文字版
				sex: '',
				marriage: ''
			},
			form: {
				name: '',
				flower: '',
				sex: 1,
				marriage: '',
				userTel: '',
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
				urlxingxList: ''
			}
		};
	},
	onLoad: function(e) {
		if (1 == 2) {
			// TODO判断用户状态
			this.applyInfoRequest();
		}
	},
	onShow: function() {},
	methods: {
		// 获取当前申请状态
		applyInfoRequest: function(t) {
			var that = this;
			this.$api.chefInfo.applyInfo.request().then(t => {
				console.log('查询申请厨师详情信息', t);
				var e = t.data.data.chefManageVo;
				var a = [];
				a.push(e.provinceCode);
				a.push(e.cityCode);
				a.push(e.districtCode);
				var s = [];
				s.push(e.frontImg);
				var n = [];
				n.push(e.reverseImg);
				var d = [];

				if ('undefined' == e.residencePermit || '' == e.residencePermit || null == e.residencePermit) {
					that.setData({
						permitList: d
					});
				} else {
					d.push(e.residencePermit);
				}

				var o = [];
				o.push(e.mainPic);
				that.setData({
					name: e.name,
					flower: e.flowerName,
					gender: 1 == e.sex ? '男' : '女',
					genderIndex: e.sex,
					marriage: 1 == e.maritalStatus ? '已婚' : '未婚',
					marriageIndex: e.maritalStatus,
					userTel: e.telephone,
					region: e.domicile,
					dizhi: e.address,
					detailed: '' == e.address || 'null' == e.address || null == e.address ? '' : e.address,
					'address.id': e.addressId,
					addressId: e.addressId,
					regionSel: a,
					identityZm: s,
					urlidentityZm: s,
					identityBm: n,
					urlidentityBm: n,
					permitList: d,
					urlpermitList: d,
					xingxList: o,
					urlxingxList: o
				});

				uni.hideLoading();
			});
		},

		inputChange: function(e) {
			console.log(e);
			if (e.currentTarget.dataset.filed === 'sex') {
				this.form[e.currentTarget.dataset.filed] = this.sexList[e.detail.value].value;
				this.formText[e.currentTarget.dataset.filed] = this.sexList[e.detail.value].label;
			} else if (e.currentTarget.dataset.filed === 'marriage') {
				this.form[e.currentTarget.dataset.filed] = this.marriageList[e.detail.value].value;
				this.formText[e.currentTarget.dataset.filed] = this.marriageList[e.detail.value].label;
			} else {
				this.form[e.currentTarget.dataset.filed] = e.detail.value;
			}
			console.log(this.form);
		},

		inputName: function(t) {
			this.name = t.detail.value;
		},

		inputFlower: function(t) {
			this.flower = t.detail.value;
		},

		bindRegionChange: function(t) {
			this.region = t.detail.value;
			this.cityList(t.detail.value);
		},

		cityList: function(t) {
			for (var e = this.city, i = t, a = [], s = 0; s < e.city.length; s++) {
				if (-1 !== i[0].indexOf(e.city[s].name)) {
					a.push(e.city[s].code);

					for (var n = 0; n < e.city[s].cityList.length; n++) {
						if (-1 !== i[1].indexOf(e.city[s].cityList[n].name)) {
							a.push(e.city[s].cityList[n].code);

							for (var d = 0; d < e.city[s].cityList[n].districtList.length; d++) {
								if (-1 !== i[2].indexOf(e.city[s].cityList[n].districtList[d].name)) {
									a.push(e.city[s].cityList[n].districtList[d].code);
								}
							}
						}
					}
				}
			}

			this.regionSel = a;
		},

		// 上传图片
		picImg: function(t, e, i) {
			var that = this;
			uni.chooseImage({
				count: i,
				sizeType: ['original', 'compressed'],
				sourceType: [t],
				success: function(t) {}
			});
		},

		nextTap: a.throttle(function(t) {
			this.next();
		}, 1000),

		addressFun: function(t) {
			uni.navigateTo({
				url: '../address/address?state=often_live&status=1'
			});
		},

		// 取消
		cancel: function(t) {
			uni.switchTab({
				url: '../my/my'
			});
		},

		next: function(t) {
			// TODO 检查
			uni.setStorageSync('stepOne', this.form);
			uni.navigateTo({
				url: '/pages/cook/apply/cookTwo'
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

.wenzi2 {
	color: #999;
}

.err {
	color: red;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin: 0 auto;
	overflow: hidden;
	padding-top: 10rpx;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.err {
	width: 690rpx;
}

.container {
	border-radius: 14rpx;
	padding-bottom: 30rpx;
	width: 750rpx;
}

.blue {
	height: 20rpx;
	width: 690rpx;
}

.title {
	color: #000;
	font-size: 36rpx;
	height: auto;
	margin: 40rpx 20rpx 0;
	width: 700rpx;
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

.essential {
}

.essential_input {
	border-bottom: 1px solid #e5e5e5;
	height: 112rpx;
	margin: 0 20rpx;
	width: 700rpx;
}

.essential_input view {
	color: #262626;
	float: left;
	font-size: 32rpx;
	height: 112rpx;
	line-height: 112rpx;
	width: 140rpx;
}

.essential_input input {
	color: #262626;
	float: right;
	font-size: 30rpx;
	height: 112rpx;
	text-align: right;
	width: 510rpx;
}

.essential_input .phClass {
	color: #999;
	font-size: 30rpx;
}

.essential_picker {
	border-bottom: 1px solid #e5e5e5;
	height: 112rpx;
	margin: 0 20rpx;
	width: 700rpx;
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

.essential_picker:last-child {
	border-bottom: none;
}

.essential_hujidi {
	border-bottom: 1px solid #e5e5e5;
	height: 160rpx;
	margin: 0 20rpx;
	position: relative;
	width: 700rpx;
}

.essential_hujidi view {
	color: #262626;
	float: left;
	font-size: 32rpx;
	height: 160rpx;
	line-height: 160rpx;
	width: 140rpx;
}

.essential_hujidi text {
	align-items: center;
	color: #262626;
	display: flex;
	float: right;
	font-size: 30rpx;
	height: 160rpx;
	margin-right: 16rpx;
	max-width: 490rpx;
	text-align: right;
}

.essential_hujidi image {
	height: 26rpx;
	position: absolute;
	right: 0rpx;
	top: 70rpx;
	width: 10rpx;
}

.essnone {
	border-bottom: none !important;
}

.real {
	box-shadow: 0px 0px 10px #e2e2e2;
	padding-bottom: 50rpx;
	width: 690rpx;
}

.real,
.real_con {
	height: auto;
	overflow: hidden;
}

.real_con {
	float: left;
	margin: 30rpx 0 0 20rpx;
	width: 308rpx;
}

.real_con:last-child {
	float: right;
	margin-right: 20rpx;
}

.real_con image {
	float: left;
	height: 194rpx;
	width: 308rpx;
}

.real_con text {
	color: #999;
	float: left;
	font-size: 28rpx;
	margin-top: 20rpx;
	text-align: center;
	width: 308rpx;
}

.permit {
	box-shadow: 0px 0px 10px #e2e2e2;
	padding-bottom: 50rpx;
	width: 690rpx;
}

.permit,
.permit_con {
	height: auto;
	overflow: hidden;
}

.permit_con {
	margin: 30rpx 0 0 20rpx;
	width: 308rpx;
}

.permit_con image {
	float: left;
	height: 194rpx;
	width: 308rpx;
}

.permit_con text {
	color: #999;
	float: left;
	font-size: 28rpx;
	margin-top: 20rpx;
	text-align: center;
	width: 308rpx;
}

.photo {
	padding-bottom: 30rpx;
	width: 690rpx;
	box-shadow: 0px 0px 10px #e2e2e2;
}

.photo_con {
	margin: 30rpx 20rpx 0;
	overflow: hidden;
	width: 700rpx;
}

.photo_con image {
	float: left;
	height: 270rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	width: 208rpx;
}

.photo_con view {
	color: #333;
	font-size: 30rpx;
}

.photo_con text,
.photo_con view {
	float: left;
	height: auto;
	margin-top: 10rpx;
	width: 508rpx;
}

.photo_con text {
	color: #b2b2b2;
	font-size: 26rpx;
}

.photo_img {
	height: auto;
	margin: 50rpx 20rpx 0;
	width: 700rpx;
}

.voucher_con_img {
	float: left;
	margin-bottom: 40rpx;
	margin-right: 80rpx;
	position: relative;
}

.voucher_con_img,
.zhu {
	height: 356rpx;
	width: 270rpx;
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
