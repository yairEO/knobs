import ColorPicker from '@yaireo/color-picker'
import { reposition } from 'nanopop'
import mainStyles from './styles/styles.scss'
import colorPickerStyles from '@yaireo/color-picker/dist/styles.css'
import isObject from './utils/isObject'
import { mergeDeep } from './utils/mergeDeep'
import isModernBrowser from './utils/isModernBrowser'
import cloneKnobs from './cloneKnobs'
import * as templates from './templates'
import * as events from './events'
import * as persist from './persist'
import DEFAULTS from './defaults'

function Knobs(settings){
  // since Knobs relies on CSS variables, no need to proceed if browser support is inadequate
  if ( !isModernBrowser())
    return this

  const { knobs = [], ...restOfSettings } = settings || {}

  // for the rest, deep cloining appear to work fine
  this.settings = mergeDeep({...DEFAULTS, appendTo:document.body}, restOfSettings)
  this.knobs = knobs
  this.DOM = {}
  this.state = {}
  this.build()
}

Knobs.prototype = {
  _types: ['range', 'color', 'checkbox', 'text'],

  ...events,
  ...persist,

  cloneKnobs,

  /**
   * "Knobs" property setter
   */
  set knobs(knobs){
    if( knobs && knobs instanceof Array ){
      // manual deep-clone the "knobs" setting, because for hours I couldn't find a single piece of code
      // on the internet which was able to correctly clone it
      this._knobs = this.cloneKnobs(knobs, this.getSetPersistedData())
      this.DOM && this.render()
    }
  },

  /**
   * "knobs" property getter
   */
  get knobs(){
    return this._knobs
  },

  /**
   * Generate styles for the iframe using the "theme" property in the settings
   * @param {Object} vars
   */
  getCSSVariables({ flow, styles, RTL, position, ...vars }){
    var output = '', p;

    for( p in vars )
      output += `--${p}:${vars[p]}; `

    return output
  },

  /**
   * Try to extract & parse CSS variables which would be used as default values
   * for knobs wgucg has no "value" property defined.
   * @param {Object} data Knobs data
   */
  getKnobValueFromCSSVar( data ){
    let value

    // when/if "value" property is unspecified in the knob's data, assume
    // there's a CSS variable already set, so try to get the value from it:
    if( !("value" in data) && data.cssVar && data.cssVar.length ){
      let CSSVarTarget = data.cssVar[2] || this.settings.CSSVarTarget

      if( CSSVarTarget.length )
        CSSVarTarget = CSSVarTarget[0]

      value = getComputedStyle(CSSVarTarget).getPropertyValue(`--${data.cssVar[0]}`).trim()


      // if type "range" - parse value as unitless
      if( data.type == 'range' )
        value = parseInt(value)

      // if type "color" - parse value as color

      // if type "checkbox" - if variable exists it means the value should be "true"

      return value
    }
  },

  templates: {
    scope: templates.scope,
    knob: templates.knob,
    fieldset: templates.fieldset
  },

  hideColorPickers( exceptNode ){
    document.querySelectorAll('.color-picker').forEach(elm => elm != exceptNode && elm.classList.add('hidden'))
  },

  toggleColorPicker( inputElm ){
    const { value } = inputElm,
          // { position } = this.settings.theme,
          // totalHeight = this.DOM.scope.clientHeight,
          that = this

    const cPicker = inputElm.colorPicker || new ColorPicker({
      color: value,
      className: 'hidden',
      swatches: [],
      swatchesLocalStorage: true,

      // because the color-picker is outside the iframe, "onClickOutside" will not register
      // clicked within the iframe.
      onClickOutside(e){
        if( !cPicker.DOM.scope.classList.contains('hidden')  )
        that.hideColorPickers( cPicker.DOM.scope )

        let action = 'add'

        // if clicked on the input element, toggle picker's visibility
        if( e.target == inputElm )
          action = 'toggle'

        // if "escape" key was pressed, add the "hidden" class
        if( e.key == 'Escape' )
          action = 'add'

        cPicker.DOM.scope.classList[action]('hidden')
      },

      onInput(color){
        inputElm.value = color
        that.onInput({ type:'input', target:inputElm })
        that.onChange({ type:'change', target:inputElm })
      },
    })

    if( !document.body.contains(cPicker.DOM.scope) ){
      inputElm.colorPicker = cPicker
      document.body.appendChild(cPicker.DOM.scope)
    }

    reposition( this.DOM.iframe, cPicker.DOM.scope )
    cPicker.DOM.scope.classList.remove('hidden')

    // adjust screen position offsets to the color picker
    // const colorPickerHeight = cPicker.DOM.scope.clientHeight
    // if( totalHeight >= colorPickerHeight ){
    //   if( position.includes('top') ){
    //     cPicker.DOM.scope.style.setProperty('--offset', colorPickerHeight + (totalHeight - colorPickerHeight)/2)
    //   }
    // }
  },

  /**
   *
   * @param {Object} data Knob input properties to be applied, excluding some
   * @returns String
   */
  knobAttrs(data){
    var attributes = `name="${data.__name}"`,
        blacklist = ['label', 'type', 'onchange', 'cssvar', '__name']

    for( var attr in data ){
      if( attr == 'checked' && !data[attr] ) continue
      if( !blacklist.includes(attr.toLowerCase()) )
        attributes += ` ${attr}="${data[attr]}"`
    }

    return attributes
  },

  getKnobDataByName( name ){
    return this._knobs.filter(Boolean).find(d => d.__name == name)
  },

  getInputByName( name ){
    return this.DOM.scope.querySelector(`input[name="${name}"`)
  },

  getKnobElm( name ){
    return this.getInputByName(name).closest('.knobs__knob')
  },

  /**
   * updates the relevant DOM node (if CSS variable is applied)
   * should fire from a knob's input's (onchange) event listener
   * @param {Object}
   */
  updateDOM({ cssVar, value, type, __name:name }){
    if( !cssVar || !cssVar.length ) return

    var [cssVarName, cssVarUnit, CSSVarTarget] = cssVar,
        targetElms = CSSVarTarget || this.settings.CSSVarTarget,
        knobInput = this.getInputByName(name),
        action = 'setProperty';

    if( type == 'checkbox' && knobInput && !knobInput.checked )
      action = 'removeProperty';

    // units which are prefixed with '-' should not be used, and for presentational purposes only
    if( cssVarUnit && cssVarUnit[0] == '-' )
      cssVarUnit = '';

    // if is a refference to a single-node, place in an array.
    // cannot use instanceof to check if is an element because some elements might be in iframes:
    // https://stackoverflow.com/a/14391528/104380
    if( Object.prototype.toString.call(targetElms).includes("Element") )
      targetElms = [targetElms]

    if( targetElms && targetElms.length && value !== undefined && cssVarName )
      for( let elm of targetElms )
        elm.style[action](`--${cssVarName}`, value + (cssVarUnit||''));
  },

  /**
   * Apply all knobs changes and fire all knobs' "onChange" callbacks
   * @param {Object} knobsData specific knobs to apply to
   * @param {Boolean} reset should the value reset before applying
   */
  applyKnobs( knobsData, reset ){
    (knobsData || this._knobs).forEach(d => {
      if( !d || !d.type ) return

      // TEMP - skip resetting checkboxes until further improving the persist storage to support them
      if( d.type == 'checkbox' ) return

      var isCheckbox = d.type == 'checkbox',
          isRange = d.type == 'range',
          inputElm = this.getInputByName(d.__name),
          e = { target:inputElm },
          vKey = reset ? 'defaultValue' : 'value',
          resetTitle;

      if( isCheckbox )
        resetTitle = inputElm.checked = !!d.checked
      else
        resetTitle = inputElm.value = d[vKey]


      this.setResetKnobTitle(d.__name, resetTitle)

      // if( isRange )
      //   inputElm.parentNode.style.setProperty('--value', d[vKey])

      this.onInput(e)
      this.onChange(e)

      // for some reason, if the form was reset through the "reset" input,
      // the range slider's thumb is not moved because the value has not been refistered by the browser..
      // so need to set the value again..
      setTimeout(() => {
        inputElm.value = d[vKey]
      })

      this.setKnobChangedFlag(this.getKnobElm(d.__name), d.value != d.defaultValue)
    })
  },

  /**
   *
   * Sets the "title" attribute of the knob's "reset" button
   * @param {String} name [Knob name]
   * @param {String} title [text title, which is actually the default value of that knob]
   */
  setResetKnobTitle( name, title ){
    try{
      title = "Reset to " + title
      this.getKnobElm(name).querySelector('.knobs__knob__reset').title = title
    }
    catch(err){}
  },

  resetKnobByName( name ){
    this.setKnobChangedFlag(this.getKnobElm(name), false)
    this.applyKnobs([this.getKnobDataByName(name)], true)
  },

  calculateGroupsHeights(){
    var groupElms = this.DOM.form.querySelectorAll('.fieldset__group')

    groupElms.forEach(groupElm => {
      groupElm.style.setProperty('--height', groupElm.clientHeight)
    })
  },

  setIframeProps( opts ){
    var action = (this.state.visible == false ? 'remove' : 'set') + 'Property',
        iframeBodyElm = this.DOM.iframe.contentWindow.document.body,
        style = this.DOM.iframe.style,
        { heightOffset = 0 } = opts || {};


    if( action == 'setProperty' ){
      style.setProperty(`--knobsWidth`, '2000px')
      style.setProperty(`--knobsHeight`, '1000px')
    }

    var { clientWidth, clientHeight } = this.DOM.scope

    style[action](`--knobsWidth`, clientWidth + 'px')
    style[action](`--knobsHeight`, (+clientHeight + +heightOffset) + 'px')
  },

  // show/hide Knobs (as a whole)
  toggle( state ){
    if( state === undefined )
      state = !this.DOM.mainToggler.checked

    this.state.visible = state;
    this.DOM.mainToggler.checked = state;

    // briefly set a big width/height for the iframe so it could be meassured correctly
    this.setIframeProps()
  },

  build(){
    this.createIframe()
    setTimeout(this.bindEvents.bind(this))
  },

  /**
   * all the knobs are encapsulated inside an iframe for complete
   * sandboxing against outside styles/js potential interference.
   *
   * Creates & appends the iframe to the DOM
   * Also appends all the styles to the iframe
   */
  createIframe(){
    var iframeDoc,
        theme = this.settings.theme,
        cssText;

    this.DOM.iframe = document.createElement('iframe')
    this.DOM.iframe.setAttribute('class', 'knobsIframe')
    this.DOM.iframe.style.cssText = `
        border: none;
        position: fixed;
        z-index: 999999;
        ${(theme.position+" ").split(" ").join(":0;")}
        width: var(--knobsWidth, 56px);
        height: var(--knobsHeight, 56px);
    `

    // first append the iframe to the DOM
    this.settings.appendTo.appendChild(this.DOM.iframe)

    // now access is obtained to the iframe's document
    iframeDoc = this.DOM.iframe.contentWindow.document

    // inject HTML template to the iframe
    iframeDoc.open()

    // dump all the HTML & styles into the iframe
    iframeDoc.write(this.templates.scope.call(this))

    cssText = `.knobs{ ${this.getCSSVariables(theme)} }`
    cssText += mainStyles + theme.styles

    iframeDoc.head.insertAdjacentHTML("beforeend", `<style>${cssText}</style>`)

    // done manipulating the iframe's content
    iframeDoc.close()

    // save references to HTML elements within the iframe, for future access
    this.DOM.scope = iframeDoc.body.querySelector('.knobs')
    this.DOM.form = this.DOM.scope.querySelector('form')
    this.DOM.mainToggler = iframeDoc.getElementById('knobsToggle')

    this.render()
  },

  render(){
    // maps a flat knobs array into multiple groups, after each label (if label exists)
    // this step is needed so each group (after item in the knobs array after a "label" item) could be
    // expanded/collapsed individually.
    var knobsGroups = this._knobs.reduce((acc, knobData) => {
        if( knobData && !isObject(knobData) && acc[acc.length - 1].length ) acc.push([])
        acc[acc.length - 1].push(knobData)
        return acc
      }, [[]])

    // cleanup previous knobs fieldsets wrappers
    this.DOM.form.querySelectorAll('fieldset').forEach(elm => elm.remove())

    //create an HTML-string from the template
    var HTML = knobsGroups.map(this.templates.fieldset.bind(this)).join("")

    // inject knobs into the <fieldset> element
    this.DOM.form.insertAdjacentHTML('afterbegin', HTML)

    this.calculateGroupsHeights()

    // calculate iframe size

    this.toggle(this.DOM.mainToggler.checked)

    this.applyKnobs()

    // color picker CSS
    const colorPickerCSSExists = [...document.styleSheets].some(s => s.title == 'color-picker')

    if( !colorPickerCSSExists )
      document.head.insertAdjacentHTML('beforeend', `<style title='color-picker'>
      ${colorPickerStyles}
      .color-picker[style~='left:']{ z-index: 999999; position: fixed; }
      </style>`)
  },

  /**
   * This flag marks a knobs as "dirty" (one that was changed by the user), so the "reset" icon would be highlighted
   * @param {*} knobElm
   * @param {*} action
   */
  setKnobChangedFlag( knobElm, action ){
    knobElm && knobElm[(action == false ? 'remove' : 'set') + 'Attribute']('data-changed', true)
  }
}

export default Knobs