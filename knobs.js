(function (root, factory) {
  if (typeof define === "function" && define.amd) {
      define(factory)
  } else if (typeof exports === "object") {
      module.exports = factory()
  } else {
      root.Knobs = factory()
  }
}(this, function () {
  if (!window.CSS || !CSS.supports('top', 'var(--a)')) {
    return function(){}
  }

  // https://github.com/yairEO/ui-range
  var rangeStyles = `
    /* override-styles */
    .knobs .range {
      --primaryColor: #0366D6;
      --value-active-color: white;
      --value-background: tomato;
      --progress-color: #EEE;
      --thumb-size: 20px;
      --track-height: calc(var(--thumb-size)/2.5);
      --thumb-shadow: 0 0 3px rgba(0,0,0,.2);
      --ticks-thickness: 1px;
      --ticks-height: 0px;
    }

    .range {
      --primaryColor: #0366D6;
      --value-active-color: white;
      --value-background: white;
      --value-font: 700 12px/1 Arial;
      --progress-color: #EEE;
      --progress-shadow: 2px 2px 4px rgba(0,0,0, .1) inset;
      --fill-color: var(--primaryColor);
      --thumb-size: 16px;
      --track-height: calc(var(--thumb-size)/2);
      --thumb-shadow: 0 0 3px rgba(0,0,0,.2);
      --ticks-thickness: 1px;
      --ticks-height: 5px;
      --ticks-color: silver;
      --step: 1;
      --ticks-count: (var(--max) - var(--min)) / var(--step);
      --maxTicksAllowed: 30;
      --too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));
      --x-step: Max( var(--step), var(--too-many-ticks) * (var(--max) - var(--min)) );
      --tickInterval: 100/((var(--max) - var(--min)) / var(--step)) * var(--tickEvery, 1);
      --tickIntervalPerc: calc((100% - var(--thumb-size))/( (var(--max) - var(--min)) / var(--x-step) ) * var(--tickEvery, 1));
      --completed: calc((var(--value) - var(--min) ) / (var(--max) - var(--min)) * 100);
      --LTR: 1;
      display: inline-block;
      height: max(var(--track-height), var(--thumb-size));
      background: linear-gradient(to right, var(--ticks-color) var(--ticks-thickness), transparent 1px) repeat-x;
      background-size: var(--tickIntervalPerc) var(--ticks-height);
      background-position-x: calc(var(--thumb-size)/2);
      background-position-y: var(--flip-y, bottom);
      position: relative;
      z-index: 1;
      padding-bottom: var(--flip-y, var(--ticks-height));
      padding-top: calc(var(--flip-y) * var(--ticks-height));
    }
    [dir=rtl] .range {
      --LTR: -1;
    }
    .range[data-ticks-position=top] {
      --flip-y: 1;
    }
    .range::before, .range::after {
      --offset: calc(var(--thumb-size)/2);
      content: counter(x);
      font: 12px Arial;
      position: absolute;
      bottom: var(--flip-y, -2.5ch);
      top: calc(-2.5ch * var(--flip-y));
      opacity: var(--min-max-opacity, 0.5);
      pointer-events: none;
    }
    .range::before {
      counter-reset: x var(--min);
      left: var(--offset);
      transform: translateX(calc(-50% * var(--LTR)));
    }
    [dir=rtl] .range::before {
      left: auto;
      right: var(--offset);
    }
    .range::after {
      counter-reset: x var(--max);
      right: var(--offset);
      transform: translateX(calc(50% * var(--LTR)));
    }
    [dir=rtl] .range::after {
      right: auto;
      left: var(--offset);
    }
    .range__progress {
      position: absolute;
      left: 0;
      top: calc(50% - var(--ticks-height)/2);
      transform: var(--flip-y, translateY(-50%) translateZ(0));
      width: 100%;
      height: calc(var(--track-height));
      pointer-events: none;
      z-index: -1;
      box-shadow: var(--progress-shadow);
      border-radius: 20px;
      background: var(--fill-color, white);
    }
    .range__progress::after {
      content: "";
      display: block;
      margin-left: auto;
      margin-right: -1px;
      width: calc((100% - var(--completed) * 1%) + (var(--completed)/100) * var(--thumb-size));
      height: 100%;
      background: var(--progress-color, #EEE);
      box-shadow: inherit;
      border-radius: 0 20px 20px 0;
    }
    [dir=rtl] .range__progress::after {
      margin-right: auto;
      margin-left: -1px;
      border-radius: 20px 0 0 20px;
    }
    .range > input {
      -webkit-appearance: none;
      width: 100%;
      height: var(--thumb-size);
      margin: 0;
      cursor: -webkit-grab;
      cursor: grab;
      outline: none;
      background: none;
    }
    .range > input::-webkit-slider-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      border-radius: 50%;
      background: var(--thumb-color, white);
      border: 1px solid silver;
      box-shadow: var(--inner-shadow, 0 0), var(--thumb-shadow);
    }
    .range > input::-moz-slider-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      border-radius: 50%;
      background: var(--thumb-color, white);
      border: 1px solid silver;
      box-shadow: var(--inner-shadow, 0 0), var(--thumb-shadow);
    }
    .range > input::-ms-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      border-radius: 50%;
      background: var(--thumb-color, white);
      border: 1px solid silver;
      box-shadow: var(--inner-shadow, 0 0), var(--thumb-shadow);
    }
    .range > input:active {
      cursor: grabbing;
      --thumb-color: var(--fill-color);
      --inner-shadow: 0 0 0 calc(var(--thumb-size)/4) inset white;
    }
    .range > input:active + output {
      transition: 0s;
    }
    .range > input:hover + output {
      --value-background: var(--primaryColor);
      color: var(--value-active-color);
      transform: translate(var(--x-offset), 0);
      box-shadow: 0 0 0 3px var(--value-background);
    }
    .range > output {
      --x-offset: calc(var(--completed) * -1% * var(--LTR));
      --pos: calc(((var(--value) - var(--min))/(var(--max) - var(--min))) * 100%);
      pointer-events: none;
      position: absolute;
      z-index: 5;
      background: var(--value-background);
      border-radius: 10px;
      padding: 0 4px;
      top: -3ch;
      left: var(--pos);
      transform: translate(var(--x-offset), 6px);
      transition: all 0.12s ease-out, left 0s, top 0s;
    }
    [dir=rtl] .range > output {
      left: auto;
      right: var(--pos);
    }
    .range > output::after {
      content: var(--text-value);
      font: var(--value-font);
    }
  `

  function controlStyles( theme ){
    var { backgroud, textColor, ...th } = theme;

    return `
    /* bottom controls (apply/reset) */
    .knobs__controls {
      text-align: right;
      padding: 0 12px 12px;
    }

    .knobs__controls > input {
      color: black;
      margin-left: 1em;
    }
  `
  }

  function getPositionsStyles(){
    var s = (pos) => `.knobs[data-position~='${pos}']`

    var bottom = `
      ${s('bottom')} > label{ top: 0; }

      ${s('bottom')}[data-position~='right'] .knobs__controls{
        padding-right: 40px;
      }

      ${s('bottom')} #knobsToggle:checked + label{
        top: auto;
        bottom: 10px;
      }
    `

    var left = `
      ${s('left')}{ --LTR-Bool: -1; }

      ${s('left')} > label{ right: 3px; }

      ${s('left')} #knobsToggle:checked + label{
        left:10px; right:auto;
      }

      ${s('left')} .knobs__controls > :first-child:not(:only-child){ margin-left: 40px; }
    `

    return bottom + left;
  }

  // apply only inside the iframe
  function getMainStyles( theme ){
    var { backgroud, textColor, border, ...th } = theme;

    return `
    label, button, input{ cursor:pointer; font-family:Arial, sans-serif; }

    body, form{ padding:0; margin:0; }

    ${controlStyles(theme)}

    #knobsToggle:checked ~ * {
      transform: none;
      transition: calc(var(--in-duration) * 1s) var(--in-easing);
    }

    #knobsToggle:checked ~ * fieldset {
      transform: none;
      opacity: 1;
      transition: calc(var(--in-duration) * 1s) calc(var(--in-duration) * .5s) ease-out;
    }

    .knobs {
      --knobs-gap: 3px;
      --in-easing: cubic-bezier(.75,0,.35,1);
      --in-duration: .3;
      --LTR-Bool: 1;  /* -1 for RTL */

      font: 13px/1 'Fira Sans Condensed', sans-serif;
      color: ${textColor};
      position: fixed;
      z-index: 999999;
      top: 0;
      right: 0;

      ${ theme.RTL && `
        direction: rtl;
      `}
    }

    ${getPositionsStyles()}

    .knobs label {
      user-select: none;
      cursor: pointer;
    }

    /* show/hide icon */
    .knobs > label {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      line-height: 1;
      z-index: 999;
    }

    /* the <form> element */
    .knobs__labels {
      background: ${backgroud};
      border: ${border};
      transform: translateX(calc(100% * var(--LTR-Bool)));
    }

    .knobs__labels fieldset {
      display: table;
      border: 0;
      padding: 0;
      margin: 0;
      padding: 30px 12px 12px;
      opacity: 0;
      transform: translateX(calc(15% * var(--LTR-Bool)));
    }

    .knobs__seperator{
      display: flex;
      align-items: center;
      margin: 1.2em 0 .7em;
      font-weight: 500;
    }

    .knobs__seperator::before,
    .knobs__seperator::after{
      content: '';
      height: 1px;
      background: ${textColor};
      flex: 1;
      opacity: .25;
    }

    .knobs__labels hr{
      border: 0;
      border-top: 1px solid ${textColor};
      opacity: .25;
    }

    .knobs__knob{
      display: flex;
      position: relative;
    }

    .knobs__knob__reset{
      margin-right: 5px;
      color: inherit;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
      opacity: 0;
      margin-left: -10px;
      transition: .1s;
      outline: none;
    }

    .knobs__label::after{
      content: attr(data-type);
      opacity: .5;
      margin-left: 1ch;
    }

    .knobs__knob:hover .knobs__knob__reset{ opacity: .4; }
    .knobs__knob:hover .knobs__knob__reset:hover{ opacity:1; }

    .knobs__labels label {
      flex: 1;
      display: flex;

    }

    .knobs__labels label > * {
      padding: var(--knobs-gap, 6px) 0;
    }

    .knobs__labels .knobs__knob__range,
    .knobs__labels input[type=text] {
      min-width: 200px;
    }

    /* label's test only */
    .knobs__label {
      margin-right: 2ch;
      white-space: nowrap;
      display: flex;
      align-items: center;
      ${ theme.RTL && `
        margin-right: auto;
        margin-left: 2ch;
      `}
    }

    .knobs__labels label > :last-child {
      flex: 1;
      text-align: right;
      ${ theme.RTL && `
        text-align: left;
      `}
    }

    input[type="color"]{
      -webkit-appearance: none;
      appearance: none;
      border: 0;
      padding: 0;
      border-radius: 50%;
      width: 50px;
      height: 20px;
      background: none;
      cursor: pointer;
    }

    ${rangeStyles}
    ${theme.styles}
  `
  }

  function mergeDeep(...objects) {
    const isObject = obj => obj && typeof obj === 'object'

    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        var pVal = prev[key], oVal = obj[key];

        if (Array.isArray(pVal) && Array.isArray(oVal))
          prev[key] = pVal.concat(...oVal);

        else
          prev[key] = (isObject(pVal) && isObject(oVal))
            ? mergeDeep(pVal, oVal)
            : oVal;
      })

      return prev
    }, {});
  }

  var raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60))

  function Knobs(settings){
    if( !settings ) return
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
        styles: '',
        RTL: false,
        position: 'top right',
        backgroud: "rgba(0,0,0,1)",
        textColor: "white",
        border: 'none',
        light: {
          color1: "rgba(255,255,255,.1)",
          textColor: "white"
        }
      }
    },

    // iframe (inner) styles
    styles(){
      if( this.settings.theme.mode == 'light' ){
        Object.assign(this.settings.theme, this.settings.theme.light)
      }

      return getMainStyles(this.settings.theme)
    },

    parseHTML( s ){
        var parser = new DOMParser(),
            node = parser.parseFromString(s.trim(), "text/html")
        return node.body.firstElementChild
    },

    templates: {
      scope: function(){
        const {visible, knobs, live} = this.settings;

        return `
          <aside class='knobs' data-position='${this.settings.theme.position}'>
            <input hidden type='checkbox' ${visible ? 'checked' : ''} id='knobsToggle' />
            <label title='Demo Settings' ${visible == 2 ? "style='display:none'" : ''} for='knobsToggle'>⚙️</label>
            <form class='knobs__labels'>
              <fieldset>
              ${ knobs.map(this.templates.knob.bind(this)).join("") }
              ${this.templates.knob.call(this)}
              </fieldset>
              <section class='knobs__controls'>
                <input type="reset" value="Reset">
                ${live ? '' : `<input type="submit" value="Apply">`}
              </section>
            </form>
          </aside>
        `
      },

      knob: function(data){
        if( data && data.type )
          return `<div class='knobs__knob'>
              <button type='button' name='${data.__name}' class='knobs__knob__reset' title='reset'>↩</button>
              <label>
                <div class='knobs__label' ${data.cssVar && data.cssVar[1] ? `data-type='${data.cssVar[1]}'` : ''}>${data.label}</div>
                <div>
                  ${ data.type == 'range' ? `
                  <div class="range" style="--step:${data.step||1}; --min:${data.min}; --max:${data.max}; --value:${data.value}; --text-value:'${data.value}'">
                    <input type="range" ${this.knobAttrs(data)} oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify(this.value))">
                    <output></output>
                    <div class='range__progress'></div>
                  </div>`
                  :
                  `<input type='${data.type}' ${this.knobAttrs(data)}>`
                  }
                </div>
              </label>
            </div>
          `

        if( data && typeof data == 'string' )
          return `<div class='knobs__seperator'>&nbsp;&nbsp;${data}&nbsp;&nbsp;</div>`

        return '<hr/>'
      },
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
          targetElm = CSSVarTarget || this.settings.CSSVarTarget,
          knobInput = this.getInputByName(name),
          action = 'setProperty';

      if( type == 'checkbox' && !knobInput.checked )
        action = 'removeProperty';

      if( targetElm && value !== undefined && cssVarName )
        targetElm.style[action](`--${cssVarName}`, value + (cssVarUnit||''));
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

      var action = (state ? 'set' : 'remove') + 'Property',
          { clientWidth, clientHeight } = this.DOM.scope;

      this.DOM.iframe.style[action](`--knobsWidth`, clientWidth + 'px')
      this.DOM.iframe.style[action](`--knobsHeight`, clientHeight + 'px')
      this.DOM.mainToggler.checkd = state;
    },

    build(){
      var iframeDoc,
          theme = this.settings.theme;

      if( !this.settings.knobs || !this.settings.knobs.length )
        return

      this.generateIds()
      this.bindedEvents = {
        onChange: this.onChange.bind(this),
        onReset: this.resetAll.bind(this, null),
        onSubmit: this.onSubmit.bind(this),
        onClick: this.onClick.bind(this)
      }

      var { onChange, onReset, onSubmit, onClick } = this.bindedEvents

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
      iframeDoc.write(this.templates.scope.call(this))
      iframeDoc.head.insertAdjacentHTML("beforeend", `<style>${this.styles()}</style>`)
      iframeDoc.close()

      this.DOM.scope = iframeDoc.body.firstElementChild
      this.DOM.form = this.DOM.scope.querySelector('form')
      this.DOM.mainToggler = iframeDoc.getElementById('knobsToggle')

      this.DOM.form.addEventListener('change', onChange)
      this.DOM.form.addEventListener('input', onChange)
      this.DOM.form.addEventListener('reset', onReset)
      this.DOM.form.addEventListener('submit', onSubmit)
      this.DOM.scope.addEventListener('click', onClick)
      this.DOM.mainToggler.addEventListener('change', e => this.toggle(e.target.checked))

      this.toggle(this.DOM.mainToggler.checked)
      this.resetAll()
    }
  }

  return Knobs
}));