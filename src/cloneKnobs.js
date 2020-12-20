import isObject from './utils/isObject'

export default function(knobs, persistedData){
  return knobs.map(knob => {
    if( knob && knob.type ){
        knob.__name = knob.__name || knob.label.replace('/ /g','-') + Math.random().toString(36).slice(-6)
        knob.originalValue = knob.originalValue ?? knob.value ?? this.getKnobValueFromCSSVar(knob)

      if( persistedData )
        knob.value = persistedData[knob.label] ?? knob.originalValue

      // cast to type "number" if needed (per input type)
      if( knob.type == 'range' ){
        knob.value = +knob.value
        knob.originalValue = +knob.originalValue
      }
    }

    return knob.cssVar
      ? {...knob, cssVar:[...knob.cssVar]}
      : isObject(knob) // labels are not objects, so use us-is
        ? {...knob}
        : knob
  })
}