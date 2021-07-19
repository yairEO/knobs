import isObject from './isObject'

export default knobs => knobs.reduce((acc, knobData) => {
  if( !isObject(knobData ) && acc[acc.length - 1].length ) acc.push([])
  acc[acc.length - 1].push(knobData)
  return acc
}, [[]])
