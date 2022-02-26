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
                <view class="xian hui"></view>
                <text class="wenzi3" style="color: #ca9f58">职业履历</text>
            </view>
            <view class="zh3 step_t3" style="width: 130rpx">
                <text class="biao hui">4</text>
                <view class="xian hui"></view>
                <text class="wenzi3">服务信息</text>
            </view>
            <view class="zh4 step_t4">
                <text class="biao4 hui">5</text>
                <view class="xian hui"></view>
                <text class="wenzi4">完成</text>
            </view>
        </view>
        <view class="container">
            <view class="goodAt">
                <view class="title">
                    <text class="mihao">✲</text>
                    基本就业情况
                </view>
                <picker @change="bindOccupation" :range="occupationList" :rangeKey="'name'" :value="index">
                    <view class="essential_picker">
                        <view>职业状态</view>
                        <text>{{ occupation }}</text>
                        <image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
                    </view>
                </picker>
                <view class="essential_ster">
                    <view class="essential_ster_left">厨龄</view>
                    <view class="essential_ster_right">
                        <image @tap="bindMinus" class="jian" src="https://cookwaptest.5156dujia.com/img/jian.png"></image>
                        <input @input="bindManual" placeholder="" type="" :value="num" />
                        <image @tap="bindPlus" class="jia" src="https://cookwaptest.5156dujia.com/img/jia.png"></image>
                    </view>
                </view>
                <view class="essential_input" style="border-bottom: 1rpx solid #e5e5e5">
                    <view class="view">擅长菜系</view>
                    <view class="text-box">
                        <text>{{ styleDish }}</text>
                        <textarea @input="bindDish" class="weui-textarea" maxlength="-1" placeholder="必填项，可填多个" :value="styleDish" v-if="!guarantee"></textarea>
                    </view>
                </view>
                <view class="essential_input" style="min-height: 372rpx">
                    <view class="view">工作履历</view>
                    <view class="text-box">
                        <text>{{ resume }}</text>
                        <textarea @input="bindresume" class="weui-textarea" maxlength="-1" placeholder="年份、酒店、岗位(必填项)" :value="resume" v-if="!guarantee"></textarea>
                    </view>
                </view>
            </view>
            <view class="blue"></view>
            <view class="health">
                <view class="title">
                    <text class="mihao">✲</text>
                    健康证
                </view>
                <picker @change="bindDateChange" :end="endTime" mode="date" :start="startTime" :value="choiceTime">
                    <view class="essential_picker essential_none">
                        <view>到期时间</view>
                        <text>{{ choiceTime }}</text>
                        <image src="https://cookwaptest.5156dujia.com/img/fillIn_sj.png"></image>
                    </view>
                </picker>
                <view @tap="uploadImg" class="health_con" data-isid="healthy">
                    <image :src="healthy.length == 0 ? 'https://cookwaptest.5156dujia.com/img/shiming_t5.png' : healthy[0]"></image>
                    <text>请上传健康证</text>
                </view>
            </view>
            <view class="blue"></view>
            <view class="certificates">
                <view class="title">厨师证件(非必填)</view>
                <block v-for="(item, index) in certificatesList" :key="index">
                    <view class="blue_con" v-if="index == 0 ? false : true"></view>

                    <view class="certificates_con">
                        <view class="certificates_con_left">
                            <image
                                @tap="certificatesAdd"
                                :data-index="index"
                                src="https://cookwaptest.5156dujia.com/img/certificates_t1.png"
                                v-if="index == 0 ? true : false"
                            ></image>
                            <image
                                @tap="deleteCertificatesList"
                                :data-index="index"
                                src="https://cookwaptest.5156dujia.com/img/certificates_t2.png"
                                v-if="index > 0 ? true : false"
                            ></image>
                        </view>
                        <view class="certificates_con_right">
                            <view class="certificates_con_right_ry">
                                <view>证件名称</view>
                                <input @input="catesValue" :data-index="index" data-tag="picName" placeholder="请填写" type="text" :value="item.picName" />
                            </view>
                            <view @tap="uploadImg" class="certificates_con_right_zj" :data-index="index" data-isid="certificates">
                                <view class="certificates_con_right_zj_left">证件照(等级页)</view>
                                <text class="certificates_con_right_zj_right" v-if="item.url == '' || item.url == null ? true : false">请点击上传</text>
                                <view class="certificates_con_right_zj_right1" v-if="item.url == '' || item.url == null ? false : true">
                                    <image @tap.stop.prevent="deleteCert" class="guan_zj" :data-index="index" src="https://cookwaptest.5156dujia.com/img/guanbi.png"></image>
                                    <image class="zhu_zj" :src="item.url"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
            <view class="blue"></view>
            <view class="honors">
                <view class="title">所获荣誉(非必填)</view>
                <block v-for="(item, index) in honorsList" :key="index">
                    <view class="essential_input" v-if="index == 0 ? true : false">
                        <view style="display: flex; align-items: center">荣誉名称</view>
                        <input @input="honorsValue" :data-index="index" data-tag="name" placeholder="请填写" type="text" :value="item.name" />
                    </view>

                    <view :class="'honors_con ' + (honorsList.length - 1 == index ? 'honors_none' : '')" v-if="index > 0 ? true : false">
                        <view @tap="honorsDelete" class="honors_con_left" :data-index="index">
                            <image src="https://cookwaptest.5156dujia.com/img/certificates_t2.png"></image>
                        </view>
                        <view class="honors_con_right">
                            <view>荣誉名称</view>
                            <input @input="honorsValue" :data-index="index" data-tag="name" placeholder="请填写" type="text" :value="item.name" />
                        </view>
                    </view>
                </block>
                <view @tap="honorsAdd" class="newly">继续添加</view>
            </view>
            <view class="blue"></view>
            <view class="photo">
                <view @tap="uploadImg" class="photo_con" data-isid="photo">
                    <image src="https://cookwaptest.5156dujia.com/img/shiming_t4.png"></image>
                    <view>请上传所有荣誉的正面拍摄图片</view>
                    <text>图片高质量有助于提高厨师申请通过率</text>
                </view>
                <view class="photo_img" v-if="photo.length == 0 ? false : true">
                    <view class="voucher_con_img" v-for="(item, index) in photo" :key="index">
                        <image @tap="deletePhoto" class="guan" :data-index="index" src="https://cookwaptest.5156dujia.com/img/guanbi.png"></image>

                        <image class="zhu" :src="item"></image>
                    </view>
                </view>
            </view>
        </view>
        <view :style="'width:750rpx;height:150rpx;padding-bottom:' + paddingBottom + 'px;'"></view>
        <view class="mackFix" :style="'padding-bottom:' + paddingBottom + 'px;'">
            <view class="mackFix_right">
                <view @tap="cancel" class="mackFix_right2">取消</view>
                <view @tap="nextTap" class="mackFix_right3">下一步</view>
            </view>
        </view>
    </block>
