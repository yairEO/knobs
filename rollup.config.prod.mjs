import scss            from 'rollup-plugin-scss'
import babel           from '@rollup/plugin-babel'
import terser          from '@rollup/plugin-terser';
import cleanup         from 'rollup-plugin-cleanup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs        from '@rollup/plugin-commonjs'
import {readFileSync}  from 'fs'

const pkg = JSON.parse(readFileSync('./package.json'))
const banner = `/*! Knobs ${pkg.version} MIT | https://github.com/yairEO/knobs */\n`;

export default [
  {
    input: 'src/knobs.js',
    output: {
      banner,
      file: 'knobs.min.js',
      format: 'umd',
      name: 'Knobs',
    },
    plugins: [
      terser(),
      babel({ babelHelpers: 'bundled' }),
      scss({ output: false, outputStyle: 'compressed', watch: 'src/styles', }),
      cleanup(),
      nodeResolve(),
      commonjs()
    ]
  }
]

