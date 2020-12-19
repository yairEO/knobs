const raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60))

export function bindEvents(){
  this.eventsRefs = this.eventsRefs || {
    change: e => {
      // only knobs' inputs have a "name" attribute
      if( !e.target.name ) return

      this.setKnobChangedFlag( this.getKnobElm(e.target.name) )
      this.onChange(e)
    },
    input: e => {
      try{
        let isSectionToggler = e.target.classList.contains('toggleSection'),
            groupElm,
            sectionHeight;

        // previously used "resizeObserver", but in Firefox the resize callback is called only after and not during every frame of the resize,
        // so this hacky-approach beflow is needed to adjust the offset of the iframe *before* the knobs group section is expanded
        if( isSectionToggler && e.target.checked ){
          groupElm = e.target.parentNode.querySelector('.fieldset__group')
          sectionHeight = groupElm.style.getPropertyValue('--height');
          this.setIframeProps({ heightOffset:sectionHeight })
        }
      }
      catch(err){}

      if( !e.target.name ) return

      this.onInput(e)
      this.onChange(e)
    },
    transitionend: e => {
      if( e.target.classList.contains('fieldset__group') ){
        this.setIframeProps()
      }
    },
    mainToggler: e => this.toggle(e.target.checked),
    reset : this.resetAll.bind(this, null),
    submit: this.onSubmit.bind(this),
    click : this.onClick.bind(this)
  };

  [
    ['form', 'change'],
    ['form', 'input'],
    ['form', 'reset'],
    ['form', 'submit'],
    ['form', 'transitionend'],
    ['scope', 'click'],
    ['mainToggler', 'change', this.eventsRefs.mainToggler],
  ].forEach(([elm, event, cb]) =>
    this.DOM[elm].addEventListener(event,  cb || this.eventsRefs[event].bind(this))
  )
}

export function onInput(e){
  var inputelm = e.target;

  inputelm.parentNode.style.setProperty('--value',inputelm.value);
  inputelm.parentNode.style.setProperty('--text-value', JSON.stringify(inputelm.value))
}

export function onChange(e){
  var knobData = this.getKnobDataByName(e.target.name),
      runOnInput = e.type == 'input' && knobData && knobData.type != 'range', // forgot why I wrote this
      isCheckbox = knobData && knobData.type == 'checkbox',
      updatedData;

  if( !knobData )
    return

  if( !isCheckbox && !this.settings.live )
    return

  if( e.type == 'input' && runOnInput )
    return

  updatedData = { ...knobData, value:e.target.value }

  raf(() => this.updateDOM(updatedData))
  typeof knobData.onChange == 'function' && knobData.onChange(e, updatedData)
}

  /**
* Applys changes manually if `settings.live` is `false`
*/
export function onSubmit(e){
  e.preventDefault()

  var elements = e.target.querySelectorAll('input')
  this.settings.live = true
  elements.forEach(elm => this.onChange({ target:{value:elm.value, name:elm.name} }))
  this.settings.live = false
  return false
}

export function onClick(e){
  var target = e.target,
      is = n => target.classList.contains(n)

  if( is('knobs__knob__reset') )
    this.resetKnobByName(target.name)
}