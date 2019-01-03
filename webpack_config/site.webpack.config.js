/*
 * @moduleName: site.webpack.config.js
 * @Desc: 文档生成配置
 * @Author: djkloop
 * @Date: 2019-01-02 23:19:19
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-01-03 14:27:01
 */

const path = require('path')
// const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./base.webpack.config')
const CssModulePlugin = new MiniCssExtractPlugin({
  filename: "[name].[chunkhash].css",
  allChunks: true
})
const devMode = process.env.NODE_ENV !== 'production'

// 主要是设置css + plugin
module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'production',
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
  optimization: {
    minimize: devMode ? false : true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../site/index.html'),
      inject: true,
      production: true,
    }),
    CssModulePlugin
  ]
})