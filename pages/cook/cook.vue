<template>
	<view style="position: relative;">
		<!-- 		<view class="nav" :style="'height:' + (navHeight + navBarHeight) + 'px;'">
			<view class="nav_holder" :style="'height:' + navHeight + 'px;'"></view>
			<view class="nav_title" :style="'height:' + navBarHeight + 'px;'"><text class="nav_title_center" :style="'height:' + navBarHeight + 'px;'">51厨师</text></view>
		</view> -->
		<view class="search" :style="'margin-top:' + (navHeight + navBarHeight) + 'px;'">
			<view>
				<input @confirm="confirmTap" @input="bindSearch" confirmType="search" placeholder="搜索厨师、菜系、履历等" placeholderStyle="fong-size:28rpx;" type="text" :value="searchValue" />
				<image class="sousuo" src="https://cookwaptest.5156dujia.com/img/sousuo.png"></image>
				<image @tap="close" class="close" src="https://cookwaptest.5156dujia.com/img/close.png"></image>
			</view>
		</view>

		<view class="banner">
			<swiper :autoplay="true" @change="swiperChange" :circular="true" class="banner_con">
				<block v-for="(item, index) in bannerList" :key="index">
					<swiper-item class="swiperItem" v-if="item.isTableBar == 'Y'">
						<navigator openType="switchTab" :url="'../' + item.clickUrl"><image class="slide-image" :src="item.picUrl + '?imageMogr2/auto-orient/thumbnail/!690x170r/gravity/Center/crop/690x170/blur/1x0/quality/75|imageslim'"></image></navigator>
					</swiper-item>
					<swiper-item class="swiperItem" v-if="item.isTableBar == 'N'">
						<navigator :url="'../' + item.clickUrl"><image class="slide-image" :src="item.picUrl + '?imageMogr2/auto-orient/thumbnail/!690x170r/gravity/Center/crop/690x170/blur/1x0/quality/75|imageslim'"></image></navigator>
					</swiper-item>
				</block>
			</swiper>
			<view class="dots" :style="'width:' + bannerLength * 22 + 'rpx; left: ' + (750 - bannerLength * 22) / 2 + 'rpx;'"><view :class="'dot ' + (index == bannerIndex ? ' active' : '')" v-for="(item, index) in bannerLength" :key="index"></view></view>
		</view>

		<view class="'option optionStatic" id="index-nav" :style="{ top: top }">
			<!-- :style="'top:' + (scrollHei ? navHeight + navBarHeight : 0) + 'px;'" -->
			<view @tap="paixu" class="optionCon1">
				<text :class="isSort == true ? 'option_hover' : ''">{{ sortText }}</text>
				<view :class="isSort == true ? 'option_hover_jiao' : ''"></view>
			</view>
			<view @tap="fwservice" class="optionCon">
				<text :class="isService == true ? 'option_hover' : ''">服务</text>
				<view :class="isService == true ? 'option_hover_jiao' : ''"></view>
			</view>
			<view @tap="clQuali" class="optionCon">
				<text :class="isQuali == true ? 'option_hover' : ''">资历</text>
				<view :class="isQuali == true ? 'option_hover_jiao' : ''"></view>
			</view>
			<view @tap="isDistanceFun" class="optionCon">
				<text :class="isDistance == true ? 'option_hover' : ''">距离</text>
				<view :class="isDistance == true ? 'option_hover_jiao' : ''"></view>
			</view>
		</view>

		<!-- 		<view class="selectList" :style="'margin-top:' + (scrollHei ? 60 : 0) + 'px'" v-if="choice.lenth == 0 ? false : true">
			<view @tap="delChoe" :data-index="index" :data-name="item.name" v-for="(item, index) in choice" :key="index">
				<text>{{ item.code }}</text>
				<image src="https://cookwaptest.5156dujia.com/img/cook_x.png"></image>
			</view>
		</view> -->

		<view class="hotCook">
			<view v-if="chefList.length > 0">
				<view @tap="cookDetails" class="hotCookCon" :data-code="item.code" v-for="(item, index) in chefList" :key="index">
					<view class="hotCookCon_left">
						<image :src="item.mainPic + '?imageMogr2/auto-orient/thumbnail/!250x330r/gravity/Center/crop/250x330/blur/1x0/quality/75|imageslim'"></image>
						<text v-if="item.serviceCount == 0 ? false : true">已服务{{ item.serviceCount }}次</text>
					</view>

					<view class="hotCookCon_right">
						<view class="hotCookCon_right_name">
							<view class="hotCookCon_right_name_name">{{ item.flowerName }}</view>
							<view class="hotCookCon_right_name_tw" v-if="item.authentication == 'Y' ? true : false">
								<image src="https://cookwaptest.5156dujia.com/img/shiming.png"></image>
								<text>已实名</text>
							</view>
						</view>
						<view class="hotCookCon_right_fen">
							<view class="hotCookCon_right_fen_name">
								{{ item.highPraiseRate }}
								<text>分</text>
							</view>
							<view class="hotCookCon_right_fen_pj" v-if="item.evaluatorNum == null ? false : true">
								<text>{{ item.evaluatorNum }}人已评价</text>
								<image src="https://cookwaptest.5156dujia.com/img/lssj.png"></image>
							</view>
						</view>
						<view class="hotCookCon_right_list">
							<text v-if="index < 3" v-for="(chefDishTypeList, index1) in item.cuisine" :key="index1">{{ chefDishTypeList }}</text>
						</view>
						<view class="hotCookCon_right_title" v-if="item.resume == null || item.resume == 'null' || item.resume == '' ? false : true">履历：{{ item.resume }}</view>
						<view class="hotCookCon_right_jiage">
							<view class="hotCookCon_right_jiage_left">
								<text class="hotCookCon_right_jiage_left1">￥</text>
								{{ item.basicFee }}
								<text class="hotCookCon_right_jiage_left2">起</text>
							</view>
							<view class="hotCookCon_right_jiage_right">{{ item.basicDishesNum }}个菜起</view>
						</view>
					</view>

					<view class="hotCookCon_bottom">
						<image :src="chefPicList.url + '?imageMogr2/auto-orient/thumbnail/!122x122r/gravity/Center/crop/122x122/blur/1x0/quality/75|imageslim'" v-if="index < 5" v-for="(chefPicList, index1) in item.chefPicList" :key="index1"></image>
					</view>

					<view class="hotCookCon_juli">
						<image src="https://cookwaptest.5156dujia.com/img/dw.png"></image>
						<text class="hotCookCon_juli1">{{ item.city }}{{ item.district }}</text>
						<text class="hotCookCon_juli2">距您{{ item.distance }}km</text>
					</view>
				</view>
			</view>
			<view v-else class="'cookZanwu">
				<image src="https://cookwaptest.5156dujia.com/img/cookList_bj.png"></image>
				<text>暂无符合厨师</text>
			</view>
		</view>

		<view class="order-list" @touchmove.stop.prevent="true" :class="'sort ' + (isSort ? 'show' : 'hide')">
			<view @tap="paixu" class="sort_bj"></view>
			<view class="sort_con" :style="'top:' + (navHeight + navBarHeight + option) + 'px;'">
				<view @tap="paixuSort" :class="sortSub == index ? 'act' : ''" :data-code="item.code" :data-index="index" v-for="(item, index) in sort" :key="index">
					<text>{{ item.name }}</text>

					<image src="https://cookwaptest.5156dujia.com/img/list_dui.png" v-if="sortSub == index ? true : false"></image>
				</view>
			</view>
		</view>
		<view @touchmove.stop.prevent="true" :class="'services ' + (isService ? 'show' : 'hide')">
			<view @tap="fwservice" class="services_bj"></view>
			<view class="services_con" :style="'top:' + (navHeight + navBarHeight + option) + 'px;'">
				<view class="services_charge">
					<view class="services_charge_title">基础收费</view>
					<view class="services_jiage">
						<picker @change="bindPickerChange" :range="priceArr" :value="index">
							<view class="services_jiage_left">
								<text>{{ startBasicFee == '' ? '选择最低价' : startBasicFee }}</text>
								<image src="https://cookwaptest.5156dujia.com/img/jiage_sj.png"></image>
							</view>
						</picker>
						<text class="services_charge_xian">——</text>
						<picker @change="bindPickerChangeGao" :range="priceArr" :value="index">
							<view class="services_jiage_right">
								<text>{{ endBasicFee == '' ? '选择最高价' : endBasicFee }}</text>
								<image src="https://cookwaptest.5156dujia.com/img/jiage_sj.png"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="services_people">
					<view class="services_charge_title">服务人数</view>
					<view class="services_people_left"><input @input="minNumFun" placeholder="服务人数最少" type="number" :value="minNum" /></view>
					<text class="services_charge_xian">——</text>
					<view class="services_people_right"><input @input="maxNumFun" placeholder="服务人数最多" type="number" :value="maxNum" /></view>
				</view>
				<view class="services_fixed">
					<view @tap="fwservice" class="services_fixed_xx">取消</view>
					<view @tap="fwReset" class="services_fixed_cz">重置</view>
					<view @tap="fwDetermine" class="services_fixed_qd">确定</view>
				</view>
			</view>
		</view>
		<view @touchmove.stop.prevent="true" :class="'qualifications ' + (isQuali ? 'show' : 'hide')">
			<view @tap="clQuali" class="qualifications_bj"></view>
			<view class="qualifications_con" :style="'top:' + (navHeight + navBarHeight + option) + 'px;'">
				<view class="qualifications_con_title">厨龄</view>
				<view class="jianyeshu_right">
					<image @tap="bindMinus" class="jian" src="https://cookwaptest.5156dujia.com/img/jianhao.png"></image>
					<input @input="bindManual" placeholder="" type="" :value="cookAge" />
					<image @tap="bindPlus" class="jia" src="https://cookwaptest.5156dujia.com/img/jiahao.png"></image>
				</view>
				<view class="services_fixed">
					<view @tap="clQuali" class="services_fixed_xx">取消</view>
					<view @tap="clReset" class="services_fixed_cz">重置</view>
					<view @tap="clDetermine" class="services_fixed_qd">确定</view>
				</view>
			</view>
		</view>
		<view @touchmove.stop.prevent="true" :class="'distance ' + (isDistance ? 'show' : 'hide')">
			<view @tap="isDistanceFun" class="distance_bj"></view>
			<view class="distance_con" :style="'top:' + (navHeight + navBarHeight + option) + 'px;'">
				<view @tap="juliDis" :class="disSub == index ? 'km' : ''" :data-index="index" :data-km="item" v-for="(item, index) in distances" :key="index">
					<text>{{ item }}</text>

					<image src="https://cookwaptest.5156dujia.com/img/list_dui.png" v-if="disSub == index ? true : false"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();

