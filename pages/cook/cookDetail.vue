\
<template>
	<view style="display: flex;flex-direction: column;">
		<!-- <view style="position: absolute;left: 0;top: 0;z-index: 0;"><image src="../../static/image/home-4.png" style="width: 750rpx;height: 465rpx"></image></view> -->
		<view class="banner" id="banner" style="position: absolute;left: 0;top: 0;z-index: 0;">
			<swiper :autoplay="true" :circular="true" indicatorActiveColor="#ffffff" indicatorColor="#98999a" :indicatorDots="false">
				<swiper-item v-for="(item, index) in cookInfo.foodsList" :key="index">
					<view class="swiper-item"><image :src="item"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="container" style="position: relative;z-index: 0;margin-top: 150rpx;">
			<view class="brief">
				<view class="brief_cook" id="briefHeight" style="display: flex;">
					<view class="brief_cook_img"><image class="brief_cook_img1" :src="cookInfo.photo"></image></view>
					<view>
						<view class="brief_cook_name" style="display: flex;align-items: center; justify-content: space-between;">
							<view class="brief_cook_name_name text-line1">{{ cookInfo.name }}</view>
							<view style="border:1px solid #e72528;padding: 5rpx 10rpx;border-radius: 10rpx;background-color: #e72528;color: #fff;flex-shrink: 0;" @click="toPageCustomization">预约厨师</view>
						</view>
						<view class="brief_cook_text" style="margin-top: 0rpx;">
							<view class="forget" style="margin-left: 0rpx;">{{ cookInfo.food_types ? cookInfo.food_types : '' }}</view>
						</view>
					</view>
				</view>
				<view style="padding-left: 20rpx; padding-bottom: 35rpx;margin-top: 20rpx;">
					<scroll-view :scrollX="true">
						<view class="nav_img" v-for="(item, index) in cookInfo.foodsList" :key="index"><image :src="item"></image></view>
					</scroll-view>
				</view>
				<!-- <view class="reminds">可服务时间:</view> -->
			</view>

			<view style="margin-top: 30rpx;">
				<view>
					<view class="authentication">
						<view class="title">
							<view class="title_left">厨师认证</view>
							<view class="title_right">* 以下信息由本平台严格审核认证，真实有效</view>
						</view>
						<view class="honor">
							<view>
								<image src="../../static/images/icon_baozhengjinguanli.png"></image>
								身份证
							</view>
							<view>
								<image src="../../static/images/icon_baozhengjinguanli.png"></image>
								有效期健康证
							</view>
						</view>
					</view>
					<view class="cuisine">
						<view class="title" style="padding-bottom: 25rpx"><view class="title_left">擅长菜系</view></view>
						<view class="cuisine_all">{{ cookInfo.food_types }}</view>
					</view>
					<view class="experience">
						<view class="title" style="padding-bottom: 25rpx"><view class="title_left">工作履历</view></view>
						<view class="experience_all">{{ cookInfo.description }}</view>
					</view>
					<view class="address">
						<view class="title" style="padding-bottom: 25rpx"><view class="title_left">常住地址</view></view>
						<view class="often">{{ cookInfo.origin_address ? cookInfo.origin_address + '-' : '' }} {{ cookInfo.address }}</view>
					</view>
				</view>
			</view>
			<view class="disclaimer" style="padding-top: 30rpx;">
				<view class="disclaimer_title">
					<view class="icon_title">*</view>
					<view class="declaration">免责声明</view>
				</view>
				<view class="clause">1、资料中关于厨师的个人形象、健康证件、工作履历等，均为厨师本人提供，如有疑问，您可与其核实。</view>
				<view class="clause">2、用户未通过平台与厨师进行的交易不属于优厨上门服务交易，平台不承担任何责任。</view>
			</view>
		</view>
		<view style="width: 100%;height: 100rpx;"></view>
	</view>
</template>

<script>
import hostConst from '@/config/hostConst.js';
import userServe from '@/libs/userServe.js';

