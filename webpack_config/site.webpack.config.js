/*
 * @moduleName: site.webpack.config.js
 * @Desc: 文档生成配置
 * @Author: djkloop
 * @Date: 2019-01-02 23:19:19
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-01-03 01:19:41
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./base.webpack.config')
const CssModulePlugin = new MiniCssExtractPlugin({
  filename: "[name].[chunkhash].css",
  allChunks: true
})
const devMode = process.env.NODE_ENV !== 'production'

console.log(process.env.NODE_ENV)

// 主要是设置css + plugin
module.exports = {
  output: {
    path: path.resolve(__dirname, '../site-dist'),
    publicPath: '/ant-design-vue/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].async.js'
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../site/index.html',
      inject: true,
      production: true,
    })
  ]
}