const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const CssModulePlugin = new MiniCssExtractPlugin({
  filename: "[name].[chunkhash].css",
  allChunks: true
})

module.exports = {
  output: {
    path: path.resolve(__dirname, '../site-dist'),
    publicPath: '/ant-design-vue/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].async.js'
  }
}