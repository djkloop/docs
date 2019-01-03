/*
 * @moduleName: base.webpack.config.js
 * @Desc: 基础webpack配置
 * @Author: djkloop
 * @Date: 2019-01-02 23:18:54
 * @Last Modified by: djkloop
 * @Last Modified time: 2019-01-03 17:09:02
 */

 const path = require('path')
 const hljs = require('highlight.js')
 const Token = require('markdown-it/lib/token')
 const cheerio = require('cheerio')
 const getBabelCommonConfig = require('../_libs/tools/antd-babel-commo-config')
 const babelConfig = getBabelCommonConfig(false)
 function pathResolve(p) {
  let pa = path.resolve(__dirname, '../'+ p);
  return pa;
}

 const fetch = (str, tag, scoped) => {
  const $ = cheerio.load(str, {
    decodeEntities: false,
    xmlMode: true,
  })
  if (!tag) { return str }
  if (tag === 'style') {
    return scoped
      ? $(`${tag}[scoped]`).html()
      : $(`${tag}`).not(`${tag}[scoped]`).html()
  }
  return $(tag).html()
}

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 */
const replaceDelimiters = function (str) {
  return str.replace(/({{|}})/g, '<span>$1</span>')
}

const renderHighlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  try {
    return replaceDelimiters(hljs.highlight(lang, str, true).value)
  } catch (err) {}
}

 // 解析md
const md = require('markdown-it')('default', {
  html: true,
  breaks: true,
  highlight: renderHighlight,
}).use(require('markdown-it-anchor'), {
  level: 2,
  slugify: string => string.trim().split(' ').join('-'),
  permalink: true,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: 'anchor',
  permalinkSymbol: '#',
  permalinkBefore: false,
})

const cnReg = new RegExp('<(cn)(?:[^<]|<)+</\\1>', 'g')
const usReg = new RegExp('<(us)(?:[^<]|<)+</\\1>', 'g')
md.core.ruler.push('update_template', function replace ({ tokens }) {
  let cn = ''
  let us = ''
  let template = ''
  let script = ''
  let style = ''
  let scopedStyle = ''
  let code = ''
  let sourceCode = ''
  tokens.forEach(token => {
    if (token.type === 'html_block') {
      if (token.content.match(cnReg)) {
        cn = fetch(token.content, 'cn')
        token.content = ''
      }
      if (token.content.match(usReg)) {
        us = fetch(token.content, 'us')
        token.content = ''
      }
    }
    if (token.type === 'fence' && token.info === 'html' && token.markup === '```') {
      sourceCode = token.content
      code = '````html\n' + token.content + '````'
      template = fetch(token.content, 'template')
      script = fetch(token.content, 'script')
      style = fetch(token.content, 'style')
      scopedStyle = fetch(token.content, 'style', true)
      token.content = ''
      token.type = 'html_block'
    }
  })
  if (template) {
    let jsfiddle = {
      html: template,
      script,
      style,
      us,
      cn,
      sourceCode,
    }
    jsfiddle = md
      .utils
      .escapeHtml(JSON.stringify(jsfiddle))
    const codeHtml = code
      ? md.render(code)
      : ''
    const cnHtml = cn
      ? md.render(cn)
      : ''
    let newContent = `
      <template>
        <demo-box :jsfiddle="${jsfiddle}">
          <template slot="component">${template}</template>
          <template slot="description">${cnHtml}</template>
          <template slot="us-description">${us
    ? md.render(us)
    : ''}</template>
          <template slot="code">${codeHtml}</template>
        </demo-box>
      </template>`
    newContent += script
      ? `
      <script>
      ${script || ''}
      </script>
      `
      : ''
    newContent += style
      ? `
      <style>
      ${style || ''}
      </style>
      `
      : ''
    newContent += scopedStyle
      ? `
      <style scoped>
      ${scopedStyle || ''}
      </style>
      `
      : ''
    const t = new Token('html_block', '', 0)
    t.content = newContent
    tokens.push(t)
  }
})

 module.exports = {
   entry: {
     index: pathResolve('site/index.js')
   },
   module: {
     rules: [
       {
         test: /\.md/,
         use: [
           {
             loader: 'vue-antd-md-loader',
             options: Object.assign(md, {
               wrapper: 'div',
               vueLoaderOptions: {
                 loaders: {
                   js: [
                     {
                       loader: 'babel-loader',
                       options: {
                         preset: ['env'],
                         plugins: ['transform-vue-jsx', 'transform-object-rest-spread'],
                       }
                     }
                   ]
                 }
               }
             })
           }
         ]
       },{
         test: /\.vue$/,
         use: [
           {
             loader: 'vue-loader',
           }
         ]
       }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: babelConfig,
      }, {
        test: /\.(ts|tsx)$/,
        include: [
          pathResolve('./components'),
          pathResolve('./examples')
        ],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      },{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      }
     ]
   },
   resolve: {
    modules: [
      'node_modules', path.join(__dirname, '../node_modules'),
    ],
    extensions: [
      '.js','.jsx', '.vue', '.md', '.ts', '.tsx'
    ],
    alias: {
      'antd': path.join(__dirname,'..' ,'components'),
      'ant-design-vue': path.join(__dirname,'..', 'components'),
      'chaos-ui-vue': path.join(__dirname, '..', 'examples/components'),
      'chaos-ui-dev-vue': path.join(__dirname, '../', 'components'),
      '@': path.join(__dirname, '..'),
    },
  },
 }
