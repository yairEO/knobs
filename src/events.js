import { changeColorFormat, CSStoHSLA } from '@yaireo/color-picker'

const raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60))
const is = (elm, cls) => elm.classList.contains(cls)

export function bindEvents(){
  this.eventsRefs = this.eventsRefs || {
    change(e){
      // only knobs' inputs have a "data-name" attribute
      if( !e.target.dataset.name ) return

      this.onChange(e)
    },

    input(e){
      try{
        let isSectionToggler = is(e.target, 'toggleSection'),
        // sectionHeight,
            groupElm;

        // previously used "resizeObserver", but in Firefox the resize callback is called only after and not during every frame of the resize,
        // so this hacky-approach beflow is needed to adjust the offset of the iframe *before* the knobs group section is expanded
        if( isSectionToggler && e.target.checked ){
          groupElm = e.target.parentNode.querySelector('.fieldset__group')
          // sectionHeight = groupElm.style.getPropertyValue('--height');
          this.setIframeProps({ heightOffset:9999 }) // better to temporarly set a large height and then at "transitionend" put the exact height
        }
      }
      catch(err){}

      if( e.target.hasAttribute('is-knob-input') ){
        this.onInput(e)
        this.onChange(e)
      }

      else if ( is(e.target, 'knobs__knob__toggle') )
        this.toggleKnob( e.target.dataset.forKnob, e.target.checked )
    },

    transitionstart(e){
      // this dirty trick is needed to add "overflow:hidden" to the group while transitied
      if( is(e.target, 'fieldset__group__wrap') ){
        e.target.parentNode.setAttribute('transitioned', 1)
      }
    },

    transitionend(e){
      if( is(e.target, 'fieldset__group__wrap') ){
        e.target.parentNode.removeAttribute('transitioned')
        this.setIframeProps()
      }
    },

    wheel(e){
      const { value, max, step, type } = e.target,
        delta = Math.sign(e.deltaY) * (+step||1) * -1 // normalize jump value to either -1 or 1

      // disable window scroll: https://stackoverflow.com/a/23606063/104380
      if( type == 'range' )
        e.preventDefault()

      if( value && max ){
        e.target.value = Math.min(Math.max(+value + delta, 0), +max)
        this.onInput(e)
        this.onChange(e)
      }
    },
    mainToggler(e){ this.toggle(e.target.checked) },
    reset : this.applyKnobs.bind(this, null, true),
    submit: this.onSubmit.bind(this),
    click : this.onClick.bind(this),
    focusin : this.onFocus.bind(this)
  };

  [
    ['scope', 'click'],
    ['form', 'change'],
    ['form', 'input'],
    ['form', 'reset'],
    ['form', 'submit'],
    ['form', 'focusin'],
    ['form', 'transitionend'],
    ['form', 'transitionstart'],
    ['scope', 'wheel'],
    ['mainToggler', 'change', this.eventsRefs.mainToggler.bind(this)],
  ].forEach(([elm, event, cb]) =>
    this.DOM[elm] && this.DOM[elm].addEventListener(event,  cb || this.eventsRefs[event].bind(this), { passive:false })
  )

  whenKnobsParentResizes.call(this)
  // window.addEventListener('storage', this.eventsRefs.onStorage)
}

function whenKnobsParentResizes(){
  let debounceTimer,
      that = this;

  // if the page which added Knobs is resized, re-calculate iframe height
  const resizeObserver = new ResizeObserver(entries => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(()=> {
      that.setIframeProps()
    }, 500)
  })

  resizeObserver.observe( this.settings.appendTo )
}

export function onFocus(e) {
  // if( e.target.dataset.type == 'color' )
  //   setTimeout(_ => this.toggleColorPicker(e.target), 100)
}

/**
 * only for knobs inputs
 */
export function onInput(e){
  const inputElm = e.target,
        { type, value, checked, dataset:{name} } = inputElm,
        isCheckbox = type == 'checkbox',
        { label } = this.getKnobDataByName(name)

  this.setParentNodeValueVars(inputElm)
  this.setKnobDataByName(name, isCheckbox ? {checked} : {value})

  if( value != undefined && label )
    // save knob's new value
    this.setPersistedData()
    // this.getSetPersistedData({ [label]:isCheckbox ? [inputElm.checked, value] : value })
}

/**
 * only for knobs inputs
 */
export function onChange(e, ignoreSimilar){
  const name = e.target.dataset.name;

  this.setKnobChangedFlag( this.getKnobElm(name) )

  const knobData = this.getKnobDataByName(name),
        runOnInput = e.type == 'input' && knobData && knobData.type != 'range', // forgot why I wrote this
        isCheckbox = knobData && knobData.type == 'checkbox',
        extraData = {}

  if( !knobData ){
    console.warn("Knob data was not found:", {name, knobData})
    return
  }

  const similarKnobs = ignoreSimilar ? [] : this.getSimilarKnobs(knobData)

  if( similarKnobs.length ){
    similarKnobs.forEach(knob => {
      const inputElm = this.getInputByName(knob.__name)
      inputElm.value = knobData.value
      this.onInput({ target:inputElm })
    })
  }

  if( !isCheckbox && !this.settings.live )
    return

  if( e.type == 'input' && runOnInput )
    return

  raf(() => this.updateDOM(knobData))

  if( knobData.type === 'color' )
    extraData.hsla = CSStoHSLA(changeColorFormat(knobData.value, 'HSL'))

  typeof knobData.onChange == 'function' && knobData.onChange(e, knobData, extraData)
}

/**
* Applys changes manually if `settings.live` is `false`
*/
export function onSubmit(e){
  e.preventDefault()

  var elements = e.target.querySelectorAll('input[data-name]')
  this.settings.live = true
  elements.forEach(elm => this.onChange({ target:{value:elm.value, type:elm.type, dataset:{name:elm.dataset.name}} }))
  this.settings.live = false
  return false
}

export function onClick(e){
  const {target} = e

  if( is(target, 'knobs__knob__reset') )
    this.resetKnobByName(target.name)

  if( target.dataset.type == 'color' )
    setTimeout(_ => this.toggleColorPicker(target), 100)
}