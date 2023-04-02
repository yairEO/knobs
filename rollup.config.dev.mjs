import scss            from 'rollup-plugin-scss'
import babel           from '@rollup/plugin-babel'
import cleanup         from 'rollup-plugin-cleanup'
import serve           from 'rollup-plugin-serve'
import livereload      from 'rollup-plugin-livereload'
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
      serve(), // index.html should be in root of project
      livereload({ watch:'src', delay:1500, exts: [ 'html', 'js', 'scss', 'css' ] }),
      babel({ babelHelpers: 'bundled' }),
      scss({ output: false, watch: 'src/styles', }),
      cleanup(),
      nodeResolve(),
      commonjs()
    ]
  }
]

