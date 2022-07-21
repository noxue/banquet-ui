<template>
	<view style="width: 100%;height: 100%;">
		<view class="auth" style="position: relative;z-index: 1;">
			<!-- <view class="wanl-title">欢迎登录</view> -->
			<view style="width: 100%;display: flex;justify-content: center;margin-top: 200rpx;"><image src="../../static/images/logo.jpg" style="border-radius: 50%;width: 140rpx;height: 140rpx;"></image></view>
			<view class="auth-group radius-bock bg-gray wlian-grey-light" style="margin-top: 170rpx;">
				<text style="margin-right: 10rpx;">+86</text>
				<input
					:value="form.phone"
					@input="onKeyInput"
					data-name="phone"
					placeholder="请输入手机号"
					type="number"
					maxlength="11"
					confirm-type="next"
					placeholder-style="color:#f6f6f6;font-size:30rpx"
					placeholder-class="placeholder"
					style="color: #fff;"
					name="phone"
				/>
			</view>

			<view class="flex flex-direction bg-gray" style="display: flex;padding-top: 0;align-items: center;justify-content: space-between;">
				<view class="auth-group radius-bock  wlian-grey-light" style="margin-right: 20rpx;margin-bottom: 0rpx;">
					<input
						:value="form.code"
						@input="onKeyInput"
						data-name="code"
						placeholder="短信验证码"
						type="number"
						maxlength="11"
						confirm-type="next"
						placeholder-style="color:#f6f6f6;font-size:30rpx"
						style="color: #fff;"
						placeholder-class="placeholder"
						name="code"
					/>
				</view>
				<!--  :disabled="isSendCodeTwo === false" -->
				<button class="cu-btn bg-orange sl radius-bock" :class="{ can: isSendCodeOne === true }" style="background: none;padding: 0px;margin: 0px;width: auto;color: #000;width: 5em;text-align: center;" @click="sendCodeRequest()">{{ countDown }}</button>
			</view>

			<view class="auth-button flex flex-direction" style="width: 100%;padding-top: 0;margin-top: 66rpx;" @click="loginRequest()">
				<button class="cu-btn bg-orange sl radius-bock" :class="{ can: isLogin }" style="width: 100%;color: #000;border-radius: 40rpx;background-color: #F7da49" formType="submit" :disabled="isLogin === false">登录</button>
			</view>

			<view class="auth-clause" style="color:#f6f6f6;">
				获取验证码代表阅读并同意
				<text @tap="toPagesXiye1">用户服务协议</text>
				及
				<text @tap="toPagesXiye2">隐私保密声明</text>
			</view>
		</view>

		<image src="http://image.noxue.com/baijiayan/login_bottom.jpg" mode="aspectFill" style="width: 100%;position: absolute;bottom: 0;left: 0;z-index: 0;"></image>
	</view>
</template>

<script>
import graceChecker from '@/libs/graceChecker.js';
import userServe from '@/libs/userServe.js';
import { loginSuccess } from '@/libs/router.js';

export default {
	data() {
		return {
			isSendCodeOne: false, // 第一个发送验证码按钮
			isSendCodeTwo: false, // 第二个发送验证码按钮
			isLogin: false, // 登录按钮
			showSendCode: false, // 显示第二个面板
			form: {
				phone: '', // 手机号
				code: '' // 短信验证码
			},
			countDown: '获取验证码' // 倒计时
		};
	},
	onLoad(options) {
		if (options.phone) {
			this.phone = options.phone;
			this.isSendCodeOne = true;
		}
	},
	onUnload() {
		clearInterval(this.timer);
		this.timer = null;
	},
	methods: {
		onKeyInput: function(e) {
			this.form[e.currentTarget.dataset.name] = e.detail.value;

			if (this.form.phone) {
				this.isSendCodeOne = true;
			} else {
				this.isSendCodeOne = false;
			}

			if (this.form.phone && this.form.code) {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}
		},
		sendCodeRequest() {
			let checkRes = graceChecker.check(this.form, [{ name: 'phone', checkType: 'phoneno', errorMsg: '请输入正确的手机号' }]);

			if (checkRes === false) {
				return uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}

			this.$api.login.phone.code
				.request({
					phone: this.form.phone
				})
				.then(() => {
					this.showSendCode = true;
					this.isSendCodeTwo = false;
					this.codeCountDown();
				});
		},
		// 倒计时
		codeCountDown() {
			this.countDown = 60;
			this.timer = setInterval(() => {
				console.log(this.countDown);
				this.countDown--; // 每执行一次让倒计时秒数减一
				if (this.countDown <= 0) {
					clearInterval(this.timer);
					this.timer = null;

					this.isSendCodeTwo = true;
					this.countDown = '重新获取';
				}
			}, 1000);
		},
		// 验证码登录
		loginRequest() {
			console.log(this.form);
			// , { name: 'code', checkType: 'int', errorMsg: '请输入正确的验证码' }
			let checkRes = graceChecker.check(this.form, [{ name: 'phone', checkType: 'phoneno', errorMsg: '请输入正确的手机号' }]);
			if (checkRes === false) {
				return uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}

			this.$api.login.phone.index.request(this.form).then(data => {
				console.log('进来了...........');
				userServe.createUser({
					token: data
				});

				loginSuccess();
			});
		},
		toPagesXiye1() {
			uni.navigateTo({
				url: '/pages/login/xieyi2'
			});
		},
		toPagesXiye2() {
			uni.navigateTo({
				url: '/pages/login/xieyi1'
			});
		}
	}
};
</script>

<style>
@import url('login.css');

page {
	height: 100%;
	background-color: #f2c24e;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bg-gray {
	/* background-color: #f0f0f0; */
	color: #333333;
	border-bottom: 4rpx solid #ffffff;
}

.radius-bock {
	/* border-radius: 9px; */
	overflow: hidden;
}

.cu-btn {
	position: relative;
	border: 0px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 15px;
	font-size: 14px;
	height: 32px;
	line-height: 1;
	text-align: center;
	text-decoration: none;
	overflow: visible;
	margin-left: initial;
	-webkit-transform: translate(0px, 0px);
	transform: translate(0px, 0px);
	margin-right: initial;
}

.cu-btn {
	position: relative;
	border: 0px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 15px;
	font-size: 14px;
	height: 32px;
	line-height: 1;
	text-align: center;
	text-decoration: none;
	overflow: visible;
	margin-left: initial;
	-webkit-transform: translate(0px, 0px);
	transform: translate(0px, 0px);
	margin-right: initial;
}

.cu-btn::after {
	display: none;
}

.can {
	background-color: #e72528;
	color: #fff;
}

uni-button,
uni-button {
	color: rgba(0, 0, 0, 0.3);
	background-color: #f7f7f7;
}
</style>
