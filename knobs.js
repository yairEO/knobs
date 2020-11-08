
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Knobs = factory());
}(this, (function () { 'use strict';

  var mainStyles = "label,button,input{cursor:pointer;font:12px Arial, sans-serif}body,form{padding:0;margin:0}.poweredBy{float:left;text-decoration:none;color:inherit;padding:3px;font-size:10px;opacity:.5;transition:.15s}.poweredBy:hover{color:var(--primaryColor);opacity:1}#knobsToggle:checked ~ .knobs__labels{transform:none;transition:calc(var(--in-duration) * 1s) var(--in-easing)}#knobsToggle:checked ~ .knobs__labels fieldset,#knobsToggle:checked ~ .knobs__labels .knobs__controls{transform:none;opacity:1;transition:calc(var(--in-duration) * 1s) calc(var(--in-duration) * .5s) ease-out}.knobs{--knobs-gap: 3px;--in-easing: cubic-bezier(.75,0,.35,1);--in-duration: .3;--color-size: 22px;--LTR-Bool: 1;font:12px/1 'Fira Sans Condensed', sans-serif;color:var(--textColor);position:fixed;z-index:999999;top:0;right:0}.knobs[data-flow='compact']{--color-size: 16px}.knobs[data-flow='compact'] label[data-type='range']{flex-flow:column}.knobs[data-flow='compact'] label[data-type='range'] .knobs__label{margin:0;padding:0}.knobs label{user-select:none;cursor:pointer}.knobs>label{position:absolute;top:10px;right:10px;font-size:20px;line-height:1;z-index:999}.knobs__labels{background:var(--background);border:var(--border);transform:translateX(calc(100% * var(--LTR-Bool)))}.knobs__labels fieldset{display:table;border:0;padding:0;margin:0;padding:30px 12px 12px;opacity:0;transform:translateX(calc(15% * var(--LTR-Bool)))}.knobs__seperator{display:flex;align-items:center;margin:1.2em 0 .7em;font-weight:700}.knobs__seperator::before,.knobs__seperator::after{content:'';height:1px;background:var(--textColor);flex:1;opacity:.25}.knobs__labels hr{border:0;border-top:1px solid var(--textColor);opacity:.25}.knobs__labels hr:last-of-type{margin-bottom:0}.knobs__knob{display:flex;position:relative}.knobs__knob__reset{margin-right:5px;color:inherit;background:none;border:0;padding:0;cursor:pointer;opacity:0;margin-left:-10px;margin-bottom:var(--knobs-gap, 6px);align-self:flex-end;transition:.1s;outline:none}.knobs__knob__reset:hover{opacity:1}.knobs__knob:hover .knobs__knob__reset{opacity:.4}.knobs__label::after{content:attr(data-type);opacity:.5;margin-left:1ch}.knobs__labels label{flex:1;display:flex}.knobs__labels label>*{padding:var(--knobs-gap, 6px) 0}.knobs__labels .range,.knobs__labels input[type=text]{min-width:200px}.knobs__label{margin-right:2ch;white-space:nowrap;display:flex;align-items:center}.knobs__labels label>:last-child{flex:1;text-align:right}.knobs[data-position~='bottom']>label{top:0}.knobs[data-position~='bottom'][data-position~='right'] .knobs__controls{padding-right:40px}.knobs[data-position~='bottom'] #knobsToggle:checked+label{top:auto;bottom:10px}.knobs[data-position~='left']{--LTR-Bool: -1}.knobs[data-position~='left']>label{right:3px}.knobs[data-position~='left'] #knobsToggle:checked+label{left:10px;right:auto}.knobs[data-position~='left'] .knobs__controls>:first-child:not(:only-child){margin-left:26px}.knobs .range{--primaryColor: inherit;--value-active-color: white;--value-background: transparent;--progress-color: #444;--thumb-size: 20px;--track-height: calc(var(--thumb-size)/3);--thumb-shadow: 0 0 3px rgba(0,0,0,.2);--ticks-thickness: 1px;--ticks-height: 0px;--show-min-max: none;color:transparent}.range{--primaryColor: #0366D6;--value-active-color: white;--value-background: white;--value-font: 700 12px/1 Arial;--progress-color: #EEE;--progress-shadow: 2px 2px 4px rgba(0,0,0, .1) inset;--fill-color: var(--primaryColor);--thumb-size: 16px;--track-height: calc(var(--thumb-size)/2);--thumb-shadow: 0 0 3px rgba(0,0,0,.2);--ticks-thickness: 1px;--ticks-height: 5px;--ticks-color: silver;--step: 1;--ticks-count: (var(--max) - var(--min)) / var(--step);--maxTicksAllowed: 30;--too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));--x-step: Max( var(--step), var(--too-many-ticks) * (var(--max) - var(--min)) );--tickInterval: 100/((var(--max) - var(--min)) / var(--step)) * var(--tickEvery, 1);--tickIntervalPerc: calc((100% - var(--thumb-size))/( (var(--max) - var(--min)) / var(--x-step) ) * var(--tickEvery, 1));--completed: calc((var(--value) - var(--min) ) / (var(--max) - var(--min)) * 100);--LTR: 1;display:inline-block;height:Max(var(--track-height), var(--thumb-size));background:linear-gradient(to right, var(--ticks-color) var(--ticks-thickness), transparent 1px) repeat-x;background-size:var(--tickIntervalPerc) var(--ticks-height);background-position-x:calc(var(--thumb-size)/2);background-position-y:var(--flip-y, bottom);position:relative;z-index:1;padding-bottom:var(--flip-y, var(--ticks-height));padding-top:calc(var(--flip-y) * var(--ticks-height))}[dir=\"rtl\"] .range{--LTR: -1}.range[data-ticks-position='top']{--flip-y: 1}.range::before,.range::after{--offset: calc(var(--thumb-size)/2);content:counter(x);display:var(--show-min-max, block);font:12px Arial;position:absolute;bottom:var(--flip-y, -2.5ch);top:calc(-2.5ch * var(--flip-y));opacity:var(--min-max-opacity, 0.5);pointer-events:none}.range::before{counter-reset:x var(--min);left:var(--offset);transform:translateX(calc(-50% * var(--LTR)))}[dir='rtl'] .range::before{left:auto;right:var(--offset)}.range::after{counter-reset:x var(--max);right:var(--offset);transform:translateX(calc(50% * var(--LTR)))}[dir='rtl'] .range::after{right:auto;left:var(--offset)}.range__progress{position:absolute;left:0;top:calc(50% - var(--ticks-height)/2);transform:var(--flip-y, translateY(-50%) translateZ(0));width:100%;height:calc(var(--track-height));pointer-events:none;z-index:-1;box-shadow:var(--progress-shadow);border-radius:20px;background:var(--fill-color, white)}.range__progress::after{content:'';display:block;margin-left:auto;margin-right:-1px;width:calc((100% - var(--completed) * 1%) + (var(--completed)/100) * var(--thumb-size)/2);height:100%;background:var(--progress-color, #EEE);box-shadow:inherit;border-radius:0 20px 20px 0}[dir=\"rtl\"] .range__progress::after{margin-right:auto;margin-left:-1px;border-radius:20px 0 0 20px}.range>input{-webkit-appearance:none;width:100%;height:var(--thumb-size);margin:0;cursor:-webkit-grab;cursor:grab;outline:none;background:none}.range>input::-webkit-slider-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input::-moz-slider-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input::-ms-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input:active{cursor:grabbing;--thumb-color: var(--fill-color);--inner-shadow: 0 0 0 calc(var(--thumb-size)/4) inset white}.range>input:active+output{transition:0s}.range>input:hover+output{--value-background: var(--primaryColor);color:var(--value-active-color);transform:translate(var(--x-offset), 0);box-shadow:0 0 0 3px var(--value-background)}.range>output{--x-offset: calc(var(--completed) * -1% * var(--LTR));--pos: calc(((var(--value) - var(--min))/(var(--max) - var(--min))) * 100%);pointer-events:none;position:absolute;z-index:5;background:var(--value-background);border-radius:10px;padding:0 4px;top:-3ch;left:var(--pos);transform:translate(var(--x-offset), 6px);transition:all .12s ease-out, left 0s, top 0s}[dir='rtl'] .range>output{left:auto;right:var(--pos)}.range>output::after{content:var(--text-value);font:var(--value-font)}.knobs .switch{--color-bg: #444;--color-bg-on: #444;--thumb-color-off: #d75d4a;--thumb-color-on: #4ec964;--thumb-scale: 1.33;--width-multiplier: 2.5;--thumb-animation-pad: 15%;--size: 11px}.knobs .switch input:focus+div{outline:none}.switch{--color-bg: #E1E1E1;--color-bg-on: #16B5FF;--thumb-color-on: white;--thumb-color-off: var(--thumb-color-on);--thumb-scale: 1;--size: 16px;--duration: .18s;--width-multiplier: 2.5;--thumb-animation-pad: 15%;user-select:none;display:inline-flex;align-items:center}@keyframes switchMoveThumb{50%{padding:0 var(--thumb-animation-pad)}}@keyframes switchMoveThumb1{50%{padding:0 var(--thumb-animation-pad)}}.switch--textRight .switch__label{order:10;padding:0 0 0 .4em}.switch>div{cursor:pointer}.switch__label{order:0;padding-right:.4em;color:var(--label-color)}.switch__gfx{--thumb-left: 0%;--transform: translateX(calc(var(--thumb-left) * -1)) scale(var(--thumb-scale));order:5;padding:3px;position:relative;background:var(--bg, var(--color-bg));border-radius:50px;width:calc(var(--size) * var(--width-multiplier));transition:var(--duration);background-size:4px 4px}.switch__gfx::before{content:'';display:block;position:relative;left:var(--thumb-left);background:var(--thumb-color, var(--thumb-color-off));border-radius:var(--size);width:var(--size);height:var(--size);transform:var(--transform);transition:var(--duration);animation:switchMoveThumb var(--duration) ease 1}.switch input{position:absolute;opacity:0}.switch input[disabled]+div{background-image:linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%)}.switch input:disabled ~ div{cursor:not-allowed}.switch input:indeterminate+div{--thumb-left: 50%}.switch input:checked+div{--bg: var(--color-bg-on);--thumb-left: 100%;--thumb-color: var(--thumb-color-on)}.switch input:checked+div::before{animation-name:switchMoveThumb1}.switch input:focus+div{outline:1px dotted silver}.switch input:focus:not(:focus-visible)+div{outline:none}.knobs__controls{opacity:0;text-align:right;padding:0 12px 12px}.knobs__controls>input{color:black;margin-left:1em}label[data-type=\"color\"]>.knobs__inputWrap>div{display:inline-block;border-radius:50px;overflow:hidden;width:var(--color-size);height:var(--color-size);transition:0.3s var(--in-easing);box-shadow:0px 0px 7px -2px currentColor}label[data-type=\"color\"]:hover>.knobs__inputWrap>div{padding:0 1.3em}input[type=\"color\"]{-webkit-appearance:none;appearance:none;border:0;padding:0;transform:scale(2);background:none;cursor:pointer}\n";

  const isObject = obj => (obj+"") === "[object Object]";
  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
  }

  var isModrenBrowser = () => window.CSS && CSS.supports('top', 'var(--a)');

  function scope(){
    const {visible, live, theme} = this.settings;
    return `
    <aside class='knobs' data-position='${theme.position}' data-flow='${theme.flow}'>
      <input hidden type='checkbox' ${visible ? 'checked' : ''} id='knobsToggle' />
      <label title='Demo Settings' ${visible == 2 ? "style='display:none'" : ''} for='knobsToggle'>⚙️</label>
      <form class='knobs__labels'>
        <fieldset></fieldset>
        <section class='knobs__controls'>
          <a class='poweredBy' href='https://github.com/yairEO/knobs' target='_blank'>Get <em>Knobs</em></a>
          <input type="reset" value="↩ Reset">
          ${live ? '' : `<input type="submit" value="Apply">`}
        </section>
      </form>
    </aside>
  `
  }
  function knob(data){
    if( data && data.type )
      return `<div class='knobs__knob'>
        <button type='button' name='${data.__name}' class='knobs__knob__reset' title='reset'>↩</button>
        <label data-type='${data.type}'>
          <div class='knobs__label' ${data.cssVar && data.cssVar[1] ? `data-type='${data.cssVar[1]}'` : ''}>${data.label}</div>
          <div class='knobs__inputWrap'>
            ${getInput.call(this, data)}
          </div>
        </label>
      </div>
    `
    if( data && typeof data == 'string' )
      return `<div class='knobs__seperator'>&nbsp;&nbsp;${data}&nbsp;&nbsp;</div>`
    return '<hr/>'
  }
  function getInput(data){
    if( data.type == 'range' )
      return `
      <div class="range" style="--step:${data.step||1}; --min:${data.min}; --max:${data.max}; --value:${data.value}; --text-value:'${data.value}'">
        <input type="range" ${this.knobAttrs(data)} oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify(this.value))">
        <output></output>
        <div class='range__progress'></div>
      </div>`
    if( data.type == 'checkbox' )
      return `
      <div class="switch">
        <input type='${data.type}' ${this.knobAttrs(data)} class="switch__input">
        <div class='switch__gfx'></div>
      </div>`
    else
      return `<div><input type='${data.type}' ${this.knobAttrs(data)}></div>`
  }

  var raf = window.requestAnimationFrame || (cb => window.setTimeout(cb, 1000 / 60));
  function Knobs(settings){
    if ( !isModrenBrowser())
      return this
    const { knobs, ...restOfSettings } = settings || {};
    this.knobs = knobs
      ? knobs.map(knob => (
        knob.cssVar
          ? {...knob, cssVar:[...knob.cssVar]}
          : isObject(knob)
            ? {...knob}
            : knob
      ))
      : [];
    this.settings = mergeDeep({...this._defaults, appendTo:document.body}, restOfSettings);
    this.DOM = {};
    this.state = {};
    this.build();
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
        background: "rgba(0,0,0,1)",
        textColor: "white",
        border: 'none',
      }
    },
    getCSSVariables({ flow, styles, RTL, position, ...vars }){
      var output = '', p;
      for( p in vars )
        output += `--${p}:${vars[p]}; `;
      return output
    },
    parseHTML( s ){
        var parser = new DOMParser(),
            node = parser.parseFromString(s.trim(), "text/html");
        return node.body.firstElementChild
    },
    templates: {
      scope: scope,
      knob: knob
    },
    knobAttrs(data){
      var attributes = `name="${data.__name}"`,
          blacklist = ['label', 'type', 'onchange', 'cssvar'];
      for( var attr in data ){
        if( !blacklist.includes(attr.toLowerCase()) )
          attributes += ` ${attr}="${data[attr]}"`;
      }
      return attributes
    },
    getKnobDataByName(name){
      return this.knobs.filter(Boolean).find(d => d.__name == name)
    },
    getInputByName(name){
      return this.DOM.scope.querySelector(`input[name="${name}"`)
    },
    onChange(e){
      var knobData = this.getKnobDataByName(e.target.name),
          runOnInput = e.type == 'input' && knobData && knobData.type != 'range',
          isCheckbox = knobData && knobData.type == 'checkbox',
          updatedData;
      if( !knobData )
        return
      if( !isCheckbox && !this.settings.live )
        return
      if( e.type == 'input' && runOnInput )
        return
      updatedData = { ...knobData, value:e.target.value };
      raf(() => this.updateDOM(updatedData));
      typeof knobData.onChange == 'function' && knobData.onChange(e, updatedData);
    },
    updateDOM({ cssVar, value, type, __name:name }){
      if( !cssVar || !cssVar.length ) return
      var [cssVarName, cssVarUnit, CSSVarTarget] = cssVar,
          targetElms = CSSVarTarget || this.settings.CSSVarTarget,
          knobInput = this.getInputByName(name),
          action = 'setProperty';
      if( type == 'checkbox' && knobInput && !knobInput.checked )
        action = 'removeProperty';
      if( (targetElms+"").includes("Element") )
        targetElms = [targetElms];
      if( targetElms && targetElms.length && value !== undefined && cssVarName )
        for( let elm of targetElms )
          elm.style[action](`--${cssVarName}`, value + (cssVarUnit||''));
    },
    resetAll( knobsData ){
      (knobsData || this.knobs).forEach(d => {
        if( !d || !d.type ) return
        var isCheckbox = d.type == 'checkbox',
            isRange = d.type == 'range',
            e = { target:{ value:d.value, name:d.__name } },
            inputElm = this.getInputByName(d.__name);
        if( isCheckbox )
          inputElm.checked = !!d.checked;
        else
          inputElm.value = d.value;
        if( isRange )
          inputElm.parentNode.style.setProperty('--value', d.value);
        this.onChange(e);
      });
    },
    resetKnobByName(name){
      this.resetAll([this.getKnobDataByName(name)]);
    },
    generateIds(){
      this.knobs.forEach(knobData => {
        if( knobData && knobData.type )
          knobData.__name = knobData.label.replace('/ /g','-') + Math.random().toString(36).slice(-6);
      });
    },
    onSubmit(e){
      e.preventDefault();
      var elements = [...e.target.elements];
      this.settings.live = true;
      elements.forEach(elm => this.onChange({ target:{value:elm.value, name:elm.name} }));
      this.settings.live = false;
      return false
    },
    onClick(e){
      var target = e.target,
          is = n => target.classList.contains(n);
      if( is('knobs__knob__reset') ){
        this.resetKnobByName(target.name);
      }
    },
    toggle(state){
      if( state === undefined )
        state = !this.DOM.mainToggler.checked;
      this.state.visible = state;
      if( state ){
        this.DOM.iframe.style.setProperty(`--knobsWidth`, '1000px');
        this.DOM.iframe.style.setProperty(`--knobsHeight`, '1000px');
      }
      var action = (state ? 'set' : 'remove') + 'Property',
          { clientWidth, clientHeight } = this.DOM.scope;
      this.DOM.iframe.style[action](`--knobsWidth`, clientWidth + 'px');
      this.DOM.iframe.style[action](`--knobsHeight`, clientHeight + 'px');
      this.DOM.mainToggler.checked = state;
    },
    build(){
      this.createIframe();
      this.bindEvents();
    },
    createIframe(){
      var iframeDoc,
          theme = this.settings.theme,
          cssText;
      this.DOM.iframe = document.createElement('iframe');
      this.DOM.iframe.setAttribute('class', 'knobsIframe');
      this.DOM.iframe.style.cssText = `
        border: none;
        position: fixed;
        z-index: 999999;
        ${(theme.position+" ").split(" ").join(":0;")}
        width: var(--knobsWidth, 35px);
        height: var(--knobsHeight, 30px);
    `;
      this.settings.appendTo.appendChild(this.DOM.iframe);
      iframeDoc = this.DOM.iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(this.templates.scope.call(this));
      cssText = `.knobs{ ${this.getCSSVariables(theme)} }`;
      cssText += mainStyles + theme.styles;
      iframeDoc.head.insertAdjacentHTML("beforeend", `<style>${cssText}</style>`);
      iframeDoc.close();
      this.DOM.scope = iframeDoc.body.firstElementChild;
      this.DOM.form = this.DOM.scope.querySelector('form');
      this.DOM.mainToggler = iframeDoc.getElementById('knobsToggle');
      this.render();
    },
    render(){
      this.generateIds();
      this.DOM.form.firstElementChild.innerHTML = this.knobs.concat(['']).map(this.templates.knob.bind(this)).join("");
      this.toggle(this.DOM.mainToggler.checked);
      this.resetAll();
    },
    bindEvents(){
      this.eventsRefs = {
        onChange: this.onChange.bind(this),
        onReset : this.resetAll.bind(this, null),
        onSubmit: this.onSubmit.bind(this),
        onClick : this.onClick.bind(this)
      };
      var { onChange, onReset, onSubmit, onClick } = this.eventsRefs;
      this.DOM.form.addEventListener('change', onChange);
      this.DOM.form.addEventListener('input', onChange);
      this.DOM.form.addEventListener('reset', onReset);
      this.DOM.form.addEventListener('submit', onSubmit);
      this.DOM.scope.addEventListener('click', onClick);
      this.DOM.mainToggler.addEventListener('change', e => this.toggle(e.target.checked));
    }
  };

  return Knobs;

})));
