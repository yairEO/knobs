import isObject from './utils/isObject'

export default function(knobs, persistedData){
  return knobs.map(k => {
    if( k && k.type ){
        k.__name = k.__name || k.label.replace('/ /g','-') + Math.random().toString(36).slice(-6)
        k.defaultValue = k.defaultValue ?? k.value ?? this.getKnobValueFromCSSVar(k)
        k.defaultChecked = k.defaultChecked ?? !!k.checked

      if( persistedData ){
        if( k.type == 'checkbox' ){
          k.checked = persistedData[k.label]?.[0] ?? k.defaultChecked
        }
        else
          k.value = persistedData[k.label] ?? k.defaultValue
      }

      // cast to type "number" if needed (per input type)
      if( k.type == 'range' ){
        k.value = +k.value
        k.defaultValue = +k.defaultValue
      }
    }

    return k.cssVar
      ? {...k, cssVar:[...k.cssVar]}
      : isObject(k) // labels are not objects, so use us-is
        ? {...k}
        : k
  })
}