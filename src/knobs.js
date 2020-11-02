import mainStyles from './styles/styles.scss'
import mergeDeep from './utils/mergeDeep'
import isModrenBrowser from './utils/isModrenBrowser'
import { scope as scopeTemplate, knob as knobTemplate } from './templates'

var raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60))

function Knobs(settings){
  // since Knobs relies on CSS variables, no need to proceed if browser support is inadequate
  if ( !settings || !isModrenBrowser())
    return this

  this.settings = mergeDeep({}, this._defaults, {appendTo: document.body}, settings)
  this.DOM = {}
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
      backgroud: "rgba(0,0,0,1)",
      textColor: "white",
      border: 'none',
    }
  },

  // iframe (inner) styles
  getCSSVariables({ flow, styles, RTL, position, ...vars }){
    var output = '', p;

    for( p in vars )
      output += `--${p}:${vars[p]}; `

    console.log(output)
    return output
  },

  parseHTML( s ){
      var parser = new DOMParser(),
          node = parser.parseFromString(s.trim(), "text/html")
      return node.body.firstElementChild
  },

  templates: {
    scope: scopeTemplate,
    knob: knobTemplate
  },

  /**
   *
   * @param {Object} data Knob input properties to be applied, excluding some
   * @returns String
   */
  knobAttrs(data){
    var attributes = `name="${data.__name}"`,
        blacklist = ['label', 'type', 'onchange', 'cssvar']

    for( var attr in data ){
      if( !blacklist.includes(attr.toLowerCase()) )
        attributes += ` ${attr}="${data[attr]}"`
    }

    return attributes
  },

  getKnobDataByName(name){
    return this.settings.knobs.filter(Boolean).find(d => d.__name == name)
  },

  getInputByName(name){
    return this.DOM.scope.querySelector(`input[name="${name}"`)
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

  // if settings.CSSVarTarget exists or
  updateDOM({ cssVar, value, type, __name:name }){
    if( !cssVar || !cssVar.length ) return

    var [cssVarName, cssVarUnit, CSSVarTarget] = cssVar,
        targetElms = CSSVarTarget || this.settings.CSSVarTarget,
        knobInput = this.getInputByName(name),
        action = 'setProperty';

    if( type == 'checkbox' && !knobInput.checked )
      action = 'removeProperty';

    // if is a refference to a single-node, place in an array
    if( targetElms instanceof HTMLElement )
      targetElms = [targetElms]

    if( targetElms && targetElms.length && value !== undefined && cssVarName )
      for( let elm of targetElms )
        elm.style[action](`--${cssVarName}`, value + (cssVarUnit||''));
  },

  resetAll(knobsData){
    (knobsData || this.settings.knobs).forEach(d => {
      if( !d || !d.type ) return

      var isCheckbox = d.type == 'checkbox',
          isRange = d.type == 'range',
          e = { target:{ value:d.value, name:d.__name } },
          inputElm = this.getInputByName(d.__name);

      if( isCheckbox )
        inputElm.checked = !!d.checked
      else
        inputElm.value = d.value

      if( isRange )
        inputElm.parentNode.style.setProperty('--value', d.value)

      this.onChange(e)
    })
  },

  resetKnobByName(name){
    this.resetAll([this.getKnobDataByName(name)])
  },

  generateIds(){
    this.settings.knobs.forEach(knobData => {
      if( knobData && knobData.type )
        knobData.__name = knobData.label.replace('/ /g','-') + Math.random().toString(36).slice(-6)
    })
  },

  onSubmit(e){
    e.preventDefault()

    var elements = [...e.target.elements]
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

  // show/hide content
  toggle(state){
    if( state === undefined )
      state = !this.DOM.mainToggler.checked

    // briefly set a big width/height for the iframe so it could be meassured correctly
    if( state ){
      this.DOM.iframe.style.setProperty(`--knobsWidth`, '1000px')
      this.DOM.iframe.style.setProperty(`--knobsHeight`, '1000px')
    }

    var action = (state ? 'set' : 'remove') + 'Property',
        { clientWidth, clientHeight } = this.DOM.scope;

    this.DOM.iframe.style[action](`--knobsWidth`, clientWidth + 'px')
    this.DOM.iframe.style[action](`--knobsHeight`, clientHeight + 'px')
    this.DOM.mainToggler.checkd = state;
  },

  build(){
    if( !this.settings.knobs || !this.settings.knobs.length )
      return

    this.generateIds()
    this.createIframe()
    this.bindEvents()
    this.toggle(this.DOM.mainToggler.checked)
    this.resetAll()
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
        width: var(--knobsWidth, 35px);
        height: var(--knobsHeight, 30px);
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
    this.DOM.scope = iframeDoc.body.firstElementChild
    this.DOM.form = this.DOM.scope.querySelector('form')
    this.DOM.mainToggler = iframeDoc.getElementById('knobsToggle')
  },

  bindEvents(){
    this.eventsRefs = {
      onChange: this.onChange.bind(this),
      onReset : this.resetAll.bind(this, null),
      onSubmit: this.onSubmit.bind(this),
      onClick : this.onClick.bind(this)
    }

    var { onChange, onReset, onSubmit, onClick } = this.eventsRefs

    this.DOM.form.addEventListener('change', onChange)
    this.DOM.form.addEventListener('input', onChange)
    this.DOM.form.addEventListener('reset', onReset)
    this.DOM.form.addEventListener('submit', onSubmit)
    this.DOM.scope.addEventListener('click', onClick)
    this.DOM.mainToggler.addEventListener('change', e => this.toggle(e.target.checked))
  }
}

export default Knobs