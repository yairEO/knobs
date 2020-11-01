import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'knobs.js',
  output: {
    file: 'knobs.min.js',
    format: 'umd',
    name: 'Knobs'
  },
  plugins: [
    terser(),
    babel({ babelHelpers: 'bundled' }),
    scss({
      output: false,
      outputStyle: 'compressed',
    }),
    cleanup()
  ]
}