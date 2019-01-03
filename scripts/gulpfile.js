'use strict'
const webpack = require('webpack')
const colors = require('colors')
const gulp = require('gulp')
const path = require('path')
const readline = require('readline')
const fs = require('fs')
const ora = require('ora')

const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const through2 = require('through2')

const CWD = process.cwd()
const RUN_ENV_PRODUCTION = 'PRODUCTION'
console.log(`Now Cwd -> ${CWD}`.blue.bold)

const pathJoin = (dir) => {
  return path.join(CWD, dir)
}
const dist = (done) => {
  rimraf.sync(pathJoin('site-dist'))
  process.env.RUN_ENV = RUN_ENV_PRODUCTION
  const webpackSiteConfig = require(pathJoin('webpack_config/site.webpack.config.js'))
  // console.dir(webpackSiteConfig, { depth: null, colors: true })
  webpack(webpackSiteConfig, (err, stats) => {
    if(err) {
      console.log((err.stack || err))
      if(err.details) {
        console.log(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    })

    console.log(buildInfo)
    done(0)
  })
}

function copyHtml() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(CWD, 'site/demoRoutes.js'))
  })
  rl.on('line', (line) => {
    // 把注释掉的干掉
    if(line.includes('path:') && !line.includes('//')) {
      const name = line.split("'")[1].split("'")[0]
      console.log(('正在构建组件: ' + name).blue)
      const toPaths = [
        `site-dist/components/${name}`,
        `site-dist/iframe/${name}`
      ]

      toPaths.forEach(toPath => {
        rimraf.sync(path.join(CWD, toPath))
        mkdirp(path.join(CWD, toPath), () => {
          fs.writeFileSync(
            path.join(CWD, `${toPath}/index.html`),
            fs.readFileSync(path.join(CWD, 'site-dist/index.html'))
          )
        })
      })
    }
  })
  const source = [
    'docs/vue/*.md',
    '*.md'
  ]
  gulp.src(source).pipe(through2.obj((file, encoding, next) => {
    const paths = file.path.split('/')
    const name = paths[paths.length - 1].split('.')[0].toLowerCase();
    console.log(name)
    const toPaths = [
      'site-dist/docs',
      'site-dist/docs/vue',
      `site-dist/docs/vue/${name}`,
      `site-dist/docs/vue/${name}-cn`,
    ]
    toPaths.forEach(toPath => {
      mkdirp(path.join(CWD, toPath), () => {
        fs.writeFileSync(
          path.join(CWD, `${toPath}/index.html`),
          fs.readFileSync(path.join(CWD, 'site-dist/index.html'))
        )
      })
    })
    next()
  }))
}

gulp.task('site-dist', (done) => {
  console.log(`site-dist done`.green)
  dist(() => {
    copyHtml()
    console.log(`site-dist done`.cyan)
  })
})

