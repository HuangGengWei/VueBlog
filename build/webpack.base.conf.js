'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

const HappyPack = require('happypack')//发挥多核CPU性能进行解析
const happyThreadPool = HappyPack.ThreadPool({size:5}) //构造出共享进程池,在进程池中包含5个子进程

function resolve (dir) {
  //__dirname 表示当前工作目录，也就是项目根目录
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  externals:{
    'vue':'Vue',
    'element-ui':'ELEMENT'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    //当遇到require('./data')这样的导入语句webpack会先去寻找./data.js文件,如果该文件不存在,就去寻找data.vue文件,接着.json,如果还是找不到就报错。
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    //使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        //如果项目源码中只有js文件，就不要写成/\jsx?$/,以提升正则表达式的性能
        test: /\.js$/,
        //loader: 'babel-loader',//因为已经指定happypack了这里的loader注释
        //babel-loader 支持缓存转换 出的结果，通过 cacheDirectry 选项开启 'babel-loader?cacheDirectory',
        //将对.js文件的处理转交给id babel HappyPack实例
        use: ['happypack/loader?id=babel'],
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')] ,
        //排除 node_modules目录下的文件node_modules目录下的文件都采用了ESS语法,没必要再通过Babel去转换
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    //单独 、完整的jquery.min.js文件没有采用模块化，忽略对jquery.min.js文件的递归解析处理
    noParse: [/jquery\.min\.js$/,/jquery-vender\.js$/],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new HappyPack({
      //用唯一的标识符id，用来代替当前的HappyPack是用来处理一类特定的文件的
      id:'babel',
      // 如何处理.js文件，用法和loader配置的一样
      loaders: ['babel-loader'],
      threadPool: happyThreadPool, //使用共享进程池中的子进程去处理任务
    }),
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    }),
  ]
}
