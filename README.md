# mpvue-小程序
基于[mpvue](http://mpvue.com)+[vant](https://youzan.github.io/vant-weapp)+[小程序](https://developers.weixin.qq.com/miniprogram/dev/)原生语法开发的小程序demo

## 安装与运行
### 下载
```bash
git clone git@github.com:dt-frontend/MiniProgram.git
```
### 安装依赖
```bash
npm install
```
### 项目运行
```bash
npm run dev
```
打开微信web开发者工具，导入目录。由于本项目涉及http请求数据模拟，所以需要在开发者工具右上角打开详情设置不校验合法域名和https证书。（备注：小程序需要配置合法域名白名单，此demo可先使用微信测试appid和取消校验域名预览）

## 项目结构
```bash
build
config
dist  //  打包文件位置
  |—— wx
  |—— wxTe
src   //  主要开发文件位置
  |—— pages
  |—— components
  |—— service
  |—— common
  |—— store
  ...
```

## [Vuex](https://vuex.vuejs.org)在mpvue中使用
```bash
npm install vuex -save
```
### 目录结构
```bash
store
  |—— actions.js
  |—— getters.js
  |—— index.js
  |—— mutation-types.js
  |—— mutations.js
  |—— state.js
main.js
```
#### 初始化
```bash
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NOD_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
```
#### 项目中引入
```bash
// main.js中引入
import store from './store';
Vue.prototype.$store = store; //  一个page都是一个新的vue实例，这里需要挂载到Vue原型中

// 初始化
const app = new Vue({
    App,
    //  store
});
```
