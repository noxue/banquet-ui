<template>
  <view class="container">
    <view class="address-list">
      <view class="a-address" v-for="(item, index) in addressList" :key="index">
        <view @tap="selectTap" :class="'left-text ' + (item.is_default == '1' ? 'active' : '')" :data-id="item.id">
          <view class="name-tel">{{ item.name }} {{ item.phone }}</view>
          <view class="address-box">{{ item.area }}{{ item.community }}{{ item.door_number }}</view>
        </view>

        <view @tap="editAddess" class="right-edit" :data-id="item.id"></view>
        <view @tap="deleteAddess" class="right-delete" :data-id="item.id">
          <image class="deleteImg" src="/static/images/delete@2x.png"></image>
        </view>
      </view>
    </view>
    <!-- <view class="bottom-box"><view @tap="addAddess" class="add-btn">新增地址</view></view> -->
  </view>
</template>

<script>
  var app = getApp();
  export default {
    data() {
      return {
        addressList: [],
        userName: null,
        phone: null,
        pages: '2'
      };
    },
    onLoad: function(a) {
      if (a.pages) {
        this.setData({
          pages: a.pages
        });
      }
    },
    onShow: function() {
      // this.getUserInfo();
    },
    methods: {
      // 获取用户信息
      getUserInfo: function() {
        this.$api.user.info.request().then(data => {
          this.addressList = data.addresses;
          this.userName = data.name;
          this.phone = data.phone;
        });
      },

      // 选择地址
      selectTap: function(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;

        this.$api.user.addressDefault.request({
          id: s
        }).then(data => {
          // TODO 要修改
          app.globalData.showToast('设置成功', 'success');

          that.getUserInfo();

          // TODO 要修改
          if (4 == that.pages) {
            uni.navigateBack({});
          }
        });
      },

      addAddess: function() {
        uni.navigateTo({
          url: '/pages/address/edit?userName=' + this.userName + '&phone=' + this.phone
        });
      },

      editAddess: function(a) {
        uni.navigateTo({
          url: '/pages/address/edit?id=' + a.currentTarget.dataset.id
        });
      },

      deleteAddess: function(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;

        uni.showModal({
          title: '确定要删除地址吗？',
          content: '',
          success: function(e) {
            if (e.confirm) {
              that.$api.user.addressDelete.request({
                id: id
              }).then(data => {
                app.globalData.showToast('删除成功', 'success');
                that.getUserInfo();
              });
            }
          }
        });
      }
    }
  };
</script>
<style>
  .container {
    background-color: #f2f2f2;
  }

  .address-list {
    width: 100%;
    background-color: #fff;
    margin-top: 10rpx;
    padding-bottom: 100rpx;
  }

  .address-list .a-address {
    width: 720rpx;
    margin-left: 30rpx;
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;
  }

  .a-address .left-text {
    flex: 1;
    box-sizing: border-box;
    padding-left: 58rpx;
  }

  .a-address .left-text.active {
    background: url('https://cdn.it120.cc/images/weappshop/addr-active.png') no-repeat 0;
    background-size: 28rpx auto;
  }

  .a-address .left-text .name-tel {
    margin-bottom: 20rpx;
    font-size: 32rpx;
    color: #444;
  }

  .a-address .left-text .address-box {
    font-size: 24rpx;
    color: #888;
    line-height: 36rpx;
  }

  .a-address .right-edit {
    width: 109rpx;
    height: 100%;
    padding: 50rpx 0 50rpx 58rpx;
    box-sizing: border-box;
    background: url('https://cdn.it120.cc/images/weappshop/addr-edit.png') no-repeat 43rpx;
    background-size: 35rpx auto;
  }

  .a-address .right-delete {
    width: 100rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
  }

  .deleteImg {
    width: 40rpx;
    height: 40rpx;
  }

  .bottom-box {
    position: fixed;
    width: 100%;
    bottom: 0;
    font-size: 28rpx;
    color: #000;
    border-top: 1rpx solid #eee;
    height: 100rpx;
    line-height: 100rpx;
    background: #fff url('https://cdn.it120.cc/images/weappshop/arrow-right.png') no-repeat 705rpx;
    background-size: 15rpx auto;
  }

  .bottom-box .add-btn {
    margin-left: 30rpx;
    padding-left: 70rpx;
    background: url('https://cdn.it120.cc/images/weappshop/add-addr.png') no-repeat 0;
    background-size: 40rpx auto;
  }
</style>
