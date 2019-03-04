# mpvue-小程序
基于[mpvue](http://mpvue.com)+[Vant Weapp](https://youzan.github.io/vant-weapp)+[小程序](https://developers.weixin.qq.com/miniprogram/dev/)原生语法开发的小程序demo

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
### 安装
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
## [Vant Weapp](https://youzan.github.io/vant-weapp)的使用
小程序已经支持使用 npm 安装第三方包，在小程序中可通过 npm 的的方式进行安装及使用；由于本项目通过mpvue进行开发，暂时只能通过手动引入的方式。
### 引入Vant Weapp
#### 下载
```bash
git clone https://github.com/youzan/vant-weapp.git
```
将dist目录下的所有文件复制到项目的/static/vant/目录下
在需要的page页面目录下的main.json中引入所需组件
```bash
{
  "usingComponents": {
      "van-badge": "../../../static/vant/badge/index",
      "van-badge-group": "../../../static/vant/badge-group/index"
  }
}
```
#### 使用
在对应的index.vue文件中直接使用
```bash
<van-badge title="标签名称" info="8" />
```
## 分包加载
### 使用分包
在app.json中配置，通过 subpackages （或subPackages）字段声明项目分包结构：
```bash
"subPackages": [{
  "root": "pages/commonSubpackage/",
  "pages": ["curriculum/main"]
}, {
  "root": "pages/learningSubpackage/",
  "pages": [
    "assignment/main",
    "course/main",
    "examination-paper/main",
    "mistakes/main",
    "paper-content/main",
    "task-list/main",
    "task-webview/main"
  ]
}, {
  "root": "pages/mineSubpackage/",
  "pages": [
    "about/main",
    "binding-mobile/main",
    "help-feedback/main",
    "mine-detail/main"
  ]
}]
```
### 分包预下载
预下载分包行为在进入某个页面时触发，通过在 app.json 增加 preloadRule 配置来控制：

  network: 指定网络预加载；all表示不限定网络，wifi表示只在wifi下加载

  packages：进入页面后预下载分包的root或name
```bash
"preloadRule": {
  "pages/index/main": {
    "network": "all",
    "packages": ["pages/commonSubpackage/"]
  },
  "pages/learning/main": {
    "network": "all",
    "packages": ["pages/learningSubpackage/"]
  },
  "pages/mine/main": {
    "network": "all",
    "packages": ["pages/mineSubpackage/"]
  }
}
```
