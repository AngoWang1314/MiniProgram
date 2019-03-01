/*jshint esversion: 6 */

import Vue from 'vue';
import App from './App';

import store from './store';
Vue.prototype.$store = store;

console.log(process.env.PLATFORM)

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
    App,
    store
});
app.$mount();
