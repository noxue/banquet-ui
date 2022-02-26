<template>
	<view class="auth">
		<view class="wanl-title">欢迎登录</view>
		<view class="auth-group radius-bock bg-gray wlian-grey-light">
			<input :value="form.mobile" @input="onKeyInput" data-name="mobile" placeholder="请输入手机号" type="number" maxlength="11" confirm-type="next" placeholder-class="placeholder" name="mobile" />
		</view>

		<view v-if="isSendCode === false" class="auth-button flex flex-direction" style="width: 100%;" @click="sendCodeRequest()">
			<button class="cu-btn bg-orange sl radius-bock" style="width: 100%;" formType="submit" :disabled="submitDisabled">获取验证码</button>
		</view>

		<block v-else>
			<view class="auth-button flex flex-direction" style="display: flex;padding-top: 0;">
				<view class="auth-group radius-bock bg-gray wlian-grey-light" style="margin-right: 20rpx;margin-bottom: 0rpx;">
					<input :value="form.code" @input="onKeyInput" data-name="code" placeholder="短信验证码" type="number" maxlength="11" confirm-type="next" placeholder-class="placeholder" name="code" />
				</view>
				<button class="cu-btn bg-orange sl radius-bock" style="width: 250rpx;">{{ countDown }}</button>
			</view>

			<view class="auth-button flex flex-direction" style="width: 100%;padding-top: 0;" @click="loginRequest()"><button class="cu-btn bg-orange sl radius-bock" style="width: 100%;" formType="submit" :disabled="submitDisabled">登录</button></view>
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

export default {
	data() {
		return {
			submitDisabled: true,
			form: {
				mobile: '', // 手机号
				code: '' // 短信验证码
			},
			title: '表单验证',
			pageroute: '',
			isSendCode: false, // 是否发送验证码
			countDown: '获取验证码' // 倒计时
		};
	},
	onLoad(options) {
		this.pageroute = options.url;
		if (options.mobile) {
			this.mobile = options.mobile;
			this.submitDisabled = false;
		}
	},
	methods: {
		onKeyInput: function(e) {
			this.form[e.currentTarget.dataset.name] = e.detail.value;
			this.submitDisabled = false;
		},
		sendCodeRequest() {
			let checkRes = graceChecker.check(this.form, [{ name: 'mobile', checkType: 'phoneno', errorMsg: '请输入正确的手机号' }]);

			if (checkRes === false) {
				return uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}

			this.$api.login.sendCode
				.request({
					phone: this.codePhone
				})
				.then(() => {
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					});

					this.isSendCode = true;
					this.verification = false;
					this.codeCountDown();
				});
		},
		// 倒计时
		codeCountDown() {
			this.countDown = 60;
			const time = setInterval(() => {
				console.log(this.countDown);
				this.countDown--; // 每执行一次让倒计时秒数减一
				if (this.countDown <= 0) {
					clearInterval(time);

					this.isSendCode = true;
					this.verification = true;
					this.countDown = '重新获取';
				}
			}, 1000);
		},
		// 验证码登录
		loginRequest() {
			console.log(this.form);
			let checkRes = graceChecker.check(this.form, [{ name: 'mobile', checkType: 'phoneno', errorMsg: '请输入正确的手机号' }, { name: 'code', checkType: 'int', errorMsg: '请输入正确的验证码' }]);
			if (checkRes === false) {
				return uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}

			this.$api.login
				.login(this.form)
				.then(res => {
					uni.showToast({
						title: '登陆成功'
					});
					this.userLoginSuccess(res.data);
					this.modalName = '';
					uni.switchTab({
						url: '/pages/user/index'
					});
				})
				.catch(err => {
					console.log(err);
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

uni-button,
uni-button {
	color: rgba(0, 0, 0, 0.3);
	background-color: #f7f7f7;
}
</style>
