'use strict'
const webpack = require('webpack')
const colors = require('colors')
const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const CWD = process.cwd()
const RUN_ENV_PRODUCTION = 'PRODUCTION'
console.log(`Now Cwd -> ${CWD}`.blue.bold)

const pathJoin = (path) => {
  return path.join(CWD, path)
}
const dist = (done) => {
  rimraf.sync(pathJoin('site-dist'))
  process.env.RUN_ENV = RUN_ENV_PRODUCTION
  const webpackSiteConfig = require(pathJoin('webpack_config/'))
  return done(0)
}

gulp.task('site-dist', (done) => {
  console.log(`site-dist done`.cyan)
})

