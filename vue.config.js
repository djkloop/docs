const path = require('path');

console.log(__dirname);

function pathResolve(p) {
  let pa = path.resolve(__dirname, p);
  return pa;
}

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    hot: true,
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('examples'))
    config.module
      .rule('tsx')
      .include
      .add(pathResolve('./components'))
      .add(pathResolve('./examples'))
      .end()
      .use('ts-loader')
  }
}