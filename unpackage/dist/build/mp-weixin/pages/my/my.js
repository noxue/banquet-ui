(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{3280:function(o,t,e){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(e("55dc")),s=e("a601"),i=u(e("4e52"));function u(o){return o&&o.__esModule?o:{default:o}}getApp();var a={data:function(){return{css:{pageTop:0},isLogin:!1,userInfo:{phone:"百家宴用户",pic:"1.jpg",address:"",is_auth:!0,cook_status:-1},cookText:"厨师",tel:"1000000"}},onLoad:function(){var t=this;o.getSystemInfo({success:function(e){t.css.pageTop=e.safeAreaInsets.top;var n=o.getMenuButtonBoundingClientRect();t.css.pageTop=n.top-10}})},onShow:function(){n.default.checkUserLogin()?(this.isLogin=!0,this.userInfoRequest()):this.isLogin=!1},methods:{userInfoRequest:function(){var o=this;this.$api.users.me.request().then((function(t){o.userInfo=t,1==o.userInfo.is_cook?o.cookText="厨师":0===o.userInfo.cook_status?o.cookText="申请厨师":1===o.userInfo.cook_status?o.cookText="厨师审核中":2===o.userInfo.cook_status?o.cookText="厨师":3===o.userInfo.cook_status&&(o.cookText="申请厨师")}))},toPagesCook:function(){if(!1===this.isLogin)return(0,s.toPageUserLoginTimer)(),!1;0===this.userInfo.cook_status?o.navigateTo({url:"/pages/cook/apply/agreement"}):o.navigateTo({url:"/pages/cook/apply/apply"})},toPagesWorkTime:function(){if(!1===this.isLogin)return(0,s.toPageUserLoginTimer)(),!1;2===this.userInfo.cook_status?this.toPages("/pages/cook/workTime"):o.showToast({title:"申请成为厨师后可添加",icon:"none"})},toPages:function(t){!0===this.isLogin?o.navigateTo({url:t}):(0,s.toPageUserLoginTimer)()},callPhone:function(){i.default.mobile?o.makePhoneCall({phoneNumber:this.tel}):o.showToast({icon:"none",title:"敬请期待"})},logout:function(){o.showModal({content:"确定退出登录",success:function(o){!0===o.confirm&&(n.default.logout(),this.isLogin=!1,this.userInfo={phone:"百家宴用户",pic:"1.jpg",address:"",is_auth:!1,is_cook:!1})}})},toPageLogin:function(){(0,s.toPageUserLoginTimer)()},toPagesApply:function(){o.navigateTo({url:"/pages/cook/apply/agreement"})}}};t.default=a}).call(this,e("543d")["default"])},"6cf5":function(o,t,e){"use strict";(function(o){e("889a");n(e("66fd"));var t=n(e("b8fd"));function n(o){return o&&o.__esModule?o:{default:o}}wx.__webpack_require_UNI_MP_PLUGIN__=e,o(t.default)}).call(this,e("543d")["createPage"])},"954c":function(o,t,e){"use strict";e.r(t);var n=e("3280"),s=e.n(n);for(var i in n)"default"!==i&&function(o){e.d(t,o,(function(){return n[o]}))}(i);t["default"]=s.a},"975e":function(o,t,e){"use strict";var n=e("ce1c"),s=e.n(n);s.a},b8fd:function(o,t,e){"use strict";e.r(t);var n=e("d705"),s=e("954c");for(var i in s)"default"!==i&&function(o){e.d(t,o,(function(){return s[o]}))}(i);e("975e");var u,a=e("f0c5"),c=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=c.exports},ce1c:function(o,t,e){},d705:function(o,t,e){"use strict";var n;e.d(t,"b",(function(){return s})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return n}));var s=function(){var o=this,t=o.$createElement;o._self._c},i=[]}},[["6cf5","common/runtime","common/vendor"]]]);