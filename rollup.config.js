'use strict';

const match = require('rollup-plugin-match');
const empty = require('rollup-plugin-empty');
const combine = require('rollup-plugin-combine');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');
const pkg = require('./package.json');

const banner = `/* ${pkg.name}.js v${pkg.version} (c) 2018-${new Date().getFullYear()} Jesse Feng Released under the MIT License. */`;

module.exports = [{
  input: 'src/**/*.js',
  plugins: [
    empty({
      silent: false,
      dir: 'dist'
    }),
    match(),
    combine(),
    nodeResolve(),
    commonjs(),
    terser({
      include: /^.+\.min\.js$/,
      output: { preamble: banner }
    }),
    copy({
      targets: [
        { src: ['README.md', 'package.json'], dest: 'dist' }
      ]
    })
  ],
  output: [{
    banner,
    file: `dist/${pkg.jsdelivr}`,
    format: 'umd',
    name: pkg.name
  }, {
    banner,
    file: `dist/${pkg.jsdelivr.replace(/(.+)\.js$/, '$1.min.js')}`,
    format: 'umd',
    name: pkg.name
  }]
}, {
  input: 'src/**/*.js',
  plugins: [
    match(),
    combine({
      outputDir: true
    }),
    commonjs()
  ],
  output: [{
    banner,
    dir: 'dist/es',
    format: 'esm'
  }, {
    banner,
    dir: 'dist',
    format: 'cjs'
  }]
}];
