<template>
    <block>
        <view class="step">
            <view class="zh1 step_t1">
                <text class="biao">1</text>
                <view class="xian"></view>
                <text class="wenzi1">上传个人信息</text>
            </view>
            <view class="zh2 step_t2">
                <text class="biao">2</text>
                <view class="xian"></view>
                <text class="wenzi2">作品展示</text>
            </view>
            <view class="zh3 step_t3">
                <text class="biao">3</text>
                <view class="xian"></view>
                <text class="wenzi3">职业履历</text>
            </view>
            <view class="zh3 step_t3" style="width: 130rpx">
                <text class="biao">4</text>
                <view class="xian"></view>
                <text class="wenzi3">服务信息</text>
            </view>
            <view class="zh4 step_t4">
                <text class="biao4">5</text>
                <view class="xian"></view>
                <text class="wenzi4">完成</text>
            </view>
        </view>
        <view class="tijiao">
            <image src="https://cookwaptest.5156dujia.com/img/cookFour.png"></image>
            <view>提交成功</view>
            <text>1-3个工作日完成审核，以短信告知</text>
        </view>
        <view class="fixBottom">
            <view @tap="home" class="fixBottom_left">返回首页</view>
            <view @tap="apply" class="fixBottom_right">查看我的申请</view>
        </view>
    </block>
</template>

<script>
getApp();
export default {
    data() {
        return {
            cookCode: ''
        };
    },
    onLoad: function (o) {
        uni.hideShareMenu();
        this.setData({
            cookCode: o.cookcode
        });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        home: function (o) {
            uni.switchTab({
                url: '../index/index'
            });
        },

        apply: function (o) {
            uni.navigateTo({
                url: '../chefInformation/chefInformation?cookcode=' + this.cookCode
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

.step {
    background: #fff;
    display: flex;
    flex-flow: row;
    height: 100rpx;
    margin: 0 30rpx;
    width: 690rpx;
}

.step .zh1 {
    width: 268rpx;
    width: 200rpx;
}

.step .zh1,
.step .zh2 {
    height: 100rpx;
    position: relative;
}

.step .zh2 {
    width: 218rpx;
    width: 170rpx;
}

.step .zh3 {
    width: 176rpx;
    width: 150rpx;
}

.step .zh3,
.step .zh4 {
    height: 100rpx;
    position: relative;
}

.step .zh4 {
    width: 28rpx;
}

.biao {
    left: 0rpx;
}

.biao,
.biao4 {
    background: #ddc18c;
    border-radius: 26rpx;
    color: #fff;
    font-size: 26rpx;
    height: 26rpx;
    line-height: 26rpx;
    position: absolute;
    text-align: center;
    top: 31rpx;
    width: 26rpx;
    z-index: 9;
}

.biao4 {
    right: 0rpx;
}

.xian {
    background: #ca9f58;
    height: 4rpx;
    left: 0rpx;
    position: absolute;
    top: 42rpx;
    width: 100%;
}

.wenzi1 {
    font-size: 22rpx;
    left: 0rpx;
    width: 180rpx;
}

.wenzi1,
.wenzi2 {
    color: #ca9f58;
    height: auto !important;
    position: absolute;
    top: 66rpx;
}

.wenzi2 {
    font-size: 30rpx;
    font-size: 22rpx;
    left: -46rpx;
    left: -32rpx;
    width: 190rpx;
}

.wenzi3 {
    left: -46rpx;
    left: -32rpx;
    width: 122rpx;
}

.wenzi3,
.wenzi4 {
    color: #999;
    color: #ca9f58;
    font-size: 30rpx;
    font-size: 22rpx;
    height: auto !important;
    position: absolute;
    top: 66rpx;
}

.wenzi4 {
    right: 0rpx;
    right: -8rpx;
    text-align: right;
    width: 60rpx;
}

.step_t1,
.step_t2 {
    color: #ca9f58 !important;
}

.hui {
    background: #d2d2d2 !important;
}

.tijiao {
    height: auto;
    margin-top: 180rpx;
    overflow: hidden;
    text-align: center;
    width: 750rpx;
}

.tijiao image {
    height: 155rpx;
    margin: 0 auto;
    width: 146rpx;
}

.tijiao view {
    color: #000;
    font-size: 36rpx;
    height: auto;
    margin-top: 30rpx;
    width: 750rpx;
}

.tijiao text {
    color: #999;
    display: block;
    font-size: 30rpx;
    height: auto;
    line-height: 50rpx;
    margin: 20rpx 30rpx 0;
    width: 690rpx;
}

.fixBottom {
    height: 76rpx;
    margin: 90rpx auto 0;
    padding: 0 20rpx;
    width: 520rpx;
}

.fixBottom_left {
    border: 1px solid #ca9f58;
    border-radius: 14rpx;
    color: #ca9f58;
    float: left;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    width: 226rpx;
}

.fixBottom_right {
    background: #ca9f58;
    border-radius: 14rpx;
    color: #fff;
    float: right;
    font-size: 32rpx;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    width: 230rpx;
}
</style>
