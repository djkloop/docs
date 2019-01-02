/*
 * @moduleName: antd-babel-commo-config
 * @Desc: form antd-tools 2.x
 * @Author: djkloop
 * @Date: 2019-01-03 00:42:17
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-01-03 00:42:45
 */


'use strict'

module.exports = function (modules) {
  const plugins = [
    require.resolve('babel-plugin-transform-vue-jsx'),
    require.resolve('babel-plugin-transform-es3-member-expression-literals'),
    require.resolve('babel-plugin-transform-es3-property-literals'),
    require.resolve('babel-plugin-transform-object-assign'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
  ]
  plugins.push([require.resolve('babel-plugin-transform-runtime'), {
    polyfill: false,
  }])
  return {
    presets: [
      [require.resolve('babel-preset-env'), {
        modules,
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      }],
    ],
    plugins,
    env: {
      test: {
        plugins: [require.resolve('babel-plugin-istanbul')],
      },
    },
  }
}