'use strict'
// const internalIp = require('internal-ip');
const path = require('path');
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/xnrh-yhzx': {
        // target: "http://192.168.22.104:9002/", /*林忠宇*/
        // target: "http://192.168.22.201:2020/", /*测试*/
        target: "http://192.168.22.110:9002/", /*侯哥*/
        // target: "http://192.168.22.160:9002/", /*刘佳龙*/
      },
      '/xnrh-common': {
        // target: "http://192.168.22.104:9002/", /*林忠宇*/
        // target: "http://192.168.22.201:2020/", /*测试*/
        target: "http://192.168.22.110:8001/", /*侯哥*/
        // target: "http://192.168.22.160:9002/", /*刘佳龙*/
      }
    },
    // Various Dev Server settings
    // host: internalIp.v4.sync(),//http://192.168.22.24 YJ  备注IE不兼容internalIp方法
    host: "192.168.22.128",
    port: 8093,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-source-map',
    cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'), // Template for index.html
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: 'source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