export default {
	data() {
		return {
			top: 0,
			searchValue: '',
			navHeight: 0,
			navBarHeight: 0,
			option: 0,
			bannerList: [],
			bannerIndex: 0,
			bannerLength: 0,
			scrollTop: 0,
			dingtop: 0,
			scrollHei: false,
			priceArr: ['100', '200', '300', '500', '800', '1000', '2000', '3000', '5000', '8000', '10000', '10000以上'],
			address: '',
			latitude: 0,
			longitude: 0,
			chefList: [],
			findDishStyle: [],
			pageNum: 1,
			pageSize: 10,
			isSort: false,
			isService: false,
			isQuali: false,
			isDistance: false,
			sortSub: 0,
			chefSort: '',
			sortText: '综合排序',
			sort: [
				{
					name: '综合排序',
					code: ''
				},
				{
					name: '好评优先',
					code: 'evaluateDesc'
				},
				{
					name: '低价优先',
					code: 'basicFeeAsc'
				},
				{
					name: '高价优先',
					code: 'basicFeeDesc'
				},
				{
					name: '距离最近',
					code: 'distanceAsc'
				}
			],
			distances: ['全部', '5km', '10km', '15km', '20km', '25km', '25km以上'],
			dishStyle: '',
			disIndex: 0,
			disSub: 0,
			cookAge: 0,
			dishStyleIdList: [],
			distance: '',
			startBasicFee: '',
			endBasicFee: '',
			maxNum: '',
			minNum: '',
			choice: [],
			total: 0,
			chefDishTypeList: [],
			chefPicList: {
				url: ''
			}
		};
	},
	onLoad: function(a) {
		// var that = this;
		// var e = uni.getSystemInfoSync();
		// var s = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : null;
		// console.log('ssssss',s)
		// uni.getMenuButtonBoundingClientRect();
		// var d = 2 * (s.top - e.statusBarHeight) + s.height;
		// var h = 0;
		// uni.getSystemInfo({
		// 	success: function(t) {
		// 		h = t.statusBarHeight;
		// 		uni
		// 			.createSelectorQuery()
		// 			.select('#index-nav')
		// 			.boundingClientRect(function(t) {
		// 				that.setData({
		// 					dingtop: t.top,
		// 					option: t.height
		// 				});
		// 			})
		// 			.exec();
		// 	}
		// });
		// that.setData({
		// 	navHeight: h,
		// 	navBarHeight: d,
		// 	address: app.globalData.address,
		// 	latitude: app.globalData.latitude,
		// 	longitude: app.globalData.longitude
		// });

		// #ifdef H5
		this.top = '44px';
		// #endif
		this.chefSlideshow();
		this.findDishStyleFun();

		this.chefInfoList();
	},
	onShow: function() {
		this.setData({
			pageNum: 1,
			pageSize: 10
		});

		// 坐标发生变化
		if (this.latitude != app.globalData.latitude && this.longitude != app.globalData.longitude) {
			this.setData({
				address: app.globalData.address,
				latitude: app.globalData.latitude,
				longitude: app.globalData.longitude
			});

			this.chefInfoList();
		}
	},
	onReady: function() {},
	onPageScroll: function(t) {
		console.log('onPageScroll');
		// 隐藏/显示tab栏
		var that = this;
		this.setData({
			scrollTop: t.scrollTop
		});

		if (0 == that.scrollTop && 0 == that.dingtop) {
			uni
				.createSelectorQuery()
				.select('#index-nav')
				.boundingClientRect(function(t) {
					that.setData({
						dingtop: t.top - that.navHeight - that.navBarHeight,
						option: t.height
					});
				})
				.exec();

			this.scrollHei = false;
		}

		if (that.scrollTop >= that.dingtop) {
			this.scrollHei = true;
		} else {
			this.scrollHei = false;
		}
	},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh: function() {
		this.setData({
			pageNum: 1,
			pageSize: 10
		});
		uni.showNavigationBarLoading();
		this.chefInfoList();
		this.chefSlideshow();
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		if (this.chefList.length >= this.total) {
			return false;
		}

		this.setData({
			pageNum: this.pageNum + 1,
			pageSize: 10
		});

		this.chefInfoList();
	},
	onShareAppMessage: function() {},
	methods: {
		// 获取厨师列表
		chefInfoList: function() {
			uni.showLoading({
				title: '正在加载...',
				mask: true
			});

			var params = {
				searchKey: this.searchValue,
				city: app.globalData.city,
				latitude: this.latitude,
				longitude: this.longitude,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				chefSort: this.chefSort,
				startBasicFee: this.startBasicFee,
				endBasicFee: this.endBasicFee,
				minNum: this.minNum,
				maxNum: this.maxNum,
				cookAge: this.cookAge,
				dishStyleIdList: this.dishStyleIdList,
				distance: this.distance
			};

			this.$api.chefInfo.list.request(params).then(data => {
				data.time = new Date().getTime();
				console.log('厨师列表', data);

				data.list.forEach(function(item) {
					if (item.cuisine && 'null' != item.cuisine) {
						console.log(item.cuisine);
						item.cuisine = item.cuisine.split(',');
					}
				});

				if (this.pageNum > 1) {
					this.chefList.concat(data.list);
				} else {
					this.chefList = data.list;
				}

				this.total = data.total;
				uni.hideLoading();
			});
		},
		// 获取轮播图
		chefSlideshow: function(t) {
			var that = this;
			this.$api.applet.slideshow
				.request({
					picType: 'chefSlideshow'
				})
				.then(data => {
					that.setData({
						bannerList: data.list,
						bannerLength: data.list.length
					});
					uni.hideLoading();
				});
		},
		// 获取厨师列表
		findDishStyleFun: function(t) {
			var that = this;
			this.$api.chefInfo.findDishStyle.request().then(data => {
				let findDishStyle = [];
				for (let i = 0; i < data.length; i++) {
					findDishStyle.push(data[i]);
				}

				findDishStyle.unshift({
					name: '全部菜系',
					id: 0
				});

				this.findDishStyle = findDishStyle;
			});
		},
		// 搜索栏目
		bindSearch: function(t) {
			this.searchValue = t.detail.value;
		},
		confirmTap: function() {
			this.chefInfoList();
		},
		// 清楚搜索栏目
		close: function() {
			this.searchValue = '';
			this.chefInfoList();
		},

		swiperChange: function(t) {
			this.bannerIndex = t.detail.current;
		},

		delChoe: function(t) {
			var a = this.choice;
			var i = t.currentTarget.dataset.name;
			var e = t.currentTarget.dataset.index;
			if ('fee' == i) {
				this.setData({
					startBasicFee: '',
					endBasicFee: ''
				});
			}

			if ('ple' == i) {
				this.setData({
					minNum: '',
					maxNum: ''
				});
			}

			if ('cl' == i) {
				this.setData({
					cookAge: 0
				});
			}

			if ('xaixi' == i) {
				this.setData({
					dishStyleIdList: [],
					disIndex: 0
				});
			}

			if ('juli' == i) {
				this.setData({
					distance: '',
					disSub: 0
				});
			}

			a.splice(e, 1);
			this.setData({
				choice: a
			});
			this.chefInfoList();
		},

		paixu: function(t) {
			if (0 == this.scrollHei) {
				uni.pageScrollTo({
					duration: false,
					scrollTop: this.dingtop + 1
				});
			}

			this.setData({
				isSort: !this.isSort,
				isService: false,
				isQuali: false,
				isDistance: false
			});
		},

		paixuSort: function(t) {
			var a = t.currentTarget.dataset.code;
			var i = t.currentTarget.dataset.index;
			this.setData({
				chefList: [],
				sortSub: i,
				chefSort: a,
				pageNum: 1,
				pageSize: 10,
				isSort: !this.isSort,
				sortText: this.sort[i].name
			});
			this.chefInfoList();
		},

		fwservice: function(t) {
			if (0 == this.scrollHei) {
				uni.pageScrollTo({
					duration: false,
					scrollTop: this.dingtop + 1
				});
			}

			this.setData({
				isSort: false,
				isService: !this.isService,
				isQuali: false,
				isDistance: false
			});
		},

		fwReset: function(t) {
			for (var a = this.choice, i = 0; i < a.length; i++) {
				if ('fee' == a[i].name) {
					a.splice(i, 1);
				}

				if ('ple' == a[i].name) {
					a.splice(i, 1);
				}
			}

			this.setData({
				chefList: [],
				pageNum: 1,
				pageSize: 10,
				startBasicFee: '',
				endBasicFee: '',
				minNum: '',
				maxNum: '',
				choice: a
			});
			this.chefInfoList();
		},

		fwDetermine: function(t) {
			var a = this.choice;
			var i = {};
			if ('' != this.startBasicFee || '' != this.endBasicFee) {
				if ('' != this.startBasicFee && '' != this.endBasicFee && this.startBasicFee > this.endBasicFee) {
					uni.showToast({
						title: '最低基础服务费不能大于最高基础服务费',
						duration: 2000,
						icon: 'none'
					});
				}

				i = {
					name: 'fee',
					code: '' == this.startBasicFee ? '￥' + this.endBasicFee : '' == this.endBasicFee ? '￥' + this.startBasicFee : '￥' + this.startBasicFee + '-' + this.endBasicFee
				};
				for (var e = 0; e < a.length; e++) {
					if ('fee' == a[e].name) {
						a.splice(e, 1);
					}
				}

				a.push(i);
			}

			var s = {};

			if ('' != this.minNum || '' != this.maxNum) {
				var d = parseInt(this.minNum);
				var h = parseInt(this.maxNum);
				if (this.isIntNum(d) && this.isIntNum(h)) {
					if (d > h) {
						this.setData({
							minNum: h,
							maxNum: d
						});
					}
				} else {
					uni.showToast({
						title: '请输入正整数',
						duration: 2000,
						icon: 'none'
					});
				}

				s = {
					name: 'ple',
					code: '' == this.minNum ? this.maxNum + '人' : '' == this.maxNum ? this.minNum + '人' : this.minNum + '-' + this.maxNum + '人'
				};
				for (var n = 0; n < a.length; n++) {
					if ('ple' == a[n].name) {
						a.splice(n, 1);
					}
				}

				a.push(s);
			}

			this.setData({
				chefList: [],
				pageNum: 1,
				pageSize: 10,
				choice: a,
				isService: !this.isService
			});

			this.chefInfoList();
		},

		isIntNum: function(t) {
			return !!/(^[1-9]\d*$)/.test(t);
		},

		bindPickerChange: function(t) {
			var a = this.priceArr[t.detail.value];
			this.setData({
				startBasicFee: a
			});
		},

		bindPickerChangeGao: function(t) {
			var a = this.priceArr[t.detail.value];
			this.setData({
				endBasicFee: a
			});
		},

		clQuali: function(t) {
			if (0 == this.scrollHei) {
				uni.pageScrollTo({
					duration: false,
					scrollTop: this.dingtop + 1
				});
			}

			this.setData({
				isSort: false,
				isService: false,
				isQuali: !this.isQuali,
				isDistance: false
			});
		},

		caixi: function(t) {
			var a = [];
			var i = t.currentTarget.dataset.id;
			var e = t.currentTarget.dataset.name;
			var s = t.currentTarget.dataset.index;
			a.push(i);
			this.setData({
				dishStyle: e,
				disIndex: s,
				dishStyleIdList: a
			});
		},

		clReset: function(t) {
			for (var a = this.choice, i = 0; i < a.length; i++) {
				if ('cl' == a[i].name) {
					a.splice(i, 1);
				}

				if ('xaixi' == a[i].name) {
					a.splice(i, 1);
				}
			}

			this.setData({
				chefList: [],
				pageNum: 1,
				pageSize: 10,
				cookAge: 0,
				dishStyleIdList: [],
				disIndex: 0,
				choice: a
			});

			this.chefInfoList();
		},

		clDetermine: function(t) {
			var a = this.choice;

			if (0 != this.cookAge) {
				for (
					var i = {
							name: 'cl',
							code: this.cookAge + '年以上'
						},
						e = 0;
					e < a.length;
					e++
				) {
					if ('cl' == a[e].name) {
						a.splice(e, 1);
					}
				}

				a.push(i);
			}

			if (0 != this.dishStyleIdList.length) {
				for (
					var s = {
							name: 'xaixi',
							code: this.dishStyle
						},
						d = 0;
					d < a.length;
					d++
				) {
					if ('xaixi' == a[d].name) {
						a.splice(d, 1);
					}
				}

				a.push(s);
			}

			this.setData({
				chefList: [],
				pageNum: 1,
				pageSize: 10,
				choice: a,
				isQuali: !this.isQuali
			});

			this.chefInfoList();
		},

		bindMinus: function() {
			var t = this.cookAge;

			if (--t <= 0) {
				this.setData({
					cookAge: 0
				});
			} else {
				this.setData({
					cookAge: t
				});
			}
		},

		bindPlus: function() {
			var t = this.cookAge;
			t++;
			this.setData({
				cookAge: t
			});
		},

		bindManual: function(t) {
			var a = new RegExp(/^\+?[1-9][0-9]*$/);
			var i = t.detail.value;
			if ('' == i) {
				this.setData({
					cookAge: ''
				});
			} else {
				if (!a.test(i)) {
					uni.showToast({
						title: '厨龄数须为整数',
						icon: 'none',
						duration: 2000
					});
					return void this.setData({
						cookAge: i.substring(0, i.indexOf('.'))
					});
				}

				this.setData({
					cookAge: i
				});
			}
		},

		minNumFun: function(t) {
			this.setData({
				minNum: t.detail.value
			});
		},

		maxNumFun: function(t) {
			this.setData({
				maxNum: t.detail.value
			});
		},

		isDistanceFun: function(t) {
			if (0 == this.scrollHei) {
				uni.pageScrollTo({
					duration: false,
					scrollTop: this.dingtop + 1
				});
			}

			this.setData({
				isSort: false,
				isService: false,
				isQuali: false,
				isDistance: !this.isDistance
			});
		},

		juliDis: function(t) {
			var a = this.choice;
			var i = t.currentTarget.dataset.km;
			var e = t.currentTarget.dataset.index;
			if ('全部' != i) {
				for (
					var s = {
							name: 'juli',
							code: i
						},
						d = 0;
					d < a.length;
					d++
				) {
					if ('juli' == a[d].name) {
						a.splice(d, 1);
					}
				}

				a.push(s);
			} else {
				for (var h = 0; h < a.length; h++) {
					if ('juli' == a[h].name) {
						a.splice(h, 1);
					}
				}

				i = '';
			}

			this.setData({
				chefList: [],
				disSub: e,
				distance: i,
				pageNum: 1,
				pageSize: 10,
				isDistance: !this.isDistance,
				choice: a
			});

			this.chefInfoList();
		},

		location: function(t) {
			uni.navigateTo({
				url: '../location/location'
			});
		},

		// 初始详情
		cookDetails: function(t) {
			var a = t.currentTarget.dataset.code;
			uni.navigateTo({
				url: '../cookDetails/cookDetails?code=' + a
			});
		}
	}
};
</script>
<style>
page {
	background: #fff;
}

