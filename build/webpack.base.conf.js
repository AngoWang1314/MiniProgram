var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var glob = require('glob')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var relative = require('relative')
// teacher端剔除在外的页面（文件夹名）
var noTeacherPages = ['mistakes'];

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getEntry(rootSrc) {
    var map = {};
    glob.sync(rootSrc + '/pages/**/main.js')
        .forEach(file => {
            var key = relative(rootSrc, file).replace('.js', '');
            map[key] = file;
        })
    return map;
}

function getEntryTe(rootSrc) {
    var map = {};
    glob.sync(rootSrc + '/pages/**/main.js')
        .forEach(file => {
            for(var i = 0; i < noTeacherPages.length; i++) {
              if(file.indexOf(noTeacherPages[i]) === -1) {
                var key = relative(rootSrc, file).replace('.js', '');
                map[key] = file;
              }
            }
        })
    return map;
}

const appEntry = { app: resolve('./src/main.js') }
const pagesEntry = process.env.PLATFORM === 'te' ? getEntryTe(resolve('./src'), 'pages/**/main.js') : getEntry(resolve('./src'), 'pages/**/main.js')
const entry = Object.assign({}, appEntry, pagesEntry)

const baseConfig = {
  // 入口起点
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  entry,
  target: require('mpvue-webpack-target'),
  resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
          'vue': 'mpvue',
          '@': resolve('src')
      },
      symlinks: false,
      aliasFields: ['mpvue', 'weapp', 'browser'],
      mainFields: ['browser', 'module', 'main']
  },
  module: {
      rules: [{
              test: /\.vue$/,
              loader: 'mpvue-loader',
              options: vueLoaderConfig
          },
          {
              test: /\.js$/,
              include: [resolve('src'), resolve('test')],
              use: [
                  'babel-loader',
                  {
                      loader: 'mpvue-loader',
                      options: Object.assign({ checkMPEntry: true }, vueLoaderConfig)
                  },
              ]
          },
          {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  name: utils.assetsPath('img/[name].[ext]')
              }
          },
          {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  name: utils.assetsPath('media/[name].[ext]')
              }
          },
          {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[ext]')
              }
          }
      ]
  },
  plugins: [
      new MpvuePlugin(),
      new CopyWebpackPlugin([{
          from: '**/*.json',
          to: ''
      }], {
          context: 'src/'
      }),
      new CopyWebpackPlugin([{
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(config.build.assetsRoot, './static'),
          ignore: ['.*']
      }])
  ]
}

const asconfig1 = Object.assign({
  output: {
      path: config.build.assetsRoot,
      // 输出文件名称（name为entry中定义的key值）
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production' ?
          config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
},baseConfig);

const asconfig2 = Object.assign({
  output: {
      path: config.build.assetsRoot,
      // 输出文件名称（name为entry中定义的key值）
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
},baseConfig);

module.exports = process.env.PLATFORM === 'te' ? asconfig2 : asconfig1;
