(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/orderList"],{"02f5":function(t,e,n){"use strict";n.r(e);var u=n("3626"),r=n("ac2c");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("a5b6");var i,c=n("f0c5"),s=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);e["default"]=s.exports},3626:function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var r=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"4cf5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=c(n("55dc")),r=c(n("199a")),a=c(n("e48d")),i=c(n("5b43"));function c(t){return t&&t.__esModule?t:{default:t}}var s={mixins:[r.default,a.default],data:function(){return{fileHost:i.default.fileHost2,statusType:["全部","待接单","已接单"],currentType:0,length:0,table:{},newTabel:[]}},onLoad:function(){this.tableInit(this)},onShow:function(){u.default.checkUserLogin()&&this.tableRequest(this,this.getOrderList,"reset")},onPullDownRefresh:function(){u.default.checkUserLogin()&&this.tableRequest(this,this.getOrderList,"reset")},onReachBottom:function(){this.tableRequest(this,this.getOrderList)},methods:{statusTap:function(t){this.currentType=t.currentTarget.dataset.index,this.newTabelChange()},getOrderList:function(){var t=this;return new Promise((function(e,n){t.$api.orders.get.request().then((function(n){console.log("哈哈",n);var u={"-1":"已取消",0:"已下单",1:"已接单",10:"已完成"},r={0:1,1:2,10:3};n.map((function(t){return t.currentType=r[t.status],t.status_text=u[t.status],t})),setTimeout((function(){t.newTabelChange()}),100),e(n)}),(function(t){n()}))}))},newTabelChange:function(){var t=this,e=this.table.data,n=e.filter((function(e){return 0==t.currentType||e.currentType==t.currentType}));this.newTabel=n}}};e.default=s},a5b6:function(t,e,n){"use strict";var u=n("bc50"),r=n.n(u);r.a},ac2c:function(t,e,n){"use strict";n.r(e);var u=n("4cf5"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=r.a},bc50:function(t,e,n){},be2c:function(t,e,n){"use strict";(function(t){n("889a");u(n("66fd"));var e=u(n("02f5"));function u(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["be2c","common/runtime","common/vendor"]]]);