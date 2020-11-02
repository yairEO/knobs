import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"
import cleanup from 'rollup-plugin-cleanup';

export default ['min', ''].map((name, index) => ({
  input: 'src/knobs.js',
  output: {
    file: name == 'min' ? 'knobs.min.js' : 'knobs.js',
    format: 'umd',
    name: 'Knobs'
  },
  plugins: [
    (name == 'min' && terser()),
    (name == 'min' && babel({ babelHelpers: 'bundled' })),
    scss({
      output: false,
      outputStyle: 'compressed',
    }),
    cleanup()
  ]
}))

