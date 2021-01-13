import isObject from './utils/isObject'

export default function(knobs, persistedData){
  return knobs.map(k => {
    if( k && k.type ){
        k.__name = k.__name || k.label.replace('/ /g','-') + Math.random().toString(36).slice(-6)
        k.defaultValue = k.defaultValue ?? k.value ?? this.getKnobValueFromCSSVar(k) // value to revert to, if wished to reset
        k.defaultChecked = k.defaultChecked ?? !!k.checked

      if( !this.settings.knobsToggle && k.isToggled === false )
        delete k.isToggled

      if( persistedData ){
        // if current iterated knob exists in the persisted data array, use it
        let thisKnobPersistedData = persistedData.find(a => a.label == k.label)
        if( thisKnobPersistedData )
          return thisKnobPersistedData
      }

      // cast to type "number" if needed (per input type)
      if( k.type == 'range' ){
        k.value = +k.value
        k.defaultValue = +k.defaultValue
      }
      else if( k.type == 'checkbox' ){
        k.checked = k.checked || k.defaultChecked
      }
      else{
        // value is not necessarily defined, if is wished to be feched from the CSS automatically
        k.value = k.value || k.defaultValue
      }
    }

    return k.cssVar
      ? {...k, cssVar:[...k.cssVar]}
      : isObject(k) // labels are not objects, so use us-is
        ? {...k}
        : k
  })
}