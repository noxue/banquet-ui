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
            <view style="height: 84px; position: relative">
                <view class="title">是否能提供配套用具</view>
                <checkbox-group @change="bindSupportTools" style="display: flex">
                    <label class="weui-cell weui-check__label choice" v-for="(item, index) in chefTools" :key="index">
                        <view class="weui-cell__hd">
                            <checkbox :checked="item.checked" color="#fff" :value="item.dictLabel" v-if="item.dictLabel"></checkbox>
                        </view>

                        <view class="weui-cell__bd">{{ item.dictValue }}</view>
                    </label>
                </checkbox-group>
            </view>
            <view>
                <view class="title" style="border-top: 1rpx solid #e5e5e5">
                    <text class="mihao">✲</text>
                    是否能提供服务员
                </view>
                <view style="display: flex">
                    <radio-group @change="bindWaiter" v-for="(item, index) in supportWaiterList" :key="index">
                        <label class="weui-cell weui-check__label choice">
                            <view class="weui-cell__hd">
                                <radio :checked="item.checked" color="#ca9f58" :data-index="index" :value="item.value"></radio>
                            </view>
                            <view class="weui-cell__bd">{{ item.name }}</view>
                        </label>
                    </radio-group>
                </view>
                <view class="essential_input" v-if="supportWaiter == 'Y'">
                    <view class="view">服务员价格</view>
                    <view class="text-box">
                        <text>{{ waiterPrice }}</text>
                        <textarea
                            @input="gettWaiterPrice"
                            class="weui-textarea"
                            maxlength="-1"
                            placeholder="请输入服务员价格"
                            type="number"
                            :value="waiterPrice"
                            v-if="!guarantee"
                        ></textarea>
                    </view>
                </view>
            </view>
            <view>
                <view class="title" style="border-top: 1rpx solid #e5e5e5">
                    <text class="mihao">✲</text>
                    是否能提供发票
                </view>
                <view style="display: flex">
                    <radio-group @change="bindInvoice" v-for="(item, index) in supportInvoiceList" :key="index">
                        <label class="weui-cell weui-check__label choice">
                            <view class="weui-cell__hd">
                                <radio :checked="item.checked" color="#ca9f58" :value="item.value"></radio>
                            </view>
                            <view class="weui-cell__bd">{{ item.name }}</view>
                        </label>
                    </radio-group>
                </view>
                <view class="essential_input" v-if="supportInvoice == 'Y'">
                    <view class="view">税点</view>
                    <view class="text-box">
                        <text>{{ invoicePoint }}</text>
                        <textarea
                            @focus="bindFocusInvoicePoint"
                            @input="getInvoicePoint"
                            class="weui-textarea"
                            maxlength="-1"
                            placeholder="请输入税点 例如：7"
                            type="number"
                            :value="invoicePoint"
                            v-if="!guarantee"
                        ></textarea>
                    </view>
                </view>
            </view>
            <view>
                <view class="title" style="border-top: 1rpx solid #e5e5e5">
                    <text class="mihao">✲</text>
                    是否已接种疫苗
                </view>
                <view style="display: flex">
                    <radio-group @change="bindGetVaccinated" style="display: flex" v-for="(item, index) in getVaccinatedList" :key="index">
                        <label class="weui-cell weui-check__label choice">
                            <view class="weui-cell__hd">
                                <radio :checked="item.checked" color="#ca9f58" :value="item.value"></radio>
                            </view>
                            <view class="weui-cell__bd">{{ item.name }}</view>
                        </label>
                    </radio-group>
                </view>
            </view>
        </view>
        <view :style="'width:750rpx;height:150rpx;padding-bottom:' + paddingBottom + 'px;'"></view>
        <view class="mackFix" :style="'padding-bottom:' + paddingBottom + 'px;'">
            <view class="mackFix_left">
                <label @tap.stop.prevent="recommend" class="isrecom">
                    <radio :checked="checked" color="#ca9f58"></radio>
                </label>
                <view>
                    我已阅读并承诺遵守
                    <text @tap.stop.prevent="cookAgreement">《51厨师商家协议》</text>
                </view>
            </view>
            <view class="mackFix_right">
                <view @tap="next" class="mackFix_right1">下一步</view>
            </view>
        </view>
        <view class="guarantee" v-if="guarantee">
            <view class="guarantee_bj"></view>
            <view class="guarantee_con">
                <image @tap="xuzhi" class="quxiao" src="https://cookwaptest.5156dujia.com/img/quxioa.png"></image>
                <view class="guarantee_con_title">51厨师商家协议</view>
                <view class="guarantee_con_text">
                    <text>鉴于</text>
                    <text>
                        51厨师平台与商家就提供厨师上门烹饪服务进行合作，根据《中华人民共和国合同法》及相关法律法规之规定，双方遵循诚实信用、平等自愿、互惠互利的原则，经友好协商，达成如下协议：
                    </text>
                    <text class="biaoti">一、定义</text>
                    <text>
                        1、51厨师平台：由杭州鲲鹏网络技术有限公司开发、运营和管理的网络交易平台（包括网站、小程序、app，以下简称平台），为用户和商家进行厨师上门烹饪服务提供网络信息展示、交易撮合、服务过程监控、结果评价、支付结算、投诉解决等服务。
                    </text>
                    <text>
                        2、商家：拥有各式专业菜肴烹饪技能的自然人、法人或其他组织，具备提供厨师上门烹饪服务的资质、条件，并自愿提交注册资料并通过平台审核，登录平台发布其可提供的商品/服务信息，供用户选择并与之达成交易，为用户提供厨师上门烹饪服务。
                    </text>
                    <text>3、用户：有意请专业厨师提供上门烹饪服务的自然人、法人或其他组织，自愿通过平台选择、预约商家为其提供厨师上门烹饪服务。</text>
                    <text>4、厨师上门烹饪服务：入驻平台的商家按照与用户达成的订单要求，为平台用户提供厨师上门烹饪服务，以下简称上门服务。</text>
                    <text>5、订单：平台用户和入驻平台的商家达成厨师上门服务交易的订单，即为用户和商家就上述交易订立的合同。</text>
                    <text class="biaoti">二、商家注册</text>
                    <text>
                        1、商家入驻平台，须提交注册资料并通过平台审核，提交的资料包括基础资料（个人：身份证、常住地、年龄、健康证等；法人：营业执照、注册地址/营业地址、法定代表人身份证、餐饮服务许可证/食品经营许可证等）、服务内容（菜系、菜品等）、其他资料（职业资格证书、获奖荣誉证书等）；平台将对商家提交的资料进行规范性审核。
                    </text>
                    <text>
                        2、商家对其提交资料的真实性、有效性进行承诺，如由此导致用户投诉或相关部门的处罚，商家承担全部责任；如由此导致平台承担连带责任，商家须对平台因此遭受的损失承担赔偿责任。
                    </text>
                    <text>3、商家通过审核后，即获得平台商家账户和密码，商家须登录商家账户自行上传其所提供的上门服务的具体内容。</text>
                    <text class="biaoti">三、商家服务</text>
                    <text>1、商家在平台上传其提供的上门服务内容，供用户浏览与选择，用户通过平台预约商家，商家确认后生成订单，即视为交易达成。</text>
                    <text>2、订单生成后，商家须按订单约定的时间和地点提供上门服务。</text>
                    <text>3、商家按订单约定的时间至用户指定地点提供服务完毕，通过平台提交服务完毕信息，即视为服务完成。</text>
                    <text>4、商家服务完成后，用户通过平台确认服务完毕；或用户在商家服务完成后24小时内未通过平台确认服务完毕，则平台默认为商家服务完成。</text>
                    <text>5、平台确认商家服务完成后，即将用户支付的服务费在扣除平台信息服务费后付至商家在平台的账户，商家可在到账7天后申请提现。</text>
                    <text class="biaoti">四、上门服务规则和标准流程</text>
                    <text>1、平台制定上门服务的规则和标准流程，并对入驻平台的商家进行培训。</text>
                    <text>2、平台对商家进行的上述培训，可以是线下培训也可能是线上视频培训。</text>
                    <text>3、商家必须完成上述培训，并通过平台组织的考核（如有），否则平台可不予通过注册申请或下架商家服务。</text>
                    <text>4、商家在为平台用户提供上门服务时，必须遵循上述服务规则和标准流程。</text>
                    <text>5、上门服务规则和标准流程详见附件。</text>
                    <text>6、商家接单后取消订单，按如下规则操作：</text>
                    <text>（1）商家接单后，如因客观原因无法按订单约定提供上门服务，须及时与平台联系，由平台与用户协商安排替代商家。</text>
                    <text>
                        （2）商家接单后，因客观原因无法按订单约定提供上门服务，如用户同意，并且平台在用户要求时间内为用户寻找到替代商家上门，则平台收取商家履约保证金的20%作为协调服务费；如平台未能在用户要求时间内为用户安排合适替代商家上门服务，则平台扣除商家履约保证金，作为违约金支付给用户，平台不向商家收取协调服务费。
                    </text>
                    <text>
                        （3）履约保证金金额为商家接单金额，由商家在接单时刷信用卡预授权预付，在商家确认结束服务后，即退回给商家；如果商家未在接单时刷预售权，则平台将从商家账户余额里扣款，如商家账户余额不足，商家须及时补足扣款金额，否则无法继续接单。
                    </text>
                    <text class="biaoti">五、商家权利与义务</text>
                    <text>1、商家通过平台与用户达成交易，须按订单要求提供上门服务。</text>
                    <text>2、商家在提供上门服务过程中，须遵循平台制定的服务规则和标准流程，并无条件接受平台采取的过程监控措施。</text>
                    <text>3、商家按订单要求提供上门服务，有权获得用户支付的服务费。</text>
                    <text>4、商家须向平台为其和用户之间提供的网络交易服务支付信息服务费，该等信息服务费由平台在用户支付给商家的服务费中扣除。</text>
                    <text>
                        5、如用户要求提供发票，则商家应按实际收到的金额（平台扣除信息服务费后的金额）向用户开具发票（餐饮费发票或劳务服务发票）；商家向平台支付的信息服务费金额由平台向用户开具发票（信息服务费发票）。
                    </text>
                    <text class="biaoti">六、平台权利与义务</text>
                    <text>
                        1、平台为商家和用户通过本平台进行厨师上门烹饪服务交易提交网络交易服务，并在交易达成后收取信息服务费；平台收取信息服务费的标准将通过平台商家端发布通知。
                    </text>
                    <text>2、为有效保障服务品质及维护商家和用户双方权利，平台有权在商家上门服务过程中采取必要的监控措施，对此商家无条件接受。</text>
                    <text>3、为解决商家与用户在交易过程中可能产生的纠纷和投诉，平台为此组织专门的客服部门提供人工客服服务。</text>
                    <text>4、平台收取的信息服务费，由平台在用户支付的服务费中按约定比例扣留。</text>
                    <text>5、如用户要求开发票，平台向用户开具收取的信息服务费金额的发票（信息服务费发票），剩余部分由商家向用户开具（餐饮费发票或劳务服务发票）</text>
                    <text class="biaoti">七、特别声明</text>
                    <text>
                        商家未通过平台与用户之间进行的交易不属于本平台上门服务交易，平台对不属于本平台上门服务交易的交易事项不承担任何责任，商家不得因其与用户之间因此类交易发生的任何争议要求平台承担任何责任。不属于平台上门服务交易的情况具体包括：
                    </text>
                    <text>（1）商家与平台用户未通过本平台成立订单；</text>
                    <text>（2）商家与用户通过本平台成立订单，但私下修改订单（如增加服务内容等）并私下支付相应价款；</text>
                    <text>（3）用户与商家私下协商委托购买食材，商家接受用户委托代为购买食材（套餐除外）。</text>
                    <text class="biaoti">八、知识产权</text>
                    <text>
                        1、商家承诺其上传的上门服务内容（包括菜系/菜品的名称、图片、文字描述等）不存在知识产权侵权问题；如其上传内容存在知识产权侵权问题，并由此导致版权所有人的起诉、司法部门的裁决或相关部门的处罚，商家承担全部责任；如由此导致平台承担连带责任，商家须对平台因此遭受的损失承担赔偿责任。
                    </text>
                    <text>
                        2、平台所包含的全部知识成果包括但不限于所有网络工具（网站、小程序、app）的数据库、设计、文字和图表、图片、音像、音乐、声音及其前述组合，软件编程、相关源代码的知识产权权利均归平台所有。商家不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。
                    </text>
                    <text>3、平台名称（51厨师）中包含的所有权利 (包括商誉和商标) 均归平台所有，商家不得侵害平台的商誉和商标。</text>
                    <text class="biaoti">九、不可抗力</text>
                    <text>
                        以下情况属于不可抗力：信息网络设备维护/信息网络连接故障、电脑/通讯或其他系统的故障、电力故障、罢工/暴乱/骚乱、爆发性流行病/瘟疫、火灾、地震、洪水/台风等极端气候、战争、政府管制行为、司法行政机关的命令、其他不可抗力或第三方的不作为，由此而造成的不能服务或延迟服务，平台和商家均不承担责任。
                    </text>
                    <text class="biaoti">十、变更与终止</text>
                    <text>1、协议的变更</text>
                    <text>
                        平台有权随时对本协议内容或发布的其他服务规范及操作流程的内容进行变更，在平台（网站、小程序、app）发布后立即生效；如商家继续使用平台提供的服务即视为同意该等内容变更，如商家不同意变更后的内容则商家有权注销平台商家账户、停止使用平台服务。
                    </text>
                    <text>2、协议的终止</text>
                    <text>（1）平台有权依据本协议约定注销商家的平台账号，本协议于账号注销之日终止。</text>
                    <text>（2）平台有权依据本协议约定终止全部平台服务，本协议于平台全部服务终止之日终止。</text>
                    <text>（3）商家有权根据自己决定停止在平台上提供上门服务，向平台提出注销账号的申请，平台审核通过后即予以注销。</text>
                    <text>
                        3、本协议终止后，商家无权要求平台继续向其提供任何服务或履行任何其他义务，包括但不限于要求平台为商家保留或披露其原平台账号中的任何信息，向商家或第三方转发任何其未曾阅读或发送过的信息等。
                    </text>
                    <text>4、本协议的终止不影响守约方向违约方追究违约责任。</text>
                    <text class="biaoti">十一、违约责任</text>
                    <text>1、平台或商家违反本协议的约定即构成违约，违约方应当向守约方承担违约责任。</text>
                    <text>
                        2、如因商家提供的信息资料不真实、不完整或不准确给用户造成损失的，商家负责承担全部责任；如由此给平台造成损失的，平台有权要求商家对平台进行损失的赔偿。
                    </text>
                    <text>
                        3、如因商家违反法律法规规定或本协议约定，利用平台从事非法活动的，平台有权立即终止继续对其提供平台服务，注销其账号，并要求其赔偿由此给平台造成的损失。
                    </text>
                    <text>4、如商家以虚构事实等方式恶意诋毁平台的商誉，平台有权要求商家向平台公开道歉，赔偿其给平台造成的损失，并有权终止对其提供平台服务。</text>
                    <text class="biaoti">十二、争议解决</text>
                    <text>商家与平台因本协议的履行发生争议的应通过友好协商解决，协商解决不成的，任一方有权将争议提交平台所在地有管辖权的法院进行处理。</text>
                    <text class="biaoti">十三、协议生效</text>
                    <text>本协议于商家提交注册资料、通过平台审核、完成注册程序，获得平台商家账号和密码时生效，对平台和商家均具有约束力。</text>
                    <text>平台方：杭州鲲鹏网络技术有限公司</text>
                    <text></text>
                    <text>商家：</text>
                    <text></text>
                    <text>日期：</text>
                    <text></text>
                </view>
                <view @tap="xieyi" class="guarantee_con_anniu" v-if="rantee == true">
                    <view>我已阅读并遵守</view>
                </view>
                <view class="guarantee_con_anniu_hui" v-if="rantee != true">
                    <view>
                        我已阅读并遵守（
                        <text>{{ timeshu }}s</text>
                        ）
                    </view>
                </view>
            </view>
        </view>
    </block>