export default {
	data() {
		return {
			id: 0,
			cookInfo: {}
		};
	},
	onLoad: function(t) {
		console.log(t);
		this.id = t.id;

		this.$api.cooks.id
			.request(
				{},
				{
					url: hostConst.apiHost + `/cooks/${t.id}`
				}
			)
			.then(data => {
				data.foodsList = JSON.parse(data.foods).map(item => {
					return hostConst.fileHost2 + item;
				});

				data.photo = hostConst.fileHost2 + data.photo;
				data.food_types = data.food_types.replace('|', '、');

				this.cookInfo = data;
			});
	},
	methods: {
		toPageCustomization: function() {
			if (userServe.checkUserLogin(true) === false) return false;

			uni.navigateTo({
				url: '/pages/order/chefConfimeOrder'
			});
		}
	}
};
</script>
<style>
	page {
		background: #fff;
	}
	
	.banner {
		height: 340rpx;
		position: relative;
		width: 750rpx;
	}
	
	.swiper-item,
	.swiper-item image,
	swiper {
		height: 340rpx;
		width: 750rpx;
	}
	
	.container {
	}
	
	.brief {
		margin: 0 30rpx 0rpx;
		background: #fff;
		border-radius: 15rpx;
		box-shadow: 0rpx 5rpx 15rpx #e2e2e2;
		width: 690rpx;
		z-index: 999999;
	}
	
	.brief_cook {
		height: 130rpx;
		padding-top: 30rpx;
		width: 690rpx;
	}
	
	.brief_cook_img {
		height: 100rpx;
		margin-left: 20rpx;
		position: relative;
		width: 100rpx;
	}
	
	.brief_cook_img1 {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
	}
	
	.brief_cook_img2 {
		bottom: 0rpx;
		height: 28rpx;
		position: absolute;
		right: 7rpx;
		width: 28rpx;
	}
	
	.brief_cook_name {
		margin: 0rpx 0 0 20rpx;
		height: 50rpx;
		width: 530rpx;
	}
	
	.brief_cook_name_name {
		color: #262626;
		height: 50rpx;
		font-size: 34rpx;
		line-height: 50rpx;
	}
	
	.brief_cook_text {
		align-items: center;
		color: #999;
		display: flex;
		float: left;
		font-size: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 10rpx 0 0 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 530rpx;
	}
	
	.forget {
		margin-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	scroll-view {
		white-space: nowrap;
	}
	
	scroll-view .nav_img {
		display: inline-block;
		margin-right: 20rpx;
		position: relative;
	}
	
	.nav_img > image {
		border-radius: 10rpx;
		height: 175rpx;
		width: 260rpx;
	}
	
	.address,
	.authentication,
	.certificate,
	.comment,
	.cuisine,
	.evaluate,
	.experience {
		margin: 0 30rpx;
		min-height: 198rpx;
		width: 690rpx;
	}
	
	.title {
		align-items: flex-end;
		display: flex;
		padding: 30rpx 0;
	}
	
	.title_left {
		font-size: 35rpx;
		font-weight: 700;
		margin-right: 30rpx;
	}
	
	.authentication .title_right {
		color: rgb(231, 37, 40);
		font-size: 24rpx;
	}
	
	.honor {
		font-size: 30rpx;
		padding: 20rpx 0;
	}
	
	.honor,
	.honor view {
		align-items: center;
		display: flex;
	}
	
	.honor view {
		margin-right: 40rpx;
	}
	
	.certificate_all image,
	.honor image {
		height: 40rpx;
		margin-right: 15rpx;
		width: 40rpx;
	}
	
	.cuisine_all,
	.experience_all,
	.often {
		font-size: 30rpx;
		padding: 20rpx 0;
		white-space: pre-line;
	}
	
	.disclaimer {
		background: #f5f9fc;
		height: 400rpx;
		padding: 0 30rpx;
		width: 690rpx;
	}
	
	.disclaimer_title {
		align-items: center;
		display: flex;
		font-size: 30rpx;
		font-weight: 700;
	}
	
	.icon_title {
		color: #f11617;
		margin-right: 15rpx;
	}
	
	.clause {
		font-size: 26rpx;
		line-height: 46rpx;
		margin: 30rpx 0;
	}
</style>
