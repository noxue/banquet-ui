<template>
	<view class="auth">
		<view class="wanl-title">欢迎登录</view>
		<view class="auth-group radius-bock bg-gray wlian-grey-light">
			<input :value="form.phone" @input="onKeyInput" data-name="phone" placeholder="请输入手机号" type="number" maxlength="11" confirm-type="next" placeholder-class="placeholder" name="phone" />
		</view>

		<view v-if="showSendCode === false" class="auth-button flex flex-direction" style="width: 100%;" @click="sendCodeRequest()">
			<button class="cu-btn bg-orange sl radius-bock" :class="{ can: isSendCodeOne === true }" style="width: 100%;" formType="submit" :disabled="isSendCodeOne === false">获取验证码</button>
		</view>

		<block v-else>
			<view class="auth-button flex flex-direction" style="display: flex;padding-top: 0;">
				<view class="auth-group radius-bock bg-gray wlian-grey-light" style="margin-right: 20rpx;margin-bottom: 0rpx;">
					<input :value="form.code" @input="onKeyInput" data-name="code" placeholder="短信验证码" type="number" maxlength="11" confirm-type="next" placeholder-class="placeholder" name="code" />
				</view>
				<button class="cu-btn bg-orange sl radius-bock" :class="{ can: isSendCodeOne === true }" style="width: 250rpx;" @click="sendCodeRequest()" :disabled="isSendCodeTwo === false">{{ countDown }}</button>
			</view>

			<view class="auth-button flex flex-direction" style="width: 100%;padding-top: 0;" @click="loginRequest()">
				<button class="cu-btn bg-orange sl radius-bock" :class="{ can: isLogin }" style="width: 100%;" formType="submit" :disabled="isLogin === false">登录</button>
			</view>
		</block>

		<view class="auth-clause">
			获取验证码代表阅读并同意
			<text @tap="onDetails($store.state.common.appConfig.user_agreement, '用户协议')">用户协议</text>
			及
			<text @tap="onDetails($store.state.common.appConfig.privacy_protection, '隐私保护')">隐私权保护声明</text>
		</view>
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
		}
	}
};
</script>

<style>
@import url('login.css');

.bg-gray {
	background-color: #f0f0f0;
	color: #333333;
}

.radius-bock {
	border-radius: 9px;
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
