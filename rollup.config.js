import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/knobs.js',
    output: {
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
  },
  {
    input: 'src/knobs.js',
    output: {
      file: 'knobs.js',
      format: 'umd',
      name: 'Knobs',
    },
    plugins: [
      serve(), // index.html should be in root of project
      livereload({ watch:'src', delay:1000, exts: [ 'html', 'js', 'scss', 'css' ] }),
      scss({ output: false, outputStyle: 'compressed', watch: 'src/styles', }),
      cleanup(),
      nodeResolve(),
      commonjs()
    ]
  },
]

