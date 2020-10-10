const path = require('path'); // 引入path模块
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css', 'ttf']
function resolve(dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
  css: [
    'https://unpkg.com/mavon-editor@2.9.0/dist/css/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://cdn.jsdelivr.net/npm/vue-router@3.3.4',
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0',
    'https://unpkg.com/axios@0.19.2/dist/axios.min.js'
  ]
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',  // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          })
      );
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      });
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios'
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias // set第一个参数：设置的别名(不能有@来代替)，第二个参数：设置的路径
        .set('components', resolve('./src/components'))
        .set('common', resolve('./src/common'))
        .set('assets', resolve('./src/assets'))
        .set('views', resolve('./src/views'))
        .set('network', resolve('./src/network'))
    // 注意 store 和 router 没必要配置
    if (isProduction) {
      // 生产环境注入cdn
      config.plugin('html')
          .tap(args => {
            args[0].cdn = cdn;
            return args;
          });
    }
  }
};