</template>

<script>
var app = getApp();

var e = require('../../utils/apiCook.js');

var a = require('../../utils/imgUpload.js');

var i = require('../../utils/thorttle.js');

export default {
    data() {
        return {
            styleDish: '',
            regionSelAll: [],
            findChefDetail: [],
            isNext: false,
            detailPics: [],
            occupation: '',
            occupationState: '',
            occupationList: [
                {
                    name: '在职',
                    code: 'workStatus'
                },
                {
                    name: '自由职业',
                    code: 'quitStatus'
                }
            ],
            token: '',
            num: 0,
            startTime: '',
            endTime: '',
            choiceTime: '',
            certificatesList: [
                {
                    picName: '',
                    url: ''
                }
            ],
            isChefList: [],
            certificates: [],
            qncertificatesList: [],
            honorsList: [
                {
                    name: ''
                }
            ],
            healthy: [],
            qnhealthy: [],
            photo: [],
            qnphoto: [],
            checked: false,
            guarantee: false,
            iscert: false,
            isphoto: false,
            stepOne: [],
            stepTow: [],
            stepThree: [],
            resume: '',
            timeshu: 6,
            rantee: false,
            state: '',
            cookCode: '',
            certificatesListAge: [],
            photoAge: [],
            id: '',
            setTimer: '',
            paddingBottom: 0
        };
    },
    onLoad: function (e) {
        uni.hideShareMenu();
        this.setData({
            startTime: this.time(0),
            endTime: this.time(2),
            state: e.state,
            cookCode: e.cookcode,
            paddingBottom: app.globalData.paddingBottom
        });
        console.log(e);
        this.getQiniuToken();

        if (null != this.state && null != this.cookCode) {
            this.findChefDetailFun();
        }
    },
    onReady: function () {},
    onShow: function () {
        console.log(uni.getStorageSync('stepOne'));
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        getQiniuToken: function () {
            var that = this;
            e.requestApi('/common/getQiniuToken', {}, 'POST', true, function (e) {
                that.setData({
                    token: e.data.data
                });
            });
        },

        cancel: function (t) {
            uni.switchTab({
                url: '../my/my'
            });
        },

        findChefDetailFun: function (t) {
            var that = this;
            var i = {
                cookCode: that.cookCode
            };
            e.requestApi('/chefInfo/service/findChefDetail', i, 'POST', true, function (t) {
                console.log('查询申请厨师详情信息', t);
                that.setData({
                    findChefDetail: t.data.data
                });
                var e = t.data.data.chefManageVo;
                var i = [];
                i.push(e.healthCertificy);
                var s = [];

                if (null == e.honorReceivedList) {
                    s.push({
                        name: ''
                    });
                } else {
                    for (var o = 0; o < e.honorReceivedList.length; o++) {
                        s.push({
                            name: e.honorReceivedList[o]
                        });
                    }
                }

                var n = [];

                if ('' == e.certificateList) {
                    n.push({
                        picName: '',
                        url: ''
                    });
                } else {
                    for (var c = 0; c < e.certificateList.length; c++) {
                        n.push({
                            picName: e.certificateList[c].picName,
                            url: e.certificateList[c].picUrlFileList[0].url
                        });
                    }
                }

                var r = [];

                if ('' != e.honorPicList) {
                    for (var h = 0; h < e.honorPicList.length; h++) {
                        r.push(e.honorPicList[h].url);
                    }
                }

                that.setData({
                    occupation: 'workStatus' == e.jobStatus ? '在职' : '自由职业',
                    occupationState: e.jobStatus,
                    num: e.cookAge,
                    resume: 'null' == e.resume ? '' : e.resume,
                    choiceTime: e.expirationTime,
                    healthy: i,
                    qnhealthy: i,
                    certificatesList: n,
                    honorsList: s,
                    photo: r,
                    id: e.id,
                    styleDish: e.cuisine
                });
                uni.hideLoading();
                console.log(that.certificatesList);
            });
        },

        bindMinus: function () {
            var t = this.num;

            if (--t <= 0) {
                this.setData({
                    num: 0
                });
            } else {
                this.setData({
                    num: t
                });
            }
        },

        bindPlus: function () {
            var t = this.num;

            if ('' == t) {
                this.setData({
                    num: 1
                });
            } else {
                t++;
                this.setData({
                    num: t
                });
            }
        },

        bindManual: function (t) {
            var e = new RegExp(/^\+?[1-9][0-9]*$/);
            var a = t.detail.value;
            if ('' == a) {
                this.setData({
                    num: ''
                });
            } else {
                if (!e.test(a)) {
                    uni.showToast({
                        title: '请输入数字',
                        icon: 'none',
                        duration: 3000
                    });
                    return void this.setData({
                        num: 1
                    });
                }

                this.setData({
                    num: a
                });
            }
        },

        bindDish: function (t) {
            this.setData({
                styleDish: t.detail.value
            });
        },

        bindresume: function (t) {
            this.setData({
                resume: t.detail.value
            });
        },

        bindOccupation: function (t) {
            var e = t.detail.value;
            this.setData({
                occupation: this.occupationList[e].name,
                occupationState: this.occupationList[e].code
            });
        },

        bindDateChange: function (t) {
            this.setData({
                choiceTime: t.detail.value
            });
        },

        time: function (t) {
            var e = new Date();
            var a = e.getFullYear() + t;
            var i = e.getMonth() + 1;
            var s = e.getDate();
            return a + '-' + (i < 10 ? '0' + i : i) + '-' + (s < 10 ? '0' + s : s);
        },

        honorsAdd: function (t) {
            this.setData({
                honorsList: this.honorsList.concat({
                    name: ''
                })
            });
        },

        honorsValue: function (t) {
            var e = t.target.dataset.index;
            var a = t.target.dataset.tag;
            var i = this.honorsList;
            i[e][a] = t.detail.value;
            this.setData({
                honorsList: i
            });
        },

        honorsDelete: function (t) {
            var e = t.currentTarget.dataset.index;
            var a = this.honorsList;
            a.splice(e, 1);
            this.setData({
                honorsList: a
            });
        },

        catesValue: function (t) {
            var e = t.target.dataset.index;
            var a = t.target.dataset.tag;
            var i = this.certificatesList;
            i[e][a] = t.detail.value;
            this.setData({
                certificatesList: i
            });
        },

        deleteCert: function (t) {
            var e = this.certificatesList;
            e[t.currentTarget.dataset.index].url = '';
            this.setData({
                certificatesList: e
            });
        },

        deleteCertificatesList: function (t) {
            var e = this.certificatesList;
            var a = t.currentTarget.dataset.index;
            e.splice(a, 1);
            this.setData({
                certificatesList: e
            });
        },

        certificatesAdd: function (t) {
            var e = t.currentTarget.dataset.index;
            var a = this.certificatesList;
            if ('' == a[e].name && '' == a[e].url) {
                uni.showToast({
                    title: '填写以后才能新增哦！',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            this.setData({
                certificatesList: this.certificatesList.concat({
                    picName: '',
                    url: ''
                })
            });
        },

        uploadImg: function (t) {
            var that = this;
            var a = 0;
            console.log(that);
            console.log(t.currentTarget.dataset.isid);

            if ('healthy' == t.currentTarget.dataset.isid || 'certificates' == t.currentTarget.dataset.isid) {
                a = 1;
            } else {
                a = 9;
            }

            console.log(a);
            var i = t.currentTarget.dataset.isid;
            uni.showActionSheet({
                itemList: ['拍照', '从手机相册选择'],
                success: function (s) {
                    var o;

                    if (0 == s.tapIndex) {
                        o = 'camera';

                        if ('certificates' == i) {
                            that.isUpload(o, a, i, t.currentTarget.dataset.index);
                        } else {
                            that.isUpload(o, a, i);
                        }
                    }

                    if (1 == s.tapIndex) {
                        o = 'album';

                        if ('certificates' == i) {
                            that.isUpload(o, a, i, t.currentTarget.dataset.index);
                        } else {
                            that.isUpload(o, a, i);
                        }
                    }
                },
                fail: function (t) {
                    console.log(t.errMsg);
                }
            });
        },

        isUpload: function (t, e, i, s) {
            var that = this;
            console.log(t, e, i);
            uni.chooseImage({
                count: e,
                success: function (t) {
                    console.log(t);

                    if ('photo' == i) {
                        a.uploadimg({
                            url: 'https://upload.qiniup.com',
                            path: t.tempFilePaths,
                            token: that.token,
                            that: that,
                            arr: that.photo,
                            arrName: 'photo'
                        });
                    }

                    if ('healthy' == i) {
                        that.setData({
                            healthy: []
                        });
                        a.uploadimg({
                            url: 'https://upload.qiniup.com',
                            path: t.tempFilePaths,
                            token: that.token,
                            that: that,
                            arr: that.healthy,
                            arrName: 'healthy'
                        });
                    }

                    if ('certificates' == i) {
                        a.uploadimg({
                            url: 'https://upload.qiniup.com',
                            path: t.tempFilePaths,
                            token: that.token,
                            that: that,
                            arr: that.certificatesList,
                            arrName: '"certificates"',
                            index: s
                        });
                    }
                }
            });
        },

        picImg: function (t, e, a, i) {
            var that = this;
            var o = that.certificatesList;
            uni.chooseImage({
                count: a,
                sizeType: ['original', 'compressed'],
                sourceType: [t],
                success: function (t) {
                    console.log(t);

                    if (t.tempFiles[0].size > 0 && t.tempFiles[0].size <= 4194304) {
                        if ('healthy' == e) {
                            that.setData({
                                healthy: t.tempFilePaths,
                                qnhealthy: []
                            });
                            that.imgUpload(t.tempFilePaths, e);
                        }

                        if ('certificates' == e) {
                            o[i].url = t.tempFilePaths[0];
                            that.setData({
                                certificatesList: o
                            });
                        }

                        if ('photo' == e) {
                            console.log(t.tempFilePaths);
                            var a = that.photo.concat(t.tempFilePaths);
                            that.setData({
                                photo: a
                            });
                            console.log(that.photo);
                        }
                    } else {
                        setTimeout(function () {
                            uni.showToast({
                                title: '选择了无效的图片,请重新选择',
                                duration: 2000,
                                icon: 'none'
                            });
                        }, 500);
                    }
                }
            });
        },

        imgUpload: function (t, e) {
            for (var that = this, i = [], s = 0; s < t.length; s++) {
                var o = t[s];
                uni.uploadFile({
                    url: 'https://upload.qiniup.com',
                    filePath: o,
                    name: 'file',
                    formData: {
                        token: that.token
                    },
                    success: function (s) {
                        var o = JSON.parse(s.data);
                        o.key ||
                            setTimeout(function () {
                                uni.showToast({
                                    title: '选择了无效的图片,请重新选择',
                                    duration: 2000,
                                    icon: 'none',
                                    mask: true
                                });
                            }, 1000);
                        var n = 'https://imgck.5156dujia.com/' + o.key;
                        i.push(n);

                        if (i.length == t.length && 'healthy' == e) {
                            that.setData({
                                qnhealthy: i
                            });
                        }
                    }
                });
            }

            uni.hideLoading();
        },

        deletePhoto: function (t) {
            var e = this.photo;
            var a = t.currentTarget.dataset.index;
            e.splice(a, 1);
            var i = this.detailPics;
            i.splice(a, 1);
            this.setData({
                photo: e,
                detailPics: i
            });
        },

        recommend: function (t) {
            if (0 == this.checked && 0 == this.guarantee) {
                this.setData({
                    checked: true,
                    guarantee: true
                });
            } else {
                this.setData({
                    checked: false,
                    guarantee: false
                });
            }

            if (this.guarantee) {
                this.timer();
            }
        },

        timer: function () {
            var that = this;
            that.setTimer = setInterval(function () {
                that.setData({
                    timeshu: that.timeshu - 1
                });

                if (that.timeshu <= 0) {
                    that.setData({
                        timeshu: 6,
                        rantee: !that.rantee
                    });
                }
            }, 1000);
            clearInterval(that.etTimer);
        },

        xuzhi: function (t) {
            this.setData({
                timeshu: 6,
                guarantee: false,
                checked: false,
                rantee: false
            });
            clearTimeout(this.setTimer);
        },

        xieyi: function (t) {
            this.setData({
                guarantee: false,
                rantee: false
            });
        },

        cookAgreement: function (t) {
            uni.navigateTo({
                url: '../cookAgreement/cookAgreement'
            });
        },

        nextTap: i.throttle(function (t) {
            this.next();
        }, 1000),

        next: function (t) {
            uni.showToast({
                icon: 'loading',
                title: 'Loading',
                duration: 3000,
                mask: true
            });

            if ('' == this.occupationState) {
                uni.showToast({
                    title: '职业状态不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.num) {
                uni.showToast({
                    title: '厨龄不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.styleDish) {
                uni.showToast({
                    title: '擅长菜系不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.styleDish) {
                uni.showToast({
                    title: '擅长菜系不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.resume) {
                uni.showToast({
                    title: '工作履历不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.choiceTime) {
                uni.showToast({
                    title: '健康证到期时间不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.healthy.length) {
                uni.showToast({
                    title: '健康证不能为空',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }

            if ('' == this.certificatesList[0].picName && '' == this.certificatesList[0].url) {
                this.setData({
                    iscert: true
                });
            } else {
                if ('' == this.certificatesList[0].picName && '' != this.certificatesList[0].url) {
                    console.log(this.certificatesList);
                    uni.showToast({
                        title: '请补全厨师证件信息！',
                        icon: 'none',
                        duration: 3000
                    });
                    return false;
                }

                if ('' != this.certificatesList[0].picName && '' == this.certificatesList[0].url) {
                    console.log(this.certificatesList);
                    uni.showToast({
                        title: '请补全厨师证件信息！',
                        icon: 'none',
                        duration: 3000
                    });
                    return false;
                }

                console.log(this.iscert);
                console.log(this.certificatesList);
            }

            if (0 == this.photo.length) {
                this.setData({
                    isphoto: true
                });
            } else {
                console.log(this.isphoto);
                console.log(this.photo);
            }

            this.isnavigateTo();
        },

        isnavigateTo: function (t) {
            for (var e = '', a = 0; a < this.honorsList.length; a++) {
                if (a == this.honorsList.length - 1) {
                    e += this.honorsList[a].name;
                } else {
                    e += this.honorsList[a].name + ',';
                }
            }

            var i = {
                occupation: this.occupationState,
                num: this.num,
                styleDish: this.styleDish,
                resume: 'null' == this.resume ? '' : this.resume,
                choiceTime: this.choiceTime,
                healthyImg: this.healthy[0],
                certificatesList: this.certificatesList,
                honorsList: e,
                photo: this.photo
            };
            uni.setStorageSync('stepThree', i);
            var s = this.findChefDetail;
            console.log(s);
            var o = [];

            if ('string' == typeof uni.getStorageSync('stepOne')) {
                o.push(s.chefManageVo.provinceCode);
                o.push(s.chefManageVo.cityCode);
                o.push(s.chefManageVo.districtCode);
                console.log(o);
                this.setData({
                    stepOne: s.chefManageVo,
                    regionSelAll: o
                });
                console.log(this.stepOne);
            } else {
                this.setData({
                    stepOne: uni.getStorageSync('stepOne'),
                    regionSelAll: uni.getStorageSync('stepOne').domicileCode
                });
            }

            if ('string' == typeof uni.getStorageSync('stepTow')) {
                console.log(2);

                for (var n = [], c = 0; c < this.findChefDetail.foodPicList.length; c++) {
                    n.push(this.findChefDetail.foodPicList[c].url);
                }

                console.log(n);
                this.setData({
                    stepTow: n
                });
            } else {
                this.setData({
                    stepTow: uni.getStorageSync('stepTow')
                });
            }

            this.setData({
                stepThree: i
            });

            if (null != this.state && null != this.cookCode) {
                uni.navigateTo({
                    url: '../cookFive/cookFive?state=fail&cookcode=' + this.cookCode
                });
            } else {
                uni.navigateTo({
                    url: '../cookFive/cookFive'
                });
            }
        }
    }
};
</script>
<style>
page {
    background: #fff;
}

.show_text {
    opacity: 0;
    transition: all 0.5;
}

.text-box {
    margin-top: 30rpx;
    position: relative;
    text-align: right;
    width: 470rpx;
}

.text-box text {
    display: block;
    visibility: hidden;
}

.text-box .weui-textarea,
.text-box text {
    word-wrap: break-word;
    word-break: break-all;
}

.text-box .weui-textarea {
    height: 100%;
    left: 0;
    overflow-y: hidden;
    position: absolute;
    top: 0;
}

.wenzi1 {
    font-size: 30rpx;
}

.wenzi3 {
    color: #ca9f58;
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

.container {
    border-radius: 14rpx;
    box-shadow: 0rpx 0rpx 20rpx #e2e2e2;
    height: auto;
    margin: 50rpx auto 0rpx;
    overflow: hidden;
    padding-bottom: 30rpx;
    width: 690rpx;
}

.blue {
    background: #f5f9fc;
    height: 20rpx;
    width: 690rpx;
}

.title {
    color: #000;
    font-size: 36rpx;
    height: 40rpx;
    margin: 40rpx 20rpx 0;
    width: 650rpx;
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

.goodAt {
    height: auto;
    width: 690rpx;
}

.essential_picker {
    border-bottom: 1px solid #e5e5e5;
    height: 112rpx;
    margin: 0 20rpx;
    width: 650rpx;
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

.essential_none {
    border-bottom: none !important;
}

.essential_input {
    display: flex;
    margin: 0 20rpx;
    min-height: 112rpx;
    width: 650rpx;
}

.essential_input .view {
    color: #262626;
    float: left;
    font-size: 32rpx;
    height: 112rpx;
    line-height: 112rpx;
    width: 180rpx;
}

.essential_input input {
    color: #262626;
    float: right;
    font-size: 30rpx;
    height: 112rpx;
    padding-left: 15rpx;
    text-align: right;
    width: 470rpx;
}

.essential_input input::-webkit-input-placeholder {
    color: #999;
}

.essential_input input::placeholder {
    color: #999;
}

.essential_ster {
    border-bottom: 1px solid #e5e5e5;
    height: 112rpx;
    margin: 0 20rpx;
    width: 650rpx;
}

.essential_ster_left {
    color: #262626;
    float: left;
    font-size: 32rpx;
    height: 112rpx;
    line-height: 112rpx;
    width: auto;
}

.essential_ster_right {
    float: right;
    height: 42rpx;
    margin-top: 35rpx;
    width: 180rpx;
}

.essential_ster_right image {
    height: 42rpx;
    width: 42rpx;
}

.jian {
    float: left;
}

.essential_ster_right input {
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

.health {
    padding-bottom: 50rpx;
    width: 690rpx;
}

.health,
.health_con {
    height: auto;
    overflow: hidden;
}

.health_con {
    margin: 0rpx 0 0 20rpx;
    width: 280rpx;
}

.health_con image {
    float: left;
    height: 200rpx;
    width: 280rpx;
}

.health_con text {
    color: #999;
    float: left;
    font-size: 28rpx;
    margin-top: 20rpx;
    text-align: center;
    width: 280rpx;
}

.certificates {
    height: auto;
    overflow: hidden;
    width: 690rpx;
}

.blue_con {
    background: #f5f9fc;
    height: 10rpx;
    margin: 0 20rpx;
    width: 650rpx;
}

.certificates_con {
    height: auto;
    margin: 0 20rpx;
    overflow: hidden;
    width: 650rpx;
}

.certificates_con_left {
    float: left;
    height: 100%;
    overflow: hidden;
    width: 62rpx;
}

.certificates_con_left image {
    float: left;
    height: 42rpx;
    margin-top: 90rpx;
    width: 42rpx;
}

.certificates_con_right {
    float: right;
    height: auto;
    overflow: hidden;
    width: 588rpx;
}

.certificates_con_right_ry {
    border-bottom: 1px solid #e5e5e5;
    float: right;
    height: 112rpx;
    width: 588rpx;
}

.certificates_con_right_ry view {
    color: #262626;
    float: left;
    font-size: 32rpx;
    height: 112rpx;
    line-height: 112rpx;
    width: 150rpx;
}

.certificates_con_right_ry input {
    color: #262626;
    float: right;
    font-size: 30rpx;
    height: 112rpx;
    text-align: right;
    width: 438rpx;
}

.certificates_con_right_zj {
    float: right;
    height: 166rpx;
    width: 588rpx;
}

.certificates_con_right_zj_left {
    color: #262626;
    float: left;
    font-size: 32rpx;
    height: 166rpx;
    line-height: 166rpx;
}

.certificates_con_right_zj_right {
    color: #b2b2b2;
    float: right;
    font-size: 30rpx;
    height: 166rpx;
    line-height: 166rpx;
    text-align: right;
    width: 150rpx;
}

.certificates_con_right_zj_right1 {
    float: right;
    height: 100rpx;
    margin-right: 20rpx;
    margin-top: 32rpx;
    position: relative;
    width: 140rpx;
}

.zhu_zj {
    border-radius: 16rpx;
    height: 100rpx;
    left: 0rpx;
    top: 0rpx;
    width: 140rpx;
}

.guan_zj,
.zhu_zj {
    position: absolute;
}

.guan_zj {
    height: 30rpx;
    right: -12rpx;
    top: -12rpx;
    width: 30rpx;
    z-index: 10;
}

.honors {
    height: auto;
    overflow: hidden;
    padding-bottom: 50rpx;
    width: 690rpx;
}

.honors_con {
    border-bottom: 1px solid #e5e5e5;
    height: 112rpx;
    margin: 0 20rpx;
    width: 650rpx;
}

.honors_none {
    border-bottom: none !important;
}

.honors_con_left {
    float: left;
    height: 100%;
    overflow: hidden;
    width: 62rpx;
}

.honors_con_left image {
    float: left;
    height: 42rpx;
    margin-top: 36rpx;
    width: 42rpx;
}

.honors_con_right {
    float: right;
    height: 112rpx;
    width: 588rpx;
}

.honors_con_right view {
    color: #262626;
    float: left;
    font-size: 32rpx;
    height: 112rpx;
    line-height: 112rpx;
    width: 150rpx;
}

.honors_con_right input {
    color: #262626;
    float: right;
    font-size: 30rpx;
    height: 112rpx;
    text-align: right;
    width: 438rpx;
}

.honors_con_right input::-webkit-input-placeholder {
    color: #999;
}

.honors_con_right input::placeholder {
    color: #999;
}

.newly {
    border: 1rpx solid #ca9f58;
    border-radius: 14rpx;
    color: #ca9f58;
    font-size: 30rpx;
    height: 86rpx;
    line-height: 86rpx;
    margin: 30rpx 20rpx 0;
    text-align: center;
    width: 648rpx;
}

.photo {
    height: auto;
    overflow: hidden;
    padding-bottom: 30rpx;
    width: 690rpx;
}

.photo_con {
    height: 122rpx;
    margin: 50rpx 20rpx 0;
    overflow: hidden;
    width: 650rpx;
}

.photo_con image {
    float: left;
    height: 122rpx;
    margin-right: 20rpx;
    width: 122rpx;
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
    width: 650rpx;
}

.voucher_con_img {
    float: left;
    margin-bottom: 40rpx;
    margin-right: 20rpx;
    position: relative;
}

.voucher_con_img,
.zhu {
    height: 210rpx;
    width: 314rpx;
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
    width: 480rpx;
}

.isrecom {
    float: left;
    margin-top: 28rpx;
}

.mackFix_left view {
    color: #262626;
    float: right;
    font-size: 26rpx;
    height: auto;
    margin-top: 16rpx;
    width: 420rpx;
}

.mackFix_left view text {
    color: #429ce8;
}

.mackFix_right {
    float: right;
    height: 97rpx;
    margin-right: 30rpx;
    width: auto;
}

.mackFix_right1 {
    background: #ca9f58;
    color: #fff;
    float: right;
    height: 68rpx;
    line-height: 68rpx;
    margin-top: 15rpx;
    width: 150rpx;
}

.mackFix_right1,
.mackFix_right2 {
    border-radius: 14rpx;
    font-size: 28rpx;
    text-align: center;
}

.mackFix_right2 {
    border: 1rpx solid #666;
    color: #262626;
    float: left;
    height: 66rpx;
    line-height: 66rpx;
    margin: 15rpx 20rpx 0;
    width: 148rpx;
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