.search {
	margin: 0 auto;
	position: relative;
	width: 690rpx;
}

.search view {
	background: #f0f0f0;
	border: 1rpx solid #f2f2f2;
	border-radius: 26rpx;
}

.search image {
	margin-top: -20rpx;
	position: absolute;
}

.search .sousuo {
	height: 40rpx;
	left: 30rpx;
	margin-top: -20rpx;
	top: 50%;
	width: 40rpx;
}

.search .close {
	height: 60rpx;
	margin-top: -30rpx;
	right: 30rpx;
	top: 50%;
	width: 60rpx;
}

.search input {
	height: 80rpx;
	margin: 0 auto;
	width: 500rpx;
}

.nav {
	background: #fff;
	background-size: 100% 100%;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 0rpx;
	z-index: 99999;
}

.nav,
.nav_holder,
.nav_title {
	height: auto;
	width: 750rpx;
}

.nav_title_left {
	display: flex;
	float: left;
	width: 240rpx;
}

.nav_title_left,
.nav_title_left text {
	align-items: center;
}

.nav_title_left text {
	color: #333;
	display: inline-block;
	font-size: 28rpx;
	height: auto;
	margin: 0 10rpx 0 30rpx;
	max-width: 190rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.nav_title_left image {
	height: 14rpx;
	vertical-align: middle;
	width: 24rpx;
}

.nav_title_center {
	align-items: center;
	color: #000;
	font-size: 34rpx;
	height: auto;
	justify-content: center;
	margin: 0 auto;
	width: 270rpx;
}

.fuwu,
.nav_title_center {
	display: flex;
}

.fuwu {
	height: 90rpx;
	width: 750rpx;
}

.fuwu view {
	flex: 1;
}

.fuwu view image {
	display: block;
	height: 40rpx;
	margin: 0 auto;
	width: 36rpx;
}

.fuwu view text {
	color: #333;
	display: block;
	font-size: 24rpx;
	margin-top: 18rpx;
	text-align: center;
	width: 100%;
}

.banner {
	background: #fff;
	padding-top: 40rpx;
	position: relative;
}

.banner,
.banner_con {
	height: 170rpx;
	width: 750rpx;
}

.swiperItem {
	margin: 0 30rpx;
}

.slide-image,
.swiperItem {
	border-radius: 10rpx;
	height: 170rpx;
	width: 690rpx;
}

.dots {
	bottom: 20rpx;
	display: flex;
	height: 12rpx;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
}

.dots view {
	float: left;
	margin: 0 10rpx;
}

.dot {
	background: #98999a;
	width: 12rpx;
}

.active,
.dot {
	border-radius: 12rpx;
	height: 12rpx;
}

.active {
	background: #fff;
	margin: 0rpx !important;
	width: 22rpx;
}

.option {
	background: #fff;
	height: 88rpx;
	width: 750rpx;
	z-index: 15;
}

.optionFixed {
	border-top: 1rpx solid #e5e5e5;
	position: fixed;
}

.optionStatic {
	margin-top: 20rpx;
	position: sticky;
	display: flex;
	background-color: #fff;
	z-index: 1;
}

.optionCon1 {
	align-items: center;
	display: flex;
	/* float: left; */
	height: 88rpx;
	justify-content: center;
	vertical-align: middle;
	width: 195rpx;
}

.optionCon1 text {
	color: #333;
	font-size: 30rpx;
}

.optionCon1 view {
	border-left: 10rpx solid transparent;
	border-right: 10rpx solid transparent;
	border-top: 10rpx solid #999;
	height: 0;
	margin: 3rpx 0 0 8rpx;
	width: 0;
}

.optionCon {
	align-items: center;
	display: flex;
	float: left;
	height: 88rpx;
	justify-content: center;
	vertical-align: middle;
	width: 185rpx;
}

.optionCon text {
	color: #333;
	font-size: 30rpx;
}

.optionCon view {
	border-left: 10rpx solid transparent;
	border-right: 10rpx solid transparent;
	border-top: 10rpx solid #999;
	height: 0;
	margin: 3rpx 0 0 8rpx;
	width: 0;
}

.option_hover {
	color: #ca9f58 !important;
}

.option_hover_jiao {
	border-top: 10rpx solid #ca9f58 !important;
	transform: rotate(180deg);
}

.selectList {
	height: auto;
	margin: 0 30rpx;
	overflow: hidden;
	width: 690rpx;
}

.selectList view {
	background: #faf5ee;
	border-radius: 60rpx;
	color: #ca9f58;
	float: left;
	font-size: 24rpx;
	line-height: 60rpx;
	margin: 0 30rpx 20rpx 0;
	padding: 0 20rpx;
}

.selectList view,
.selectList view text {
	height: 60rpx;
	width: auto;
}

.selectList view image {
	height: 20rpx;
	margin-left: 20rpx;
	vertical-align: middle;
	width: 20rpx;
}

.hotCook {
	min-height: 1400rpx;
	overflow: hidden;
	padding-bottom: 30rpx;
	width: 750rpx;
}

.hotCookCon {
	border-radius: 14rpx;
	box-shadow: 0rpx 0rpx 20rpx #e2e2e2;
	height: 607rpx;
	margin: 20rpx auto 50rpx;
	overflow: hidden;
	width: 690rpx;
}

.hotCookCon_left {
	float: left;
	height: 330rpx;
	margin: 30rpx 0 0 20rpx;
	overflow: hidden;
	position: relative;
	width: 250rpx;
}

.hotCookCon_left image {
	border-radius: 10rpx 10rpx 0rpx 0rpx;
	height: 330rpx;
	left: 0rpx;
	position: absolute;
	top: 0rpx;
	width: 250rpx;
}

.hotCookCon_left text {
	background: url('https://cookwaptest.5156dujia.com/img/cookYy.png') no-repeat;
	background-size: 250rpx 119rpx;
	bottom: 0rpx;
	color: #fff;
	font-size: 26rpx;
	height: 119rpx;
	left: 0rpx;
	line-height: 170rpx;
	position: absolute;
	text-align: center;
	width: 250rpx;
}

.hotCookCon_right {
	float: right;
	height: 330rpx;
	margin: 30rpx 20rpx 0 0;
	overflow: hidden;
	width: 380rpx;
}

.hotCookCon_right_name {
	float: left;
	height: 60rpx;
	width: 380rpx;
}

.hotCookCon_right_name_name {
	color: #262626;
	float: left;
	font-size: 34rpx;
	height: 60rpx;
	line-height: 60rpx;
	max-width: 236rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.hotCookCon_right_name_tw {
	float: left;
	height: 60rpx;
	margin-left: 30rpx;
	width: auto;
}

.hotCookCon_right_name_tw image {
	height: 29rpx;
	margin-right: 10rpx;
	vertical-align: middle;
	width: 29rpx;
}

.hotCookCon_right_name_tw text {
	color: #ca9f58;
	font-size: 24rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: auto;
}

.hotCookCon_right_fen {
	float: left;
	height: 60rpx;
	width: 380rpx;
}

.hotCookCon_right_fen_name {
	color: #ca9f58;
	float: left;
	font-size: 36rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: auto;
}

.hotCookCon_right_fen_name text {
	font-size: 28rpx !important;
}

.hotCookCon_right_fen_pj {
	float: left;
	height: 60rpx;
	margin-left: 30rpx;
	width: auto;
}

.hotCookCon_right_fen_pj text {
	color: #429ce8;
	font-size: 24rpx;
	height: 60rpx;
	line-height: 70rpx;
	width: auto;
}

.hotCookCon_right_fen_pj image {
	height: 16rpx;
	margin-left: 10rpx;
	vertical-align: middle;
	width: 8rpx;
}

.hotCookCon_right_list {
	display: flex;
	float: left;
	height: 46rpx;
	margin-top: 20rpx;
	width: 380rpx;
}

.hotCookCon_right_list text {
	border: 1rpx solid #e8d4b5;
	border-radius: 32rpx;
	color: #ca9f58;
	float: left;
	font-size: 24rpx;
	height: 32rpx;
	margin-right: 14rpx;
	overflow: hidden;
	padding: 5rpx 16rpx;
	width: auto;
}

.hotCookCon_right_list text:last-child {
	margin-right: 0rpx;
}

.hotCookCon_right_title {
	color: #999;
	float: left;
	font-size: 26rpx;
	height: auto;
	margin-top: 30rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 380rpx;
}

.hotCookCon_right_jiage {
	float: left;
	height: 50rpx;
	margin-top: 28rpx;
	width: 380rpx;
}

.hotCookCon_right_jiage_left {
	color: #b32d1f;
	float: left;
	font-size: 42rpx;
	width: auto;
}

.hotCookCon_right_jiage_left1 {
	font-size: 26rpx;
}

.hotCookCon_right_jiage_left2 {
	color: #999;
	font-size: 24rpx;
}

.hotCookCon_right_jiage_right {
	color: #ca9f58;
	float: right;
	font-size: 24rpx;
	margin-top: 16rpx;
	width: auto;
}

.hotCookCon_bottom {
	float: left;
	height: 122rpx;
	margin: 25rpx 0 0 20rpx;
	width: 690rpx;
}

.hotCookCon_bottom image {
	border-radius: 14rpx;
	float: left;
	height: 122rpx;
	margin-right: 11rpx;
	width: 122rpx;
}

.hotCookCon_bottom image:last-child {
	margin-right: 0rpx;
}

.hotCookCon_juli {
	color: #999;
	float: left;
	font-size: 26rpx;
	height: 100rpx;
	width: 690rpx;
}

.hotCookCon_juli image {
	float: left;
	height: 26rpx;
	margin: 38rpx 0 0 20rpx;
	width: 20rpx;
}

.hotCookCon_juli1 {
	float: left;
	height: 100rpx;
	line-height: 100rpx;
	margin-left: 10rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 400rpx;
}

.hotCookCon_juli2 {
	float: right;
	height: 100rpx;
	line-height: 100rpx;
	margin-right: 20rpx;
	width: auto;
}

.cookZanwu {
	height: 1000rpx;
	overflow: hidden;
	padding-bottom: 30rpx;
	width: 750rpx;
}

.cookZanwu image {
	display: block;
	height: 265rpx;
	margin: 100rpx auto 0;
	width: 356rpx;
}

.cookZanwu text {
	color: #999;
	display: block;
	font-size: 30rpx;
	height: auto;
	margin-top: 50rpx;
	text-align: center;
	width: 750rpx;
}

.show {
	display: block;
}

.hide {
	display: none;
}

.sort,
.sort_bj {
	z-index: 100;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 750rpx;
	height: 100vh;
}

.sort_bj {
	background: #000;
	opacity: 0.5;
}

.sort_con {
	z-index: 110;
	position: fixed;
	top: 199rpx;
	left: 0rpx;
	width: 750rpx;
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
}

.sort_con view {
	border-bottom: 1rpx solid #f3f3f3;
	color: #333;
	display: inline-block;
	height: 90rpx;
	line-height: 90rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.sort_con view text {
	font-size: 26rpx;
}

.sort_con view image {
	float: right;
	height: 22rpx;
	margin-top: 29rpx;
	width: 30rpx;
}

.sort_con view:last-child {
	border-bottom: none;
}

.sort_con .act {
	color: #ca9f58;
	margin: 0rpx;
	padding: 0 30rpx;
	width: 690rpx;
}

.services,
.services_bj {
	z-index: 100;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 750rpx;
	height: 100vh;
}

.services_bj {
	background: #000;
	opacity: 0.5;
}

.services_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.services_charge {
	height: auto;
	margin: 0 30rpx 0rpx;
	overflow: hidden;
	width: 690rpx;
}

.services_charge_title {
	color: #999;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin: 20rpx 0 30rpx;
	width: 690rpx;
}

.services_jiage {
	height: 68rpx;
	margin-top: 30rpx;
	width: 690rpx;
}

.services_jiage view {
	background: #f6f6f6;
	border-radius: 10rpx;
	color: #999;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	width: 260rpx;
}

.services_jiage_left {
	width: auto;
}

.services_jiage_left text {
	float: left;
	height: 68rpx;
	line-height: 68rpx;
	margin-left: 30rpx;
	width: auto;
}

.services_jiage_left image {
	float: right;
	height: 9rpx;
	margin: 29rpx 30rpx 0 0;
	vertical-align: middle;
	width: 16rpx;
}

.services_jiage_right {
	width: auto;
}

.services_jiage_right text {
	float: left;
	height: 68rpx;
	line-height: 68rpx;
	margin-left: 30rpx;
	width: auto;
}

.services_jiage_right image {
	float: right;
	height: 9rpx;
	margin: 29rpx 30rpx 0 0;
	vertical-align: middle;
	width: 16rpx;
}

.services_charge_xian {
	color: #999;
	float: left;
	font-size: 30rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin: 0 40rpx;
	width: auto;
}

.services_people {
	height: auto;
	margin: 20rpx 30rpx 0;
	overflow: hidden;
	width: 690rpx;
}

.services_people_left {
	background: #f6f6f6;
	border-radius: 10rpx;
	float: left;
	height: 68rpx;
	width: 260rpx;
}

.services_people_left input {
	color: #262626;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 30rpx;
	text-align: center;
	width: 200rpx;
}

.services_people_left input::-webkit-input-placeholder {
	color: #999;
}

.services_people_left input::placeholder {
	color: #999;
}

.services_people_right {
	background: #f6f6f6;
	border-radius: 10rpx;
	float: left;
	height: 68rpx;
	width: 260rpx;
}

.services_people_right input {
	color: #262626;
	float: left;
	font-size: 28rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 30rpx;
	text-align: center;
	width: 200rpx;
}

.services_people_right input::-webkit-input-placeholder {
	color: #999;
	font-size: 28rpx;
}

.services_people_right input::placeholder {
	color: #999;
	font-size: 28rpx;
}

.services_fixed {
	border-top: 1rpx solid #e5e5e5;
	height: 100rpx;
	margin-top: 75rpx;
	width: 750rpx;
}

.services_fixed_xx {
	margin: 10rpx 0 0 30rpx;
}

.services_fixed_cz,
.services_fixed_xx {
	border: 1rpx solid #999;
	border-radius: 10rpx;
	color: #333;
	float: left;
	font-size: 30rpx;
	height: 78rpx;
	line-height: 78rpx;
	text-align: center;
	width: 168rpx;
}

.services_fixed_cz {
	margin: 10rpx 0 0 20rpx;
}

.services_fixed_qd {
	background: #ca9f58;
	border-radius: 10rpx;
	color: #fff;
	float: right;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 10rpx 30rpx 0 0;
	text-align: center;
	width: 310rpx;
}

.qualifications,
.qualifications_bj {
	height: 100vh;
	left: 0rpx;
	position: fixed;
	top: 0rpx;
	width: 750rpx;
}

.qualifications_bj {
	background: #000;
	opacity: 0.5;
}

.qualifications_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.qualifications_con_title {
	color: #999;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin: 20rpx 30rpx 0;
	width: 690rpx;
}

.jianyeshu_right {
	height: 42rpx;
	margin: 35rpx 0 0 30rpx;
	width: 180rpx;
}

.jianyeshu_right image {
	height: 42rpx;
	width: 42rpx;
}

.jian {
	float: left;
}

.jianyeshu_right input {
	color: #ca9f58;
	float: left;
	font-size: 32rpx;
	height: 42rpx;
	line-height: 42rpx;
	margin-left: 10rpx;
	text-align: center;
	width: 80rpx;
}

.jia {
	float: right;
}

.qualifications_cuisine {
	height: auto;
	margin: 20rpx 30rpx 0;
	overflow: hidden;
	width: 690rpx;
}

.qualifications_cuisine text {
	background: #f6f6f6;
	border-radius: 10rpx;
	color: #333;
	float: left;
	font-size: 26rpx;
	height: 68rpx;
	line-height: 68rpx;
	margin: 28rpx 20rpx 0 0;
	overflow: hidden;
	text-align: center;
	width: 122rpx;
}

.qualifications_cuisine text:nth-child(5n) {
	margin: 28rpx 0rpx 0 0;
}

.cxdis {
	background: #faf5ee !important;
	border: 1rpx solid #ca9f58 !important;
	border-radius: 10rpx !important;
	color: #ca9f58 !important;
	float: left;
	height: 64rpx !important;
	line-height: 64rpx !important;
	margin: 28rpx 20rpx 0 0;
	text-align: center;
	width: 118rpx !important;
}

.distance,
.distance_bj {
	height: 100vh;
	left: 0rpx;
	position: fixed;
	top: 0rpx;
	width: 750rpx;
}

.distance_bj {
	background: #000;
	opacity: 0.5;
}

.distance_con {
	background: #fff;
	border-top: 1rpx solid #f3f3f3;
	height: auto;
	left: 0rpx;
	overflow: hidden;
	position: fixed;
	top: 199rpx;
	width: 750rpx;
}

.distance_con view {
	border-bottom: 1rpx solid #f3f3f3;
	color: #333;
	display: inline-block;
	font-size: 26rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 30rpx;
	width: 690rpx;
}

.distance_con view text {
	font-size: 26rpx;
}

.distance_con view image {
	float: right;
	height: 22rpx;
	margin-top: 29rpx;
	width: 30rpx;
}

.distance_con view:last-child {
	border-bottom: none;
}

.distance_con .km {
	color: #ca9f58;
	margin: 0rpx;
	padding: 0 30rpx;
	width: 690rpx;
}
</style>
