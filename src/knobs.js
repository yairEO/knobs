import mainStyles from './styles/styles.scss'
import isObject from './utils/isObject'
import { mergeDeep } from './utils/mergeDeep'
import isModernBrowser from './utils/isModernBrowser'
import * as templates from './templates'

var raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60))

function Knobs(settings){
  // since Knobs relies on CSS variables, no need to proceed if browser support is inadequate
  if ( !isModernBrowser())
    return this

  const { knobs, ...restOfSettings } = settings || {}

  // manual deep-clone the "knobs" setting, because for hours I couldn't find a single piece of code
  // on the internet which was able to correctly clone it
  this.knobs = knobs
    ? knobs.map(knob => (
      knob.cssVar
        ? {...knob, cssVar:[...knob.cssVar]}
        : isObject(knob)
          ? {...knob}
          : knob
    ))
    : []

  // for the rest, deep cloining appear to work fine
  this.settings = mergeDeep({...this._defaults, appendTo:document.body}, restOfSettings)

  this.DOM = {}
  this.state = {}
  this.build()
}

Knobs.prototype = {
  _types: ['range', 'color', 'checkbox', 'text'],
  _defaults: {
    visible: 0,
    live: true,
    theme: {
      flow: 'horizontal',
      styles: '',
      RTL: false,
      position: 'top right',
      primaryColor: '#0366D6',
      "range-value-background": '#FFF',
      background: "rgba(0,0,0,1)",
      textColor: "white",
      border: 'none',
    }
  },

  // iframe (inner) styles
  getCSSVariables({ flow, styles, RTL, position, ...vars }){
    var output = '', p;

    for( p in vars )
      output += `--${p}:${vars[p]}; `

    return output
  },

  parseHTML( s ){
      var parser = new DOMParser(),
          node = parser.parseFromString(s.trim(), "text/html")
      return node.body.firstElementChild
  },

  templates: {
    scope: templates.scope,
    knob: templates.knob,
    fieldset: templates.fieldset
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
      if( !blacklist.includes(attr.toLowerCase()) )
        attributes += ` ${attr}="${data[attr]}"`
    }

    return attributes
  },

  getKnobDataByName( name ){
    return this.knobs.filter(Boolean).find(d => d.__name == name)
  },

  getInputByName( name ){
    return this.DOM.scope.querySelector(`input[name="${name}"`)
  },

  getKnobElm( name ){
    return this.getInputByName(name).closest('.knobs__knob')
  },

  // if settings.CSSVarTarget exists or
  updateDOM({ cssVar, value, type, __name:name }){
    if( !cssVar || !cssVar.length ) return

    var [cssVarName, cssVarUnit, CSSVarTarget] = cssVar,
        targetElms = CSSVarTarget || this.settings.CSSVarTarget,
        knobInput = this.getInputByName(name),
        action = 'setProperty';

    if( type == 'checkbox' && knobInput && !knobInput.checked )
      action = 'removeProperty';

    // if is a refference to a single-node, place in an array.
    // cannot use instanceof to check if is an element because some elements might be in iframes:
    // https://stackoverflow.com/a/14391528/104380
    if( Object.prototype.toString.call(targetElms).includes("Element") )
      targetElms = [targetElms]

    if( targetElms && targetElms.length && value !== undefined && cssVarName )
      for( let elm of targetElms )
        elm.style[action](`--${cssVarName}`, value + (cssVarUnit||''));
  },

  resetAll( knobsData ){
    (knobsData || this.knobs).forEach(d => {
      if( !d || !d.type ) return

      var isCheckbox = d.type == 'checkbox',
          isRange = d.type == 'range',
          inputElm = this.getInputByName(d.__name),
          e = { target:inputElm },
          resetTitle;

      if( isCheckbox )
        resetTitle = inputElm.checked = !!d.checked
      else
      resetTitle = inputElm.value = d.value

      this.setResetKnobTitle(d.__name, resetTitle)

      if( isRange )
        inputElm.parentNode.style.setProperty('--value', d.value)

      this.onInput(e)
      this.onChange(e)
      this.setKnobChangedFlag(this.getKnobElm(d.__name), false)
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
    this.resetAll([this.getKnobDataByName(name)])
  },

  generateIds(){
    this.knobs.forEach(knobData => {
      if( knobData && knobData.type )
        knobData.__name = knobData.label.replace('/ /g','-') + Math.random().toString(36).slice(-6)
    })
  },

  /**
   * Applys changes manually if `settings.live` is `false`
   */
  onSubmit(e){
    e.preventDefault()

    var elements = e.target.querySelectorAll('input')
    this.settings.live = true
    elements.forEach(elm => this.onChange({ target:{value:elm.value, name:elm.name} }))
    this.settings.live = false
    return false
  },

  onClick(e){
    var target = e.target,
        is = n => target.classList.contains(n)

    if( is('knobs__knob__reset') ){
      this.resetKnobByName(target.name)
    }
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

    // briefly set a big width/height for the iframe so it could be meassured correctly
    this.setIframeProps()

    this.DOM.mainToggler.checked = state;
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
    this.generateIds()

    // maps a flat knobs array into multiple groups, after each label (if label exists)
    // this step is needed so each group (after item in the knobs array after a "label" item) could be
    // expanded/collapsed individually.
    var knobsGroups = this.knobs.reduce((acc, knobData) => {
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

    this.resetAll()
  },

  onChange(e){
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
  },

  onInput(e){
    var inputelm = e.target;

    inputelm.parentNode.style.setProperty('--value',inputelm.value);
    inputelm.parentNode.style.setProperty('--text-value', JSON.stringify(inputelm.value))
  },

  setKnobChangedFlag( knobElm, action ){
    knobElm && knobElm[(action == false ? 'remove' : 'set') + 'Attribute']('data-changed', true)
  },

  bindEvents(){
    this.eventsRefs = this.eventsRefs || {
      onChange: e => {
        // only knobs' inputs have a "name" attribute
        if( !e.target.name ) return

        this.setKnobChangedFlag( this.getKnobElm(e.target.name) )
        this.onChange(e)
      },
      onInput: e => {
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
      onTransitionEnd: e => {
        if( e.target.classList.contains('fieldset__group') ){
          this.setIframeProps()
        }
      },
      onReset : this.resetAll.bind(this, null),
      onSubmit: this.onSubmit.bind(this),
      onClick : this.onClick.bind(this)
    }

    var { onChange, onInput, onReset, onSubmit, onClick, onTransitionEnd } = this.eventsRefs

    this.DOM.form.addEventListener('change', onChange)
    this.DOM.form.addEventListener('input', onInput)
    this.DOM.form.addEventListener('reset', onReset)
    this.DOM.form.addEventListener('submit', onSubmit)
    this.DOM.scope.addEventListener('click', onClick)
    this.DOM.mainToggler.addEventListener('change', e => this.toggle(e.target.checked))

    this.DOM.form.addEventListener('transitionend', onTransitionEnd)
  }
}

export default Knobs