(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3d45":function(t,e,n){},"517a":function(t,e,n){"use strict";n.r(e);var a=n("cc84"),r=n("de93");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("f5ab");var o,i=n("f0c5"),c=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},5187:function(t,e,n){"use strict";(function(t){n("cd49");a(n("66fd"));var e=a(n("517a"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"8e5f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("3cf6"));function r(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),o={mixins:[a.default],data:function(){return{indicatorDots:!0,autoplay:!0,interval:3e3,duration:300,banners:[],hotList:[],buttons:[{uri:{url:""},title:"",icon:""},{uri:{url:""},title:"",icon:""}],party_id:null,url:""}},onLoad:function(){},onShow:function(){this.getData()},onPullDownRefresh:function(){this.getData(),t.stopPullDownRefresh()},methods:{getData:function(){var t=this;this.$api.home.request().then((function(e){console.log("获取到数据",e),t.banners=e.banners,t.hotList=e.hot,t.buttons=e.buttons,t.party_id=e.party_id,u.globalData.cityId=e.city_id}))},jumpShop:function(e){"bespeak"==e.currentTarget.dataset.url&&t.navigateTo({url:"/pages/order/chefConfimeOrder"}),"member/list"==e.currentTarget.dataset.url&&t.navigateTo({url:"/pages/order/balanceRecharge"}),e.currentTarget.dataset.id&&t.navigateTo({url:"/pages/goods/shopList?id=/"+e.currentTarget.dataset.url+"/"+e.currentTarget.dataset.id})}}};e.default=o}).call(this,n("543d")["default"])},cc84:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},u=[]},de93:function(t,e,n){"use strict";n.r(e);var a=n("8e5f"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=r.a},f5ab:function(t,e,n){"use strict";var a=n("3d45"),r=n.n(a);r.a}},[["5187","common/runtime","common/vendor"]]]);