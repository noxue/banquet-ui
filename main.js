import App from './App';
import {
	moneyFrom
} from './utils/util.js'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

import Vue from 'vue';
import api from './api/index.js'

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$api = api; // 请求配置

const app = new Vue({
	...App
});
app.$mount();

Vue.filter('moneyFrom', function(number){
	return moneyFrom(number)
})
