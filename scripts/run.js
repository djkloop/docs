#!/usr/bin/env node

'use strict'

var colors = require('colors')
const gulp = require('gulp')
const program = require('commander')

program.on('--help', () => {
  console.log(colors.bold.blue('  Usage:'))
  console.log()
})

program.parse(process.argv)

const task = program.args[0]
if (!task) {
  program.help()
} else {
  console.log(`Now Run Task: ${task}`.green)
  require('./gulpfile')
  gulp.start(task)
}