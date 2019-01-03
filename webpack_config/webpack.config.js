/*
 * @moduleName: webpack.config.js
 * @Desc: 用来生成文档配置
 * @Author: djkloop
 * @Date: 2019-01-02 12:47:37
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-01-03 10:48:32
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base.webpack.config')
console.log(baseWebpackConfig);