</template>

<script>
var t = require('../../@babel/runtime/helpers/typeof');

var app = getApp();

var a = require('../../utils/apiCook.js');

require('../../utils/imgUpload.js');

export default {
    data() {
        return {
            a: '1',
            b: 2,
            getVaccinatedList: [
                {
                    value: 'Y',
                    name: '是',
                    checked: false
                },
                {
                    value: 'N',
                    name: '否',
                    checked: false
                }
            ],
            supportWaiterList: [
                {
                    value: 'Y',
                    name: '是',
                    checked: false
                },
                {
                    value: 'N',
                    name: '否',
                    checked: false
                }
            ],
            supportInvoiceList: [
                {
                    value: 'Y',
                    name: '是',
                    checked: false
                },
                {
                    value: 'N',
                    name: '否',
                    checked: false
                }
            ],
            id: '',
            chefTools: '',
            invoicePoint: '',
            waiterPrice: '',
            supportWaiter: '',
            getVaccinated: '',
            supportInvoice: '',
            supportTools: [],
            findChefDetail: '',
            token: '',
            regionSelAll: [],
            stepOne: [],
            stepTow: [],
            stepThree: [],
            stepFour: [],
            state: '',
            cookCode: '',
            checked: false,
            paddingBottom: 0,
            guarantee: false,
            timeshu: 6,
            rantee: false
        };
    },
    onLoad: function (t) {
        this.setData({
            cookCode: t.cookcode,
            paddingBottom: app.globalData.paddingBottom,
            state: t.state
        });
        console.log(t);
        this.getQiniuToken();
        this.getDictType();

        if (null != this.state && null != this.cookCode) {
            this.findChefDetailFun();
        }
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        getQiniuToken: function () {
            var that = this;
            a.requestApi('/common/getQiniuToken', {}, 'POST', true, function (e) {
                that.setData({
                    token: e.data.data
                });
            });
        },

        findChefDetailFun: function (t) {
            var that = this;
            var o = {
                cookCode: that.cookCode
            };
            a.requestApi('/chefInfo/service/findChefDetail', o, 'POST', true, function (t) {
                console.log('查询申请厨师详情信息', t.data.data);
                var a = t.data.data.chefManageVo.chefTags;
                console.log(a);
                console.log(t.data.data);
                that.setData({
                    findChefDetail: t.data.data,
                    id: t.data.data.chefManageVo.id
                });

                if ('' != a.supportTools) {
                    uni.setStorageSync('supportTools', a.supportTools.split(','));
                }

                if ('' == a.supportTools) {
                    uni.setStorageSync('supportTools', []);
                }

                if (a.id && a.cookCode) {
                    that.setData({
                        invoicePoint: a.invoicePoint,
                        waiterPrice: a.waiterPrice,
                        supportWaiter: a.supportWaiter,
                        getVaccinated: a.getVaccinated,
                        supportInvoice: a.supportInvoice
                    });
                }

                if ('' != a.supportTools) {
                    that.setData({
                        supportTools: a.supportTools.split(',')
                    });
                }

                if ('N' == a.supportWaiter) {
                    that.setData({
                        waiterPrice: ''
                    });
                }

                if ('N' == a.supportInvoice) {
                    that.setData({
                        invoicePoint: ''
                    });
                }

                setTimeout(function () {
                    var t = that.chefTools ? that.chefTools : uni.getStorageSync('chefTools');
                    var a = that.supportTools ? that.supportTools : uni.getStorageSync('supportTools');
                    if (a) {
                        if (0 == a.length) {
                            for (var o = 0, i = t.length; o < i; ++o) {
                                t[o].checked = false;
                            }
                        } else {
                            for (var s = 0, n = t.length; s < n; ++s) {
                                t[s].checked = false;

                                for (var c = 0, d = a.length; c < d; ++c) {
                                    if (t[s].dictLabel == a[c]) {
                                        t[s].checked = true;
                                    }
                                }
                            }
                        }
                    }

                    that.setData({
                        chefTools: t
                    });
                }, 200);
                for (var o = that.supportWaiterList, i = 0, s = o.length; i < s; ++i) {
                    o[i].checked = o[i].value == that.supportWaiter;
                }

                for (var n = that.supportInvoiceList, c = 0, d = n.length; c < d; ++c) {
                    n[c].checked = n[c].value == that.supportInvoice;
                }

                for (var r = that.getVaccinatedList, h = 0, l = r.length; h < l; ++h) {
                    r[h].checked = r[h].value == that.getVaccinated;
                }

                that.setData({
                    supportWaiterList: o,
                    supportInvoiceList: n,
                    getVaccinatedList: r
                });
                console.log('items', that.chefTools);
                console.log('supportWaiterList', that.supportWaiterList);
                console.log('supportInvoiceList', that.supportInvoiceList);
                console.log('getVaccinatedList', that.getVaccinatedList);
                uni.hideLoading();
            });
        },

        bindFocusInvoicePoint: function (t) {
            console.log(t.detail);
        },

        bindWaiter: function (t) {
            console.log(t.detail);
            this.setData({
                supportWaiter: t.detail.value
            });

            if ('N' == t.detail.value) {
                this.setData({
                    supportWaiterList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: false
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: true
                        }
                    ],
                    waiterPrice: ''
                });
            }

            if ('Y' == t.detail.value) {
                this.setData({
                    supportWaiterList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: true
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: false
                        }
                    ]
                });
            }
        },

        bindInvoice: function (t) {
            this.setData({
                supportInvoice: t.detail.value
            });

            if ('N' == t.detail.value) {
                this.setData({
                    supportInvoiceList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: false
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: true
                        }
                    ],
                    invoicePoint: ''
                });
            }

            if ('Y' == t.detail.value) {
                this.setData({
                    supportInvoiceList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: true
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: false
                        }
                    ]
                });
            }

            console.log(this.supportInvoice);
        },

        bindGetVaccinated: function (t) {
            this.setData({
                getVaccinated: t.detail.value
            });

            if ('N' == t.detail.value) {
                this.setData({
                    getVaccinatedList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: false
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: true
                        }
                    ]
                });
            }

            if ('Y' == t.detail.value) {
                this.setData({
                    getVaccinatedList: [
                        {
                            value: 'Y',
                            name: '是',
                            checked: true
                        },
                        {
                            value: 'N',
                            name: '否',
                            checked: false
                        }
                    ]
                });
            }

            console.log(this.getVaccinated);
        },

        bindSupportTools: function (t) {
            console.log(t.detail.value);
            t.detail.value;
            var e = t.detail.value;
            e.forEach(function (t, e) {
                console.log(t);
            });
            uni.setStorageSync('supportTools', e);
            this.setData({
                supportTools: e
            });
        },

        getInvoicePoint: function (t) {
            this.setData({
                invoicePoint: t.detail.value
            });
            console.log(this.invoicePoint);
        },

        gettWaiterPrice: function (t) {
            this.setData({
                waiterPrice: t.detail.value
            });
            console.log(this.waiterPrice);
        },

        getDictType: function () {
            var that = this;
            a.requestApi(
                '/common/dictType',
                {
                    dictType: 'CHEF_SUPPORT_TOOLS'
                },
                'POST',
                true,
                function (e) {
                    console.log(e.data.data);
                    that.setData({
                        chefTools: e.data.data
                    });
                    uni.setStorageSync('chefTools', that.chefTools);
                }
            );
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

        xieyi: function (t) {
            this.setData({
                guarantee: false,
                rantee: false
            });
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

        cookAgreement: function (t) {
            uni.navigateTo({
                url: '../cookAgreement/cookAgreement'
            });
        },

        next: function () {
            var t = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
            return '' == this.supportWaiter
                ? (uni.showToast({
                      title: '请选择是否能提供服务员',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : 'Y' == this.supportWaiter && 0 == t.test(this.waiterPrice)
                ? (uni.showToast({
                      title: '请输入正确的服务员价格',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : '' == this.supportInvoice
                ? (uni.showToast({
                      title: '请选择是否能提供发票',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : 'Y' == this.supportInvoice && 0 == t.test(this.invoicePoint)
                ? (uni.showToast({
                      title: '请输入正确的税点',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : '' == this.getVaccinated
                ? (uni.showToast({
                      title: '请选择是否已接种疫苗',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : false === this.checked
                ? (uni.showToast({
                      title: '请同意51厨师商家协议',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                  }),
                  false)
                : void this.isnavigateTo();
        },

        isnavigateTo: function (e) {
            var a = [];
            var o = {
                invoicePoint: 'N' == this.supportInvoice ? '' : this.invoicePoint,
                waiterPrice: 'N' == this.supportWaiter ? '' : this.waiterPrice,
                supportWaiter: this.supportWaiter,
                getVaccinated: this.getVaccinated,
                supportInvoice: this.supportInvoice,
                supportTools: this.supportTools
            };
            this.setData({
                stepFour: o
            });
            console.log(this);
            console.log(this.findChefDetail);
            uni.setStorageSync('stepFour', o);
            var i = this.findChefDetail;
            console.log(t(uni.getStorageSync('stepOne')));
            console.log(i);

            if ('string' == typeof uni.getStorageSync('stepOne')) {
                console.log('里面的', i);
                a.push(i.chefManageVo.provinceCode);
                a.push(i.chefManageVo.cityCode);
                a.push(i.chefManageVo.districtCode);
                console.log(a);
                this.setData({
                    stepOne: i.chefManageVo,
                    regionSelAll: a
                });
            } else {
                this.setData({
                    stepOne: uni.getStorageSync('stepOne'),
                    regionSelAll: uni.getStorageSync('stepOne').domicileCode
                });
            }

            if ('string' == typeof uni.getStorageSync('stepTow')) {
                for (var s = [], n = 0; n < this.findChefDetail.foodPicList.length; n++) {
                    s.push(this.findChefDetail.foodPicList[n].url);
                }

                console.log(s);
                this.setData({
                    stepTow: s
                });
            } else {
                this.setData({
                    stepTow: uni.getStorageSync('stepTow')
                });
            }

            this.setData({
                stepThree: uni.getStorageSync('stepThree')
            });
            this.addChefInfo();
        },

        addChefInfo: function (e) {
            var o = 0;
            uni.showLoading({
                title: '正在加载...',
                mask: true
            });
            var i = this.stepFour;
            i.supportTools = i.supportTools.toString();
            console.log(t(i.supportTools));
            var s = {
                name: this.stepOne.name,
                flowerName: this.stepOne.flowerName,
                sex: this.stepOne.sex,
                cuisine: this.stepThree.styleDish,
                maritalStatus: this.stepOne.maritalStatus,
                telephone: this.stepOne.telephone,
                domicileCode: this.regionSelAll,
                addressId: this.stepOne.addressId,
                frontImg: this.stepOne.frontImg,
                reverseImg: this.stepOne.reverseImg,
                residencePermit: this.stepOne.residencePermit,
                mainPic: this.stepOne.mainPic,
                foodPicList: this.stepTow,
                jobStatus: this.stepThree.occupation,
                cookAge: this.stepThree.num,
                resume: 'null' == this.stepThree.resume ? '' : this.stepThree.resume,
                expirationTime: this.stepThree.choiceTime,
                healthCertificy: this.stepThree.healthyImg,
                chefPicVoList: JSON.stringify(this.stepThree.certificatesList),
                honorReceived: this.stepThree.honorsList,
                honorPicList: this.stepThree.photo,
                id: 'fail' == this.state ? this.id : '',
                cookCode: '' == this.cookCode ? '' : this.cookCode,
                chefTagsStr: JSON.stringify(i)
            };
            console.log('addChefInfo', s);
            console.log('addChefInfo', i);

            if (0 === o) {
                a.requestApi('/chefInfo/service/addChefInfo', s, 'POST', true, function (t) {
                    console.log(t);
                    o++;

                    if (200 == t.data.code) {
                        o = 0;
                        uni.hideLoading();
                        uni.reLaunch({
                            url: '../cookFour/cookFour?cookcode=' + t.data.msg
                        });
                    }
                });
            }
        }
    }
};
</script>
<style>
.step,
page {
    background: #fff;
}

.step {
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
    color: #999;
    color: #ca9f58;
    left: -46rpx;
    left: -32rpx;
    width: 122rpx;
}

.wenzi3,
.wenzi4 {
    font-size: 30rpx;
    font-size: 22rpx;
    height: auto !important;
    position: absolute;
    top: 66rpx;
}

.wenzi4 {
    color: #999;
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

.wx-checkbox-input.wx-checkbox-input-checked {
    background: #ca9f58;
    border: 1px solid transparent;
    color: #fff;
}

.title {
    color: #000;
    font-size: 32rpx;
    height: 40rpx;
    margin: 0rpx 20rpx 0;
    padding-top: 20rpx;
}

.title .mihao {
    color: #c91212;
    float: left;
    line-height: 40rpx;
    margin-right: 10rpx;
    width: auto;
}

.choice {
    color: #262626;
    font-size: 28rpx;
}

.choice,
.weui-check__label {
    -webkit-tap-highlight-color: none;
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

.guarantee {
    left: 0rpx;
    position: fixed;
    top: 0rpx;
    z-index: 999;
}

.guarantee,
.guarantee_bj {
    height: 100vh;
    width: 750rpx;
}

.guarantee_bj {
    background: #000;
    opacity: 0.5;
}

.guarantee_con {
    background: #fff;
    border-radius: 14rpx;
    height: 1000rpx;
    left: 70rpx;
    position: fixed;
    top: 60rpx;
    width: 610rpx;
    z-index: 9991;
}

.guarantee_con_title {
    color: #000;
    font-size: 38rpx;
    height: auto;
    margin-top: 50rpx;
    text-align: center;
    width: 610rpx;
}

.guarantee_con_text {
    height: 726rpx;
    margin: 32rpx 0 0 20rpx;
    overflow-y: scroll;
    width: 570rpx;
}

.guarantee_con_text text {
    color: #333;
    display: inline-block;
    font-size: 28rpx;
    line-height: 46rpx;
    text-align: justify;
    width: 570rpx;
}

.biaoti {
    font-size: 32rpx;
}

.guarantee_con_anniu {
    border-top: 1px solid #e7e7e7;
    height: 148rpx;
    width: 610rpx;
}

.guarantee_con_anniu view {
    background: #ca9f58;
    border-radius: 14rpx;
    color: #fff;
    height: 88rpx;
    line-height: 88rpx;
    margin: 30rpx 0 0 20rpx;
    text-align: center;
    width: 570rpx;
}

.guarantee_con_anniu_hui {
    border-top: 1px solid #e7e7e7;
    height: 148rpx;
    width: 610rpx;
}

.guarantee_con_anniu_hui view {
    background: #c7c7c7;
    border-radius: 14rpx;
    color: #fff;
    height: 88rpx;
    line-height: 88rpx;
    margin: 30rpx 0 0 20rpx;
    text-align: center;
    width: 570rpx;
}

.quxiao {
    height: 30rpx;
    position: fixed;
    right: 90rpx;
    top: 76rpx;
    width: 30rpx;
    z-index: 9991;
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
</style>
