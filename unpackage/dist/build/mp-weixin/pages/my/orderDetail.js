(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/orderDetail"],{7325:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=[]},9210:function(t,e,n){"use strict";(function(t){n("cd49");a(n("66fd"));var e=a(n("a4b4"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},a4b4:function(t,e,n){"use strict";n.r(e);var a=n("7325"),r=n("f421");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("ec3b");var o,u=n("f0c5"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=s.exports},ba30:function(t,e,n){},db06:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("e032"));function r(t){return t&&t.__esModule?t:{default:t}}var i=getApp(),u={mixins:[a.default],data:function(){return{orderId:null,downTimes:0,timerSign:null,orderDetail:{status:0,status_text:{name:"",title:""},name:"",phone:"",area:"",community:"",door_number:"",kitchener:{head_small:"",name:!1},package_name:"",pay_price:"",date:"",parti_item:{first_img:""},pay_status:0,pay_method:0,pay_type:0,package_price:"",coupon:{discount:""}}}},onLoad:function(t){this.orderId=t.id},onShow:function(){this.getDetail()},onPullDownRefresh:function(){this.getDetail()},methods:{getDetail:function(t){var e=this;this.$api.user.orderDetail.request({orderId:this.orderId}).then((function(t){e.orderDetail=t,e.downTime(t.downtime)}))},cancelOrderTap:function(t){console.log("取消订单");var e=this;this.orderCancel(this.orderId,(function(){i.globalData.showToast("取消成功","success"),e.getDetail(e.orderId)}))},downTime:function(t){if(this.timerSign&&(clearInterval(timerSign),this.timerSign=null),0!=t){var e=t,n=this;this.timerSign=setInterval((function(){e--,console.log(e),0==e&&(clearInterval(o),n.cancelOrderPost(),n.setData({downTimes:0})),parseInt(e/60/60/24);var t=parseInt(e/60/60%24),a=parseInt(e/60%60),r=parseInt(e%60);t<10&&(t="0"+t),a<10&&(a="0"+a),r<10&&(r="0"+r),n.setData({downTimes:a+"分钟"+r+"秒"})}),1e3)}},toPayTap:function(){t.navigateTo({url:"/pages/order/pay?id="+this.orderId})},jumpOrderStatus:function(){t.navigateTo({url:"/pages/my/orderStatus?id="+this.orderId})}}};e.default=u}).call(this,n("543d")["default"])},ec3b:function(t,e,n){"use strict";var a=n("ba30"),r=n.n(a);r.a},f421:function(t,e,n){"use strict";n.r(e);var a=n("db06"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a}},[["9210","common/runtime","common/vendor"]]]);