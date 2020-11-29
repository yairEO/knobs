
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Knobs = factory());
}(this, (function () { 'use strict';

  var mainStyles = "label,button,input{cursor:pointer;font:12px Arial, sans-serif}body,form{padding:0;margin:0}#knobsToggle+.knobs>label{--size: calc(var(--toggleSize)/2);--offset: calc(var(--toggleOffset));position:absolute;width:var(--size);height:var(--size);top:var(--offset);right:var(--offset);padding:calc((var(--toggleSize) - var(--size))/2);font-size:20px;line-height:1;z-index:1;color:var(--textColor)}#knobsToggle:not(:checked)+.knobs>label:hover+.knobs__bg{opacity:1;transform:scale(1.15)}#knobsToggle:checked+.knobs{display:inline-block}#knobsToggle:checked+.knobs>label{padding:0}#knobsToggle:checked+.knobs .knobs__bg{--corner-radius: 8px;--offset: calc(var(--corner-radius) * -1);top:var(--offset);right:var(--offset);bottom:var(--offset);left:var(--offset);border-radius:var(--corner-radius);margin:0;width:calc(100% + var(--corner-radius));height:calc(100% + var(--corner-radius));opacity:1;transition:0.3s cubic-bezier(0.45, 0, 0.2, 1),margin 0.2s,border-radius 0.2s}#knobsToggle:checked+.knobs .knobs__labels{transform:none;transition:calc(var(--in-duration) * 1s) var(--in-easing)}#knobsToggle:checked+.knobs .knobs__labels fieldset,#knobsToggle:checked+.knobs .knobs__labels .knobs__controls{transform:none;opacity:1;transition:calc(var(--in-duration) * 1s) calc(var(--in-duration) * .5s) ease-out}html,body{overflow:hidden}.knobs{--range-track-color: var(--primaryColor);--knobs-gap: 3px;--side-pad: 12px;--toggleSize: 40px;--toggleOffset: 6px;--in-easing: cubic-bezier(.75,0,.35,1);--in-duration: .3;--color-size: 20px;--knobs-group-transition: .33s cubic-bezier(.45, 0, .2, 1);--LTR-Bool: 1;font:12px/1 'Fira Sans Condensed', sans-serif;color:var(--textColor);position:relative;overflow:hidden}.knobs[data-flow='compact']{--color-size: 16px}.knobs[data-flow='compact'] label[data-type='range']{flex-flow:column}.knobs[data-flow='compact'] label[data-type='range'] .range{--thumb-size: 12px;--track-height: calc(var(--thumb-size)/2)}.knobs[data-flow='compact'] label[data-type='range'] ~ .knobs__knob__reset{align-self:flex-start;margin-top:.5ch}.knobs[data-flow='compact'] label[data-type='range'] .knobs__label{margin:0;padding:0}.knobs label{user-select:none;cursor:pointer}.knobs__bg{position:absolute;top:0;right:0;margin:var(--toggleOffset);width:var(--toggleSize);height:var(--toggleSize);border-radius:50%;background:var(--background);opacity:.8;transition:120ms}.knobs__labels{border:var(--border);transform:translateX(calc(100.1% * var(--LTR-Bool)));overflow:hidden}.knobs__labels fieldset{display:table;border:0;padding:0;margin:var(--side-pad);opacity:0;transform:translateX(calc(22% * var(--LTR-Bool)));overflow:hidden}.knobs__labels fieldset:only-of-type>label{pointer-events:none}.knobs__labels fieldset:first-child{margin-top:calc(var(--side-pad) * 2.5)}.knobs__labels fieldset:first-child:not([data-has-legend]){overflow:visible}.knobs__labels .fieldset__group{transition:var(--knobs-group-transition)}.knobs__labels hr{border:0;border-top:1px solid var(--textColor);opacity:.25}.knobs__labels hr:last-of-type{margin-bottom:0}.knobs__labels label{order:5;flex:1;display:flex;position:relative;z-index:1;background:var(--background)}.knobs__labels label>*{padding:var(--knobs-gap, 6px) 0}.knobs__labels .range,.knobs__labels input[type=text]{min-width:200px}.knobs__labels label>:last-child{flex:1;text-align:right}.knobs__legend{display:flex;align-items:center;margin:0 0 var(--side-pad);font-weight:700;opacity:.66;cursor:pointer;transition:0.2s cubic-bezier(0.45, 0, 0.2, 1)}.knobs__legend::before,.knobs__legend::after{content:'';height:1px;background:var(--textColor);flex:1;opacity:.5;transition:inherit}.knobs__legend::before{margin-right:2ch}.knobs__legend::after{margin-left:2ch}.knobs__legend:hover{opacity:.85}.knobs__legend:hover::before{margin-right:6ch}.knobs__legend:hover::after{margin-left:6ch}.knobs__knob{display:flex;position:relative}.knobs__knob:hover .knobs__knob__label{opacity:1}.knobs__knob[data-changed] .knobs__knob__reset{opacity:.75;pointer-events:auto}.knobs__knob[data-changed] .knobs__knob__reset:hover{opacity:1;background:var(--textColor);color:var(--background);transition:0s}.knobs__knob__reset{order:0;pointer-events:none;margin-right:.5em;padding:0;align-self:center;color:inherit;background:none;border:0;cursor:pointer;opacity:.33;outline:none;border-radius:50%;width:2ch;height:2ch;transition:.15s ease-out}.knobs__knob__label{margin-right:2ch;white-space:nowrap;display:flex;align-items:center;opacity:.8;transition:80ms}.knobs__knob__label::after{content:attr(data-units);opacity:.5;margin-left:1ch}.knobs .toggleSection:not(:checked) ~ .fieldset__group{opacity:0;margin-top:calc(-1em + var(--height) * -1px);text-shadow:0px 3px 2px}.leversIcon{width:56px;transform:scale(0.4);transform-origin:0 0}.leversIcon>div{display:flex;align-items:center;transition:transform .2s ease}.leversIcon>div:nth-child(1)::before{flex:.33;transition-delay:.3s}.leversIcon>div:nth-child(2){margin:2px 0}.leversIcon>div:nth-child(2)::after{flex:.33}.leversIcon>div:nth-child(3)::before{flex:.8;transition-delay:.1s}.leversIcon>div>b{display:inline-block;width:7.5px;height:7.5px;border-radius:50%;border:4px solid currentColor;margin:0 5px}.leversIcon>div::before,.leversIcon>div::after{content:'';height:5px;background:currentColor;border-radius:5px;flex:1;transition:flex .1s ease}.leversIcon>div::after{flex:auto;opacity:.33}@keyframes leversIcon{30%{flex:.2}80%{flex:5}}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(1)::before{animation:1s leversIcon ease infinite}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(2){margin:1px 0}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(2)::after{animation:1s .1s leversIcon ease reverse infinite}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(3)::before{animation:1.2s .15s leversIcon ease alternate infinite}#knobsToggle:checked+.knobs>label{--size: 18px;--offset: calc(var(--toggleOffset) + var(--size)/3)}#knobsToggle:checked+.knobs>label .leversIcon{width:65px;color:var(--textColor);transition:color .2s;transform:scale(0.3) translate(0, 6px);opacity:.7}#knobsToggle:checked+.knobs>label .leversIcon:hover{opacity:1}#knobsToggle:checked+.knobs>label .leversIcon b{transform:scale(0);margin:0;width:0}#knobsToggle:checked+.knobs>label .leversIcon>div::after{flex:0}#knobsToggle:checked+.knobs>label .leversIcon>div::before{flex:3;height:8px}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(1){transform:rotate(45deg);transform-origin:20% 50%}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(2){opacity:0}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(3){transform:rotate(-45deg);transform-origin:0 0}#knobsToggle:checked+.knobs[data-position~='top'] .knobs__bg{bottom:auto}#knobsToggle:checked+.knobs[data-position~='right'] .knobs__bg{left:auto}#knobsToggle:checked+.knobs[data-position~='bottom']>label{top:auto;bottom:var(--offset)}#knobsToggle:checked+.knobs[data-position~='bottom'] .knobs__bg{top:auto}#knobsToggle:checked+.knobs[data-position~='bottom'][data-position~='right']{--control-right-pad: var(--toggleSize)}#knobsToggle:checked+.knobs[data-position~='left']>label{right:auto;left:var(--offset)}#knobsToggle:checked+.knobs[data-position~='left'] .knobs__bg{right:auto}#knobsToggle:checked+.knobs[data-position~='left'][data-position~='bottom']{--control-left-pad: var(--toggleSize)}.knobs[data-position~='left']{--LTR-Bool: -1}.knobs .range{--fill-color: var(--range-track-color);--primaryColor: var(--range-value-background);--value-active-color: var(--range-track-color);--value-background: transparent;--progress-color: #444;--thumb-size: 20px;--track-height: calc(var(--thumb-size)/3);--thumb-shadow: 0 0 3px rgba(0,0,0,.2);--ticks-thickness: 1px;--ticks-height: 0px;--show-min-max: none;color:transparent}.knobs .range>input:hover+output{box-shadow:0 0 0 3px var(--value-background),0 0 6px 4px var(--background)}.range{--primaryColor: #0366D6;--value-active-color: white;--value-background: white;--value-font: 700 12px/1 Arial;--progress-color: #EEE;--progress-shadow: 2px 2px 4px rgba(0,0,0, .1) inset;--fill-color: var(--primaryColor);--thumb-size: 16px;--track-height: calc(var(--thumb-size)/2);--thumb-shadow: 0 0 3px rgba(0,0,0,.2);--ticks-thickness: 1px;--ticks-height: 5px;--ticks-color: silver;--step: 1;--ticks-count: (var(--max) - var(--min)) / var(--step);--maxTicksAllowed: 30;--too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));--x-step: Max( var(--step), var(--too-many-ticks) * (var(--max) - var(--min)) );--tickInterval: 100/((var(--max) - var(--min)) / var(--step)) * var(--tickEvery, 1);--tickIntervalPerc: calc((100% - var(--thumb-size))/( (var(--max) - var(--min)) / var(--x-step) ) * var(--tickEvery, 1));--completed: calc((var(--value) - var(--min) ) / (var(--max) - var(--min)) * 100);--LTR: 1;display:inline-block;height:Max(var(--track-height), var(--thumb-size));background:linear-gradient(to right, var(--ticks-color) var(--ticks-thickness), transparent 1px) repeat-x;background-size:var(--tickIntervalPerc) var(--ticks-height);background-position-x:calc(var(--thumb-size)/2);background-position-y:var(--flip-y, bottom);position:relative;z-index:1;padding-bottom:var(--flip-y, var(--ticks-height));padding-top:calc(var(--flip-y) * var(--ticks-height))}[dir=\"rtl\"] .range{--LTR: -1}.range[data-ticks-position='top']{--flip-y: 1}.range::before,.range::after{--offset: calc(var(--thumb-size)/2);content:counter(x);display:var(--show-min-max, block);font:12px Arial;position:absolute;bottom:var(--flip-y, -2.5ch);top:calc(-2.5ch * var(--flip-y));opacity:var(--min-max-opacity, 0.5);pointer-events:none}.range::before{counter-reset:x var(--min);left:var(--offset);transform:translateX(calc(-50% * var(--LTR)))}[dir='rtl'] .range::before{left:auto;right:var(--offset)}.range::after{counter-reset:x var(--max);right:var(--offset);transform:translateX(calc(50% * var(--LTR)))}[dir='rtl'] .range::after{right:auto;left:var(--offset)}.range__progress{position:absolute;left:0;top:calc(50% - var(--ticks-height)/2);transform:var(--flip-y, translateY(-50%) translateZ(0));width:100%;height:calc(var(--track-height));pointer-events:none;z-index:-1;box-shadow:var(--progress-shadow);border-radius:20px;background:var(--fill-color, white)}.range__progress::after{content:'';display:block;margin-left:auto;margin-right:-1px;width:calc((100% - var(--completed) * 1%) + (var(--completed)/100) * var(--thumb-size)/2);height:100%;background:var(--progress-color, #EEE);box-shadow:inherit;border-radius:0 20px 20px 0}[dir=\"rtl\"] .range__progress::after{margin-right:auto;margin-left:-1px;border-radius:20px 0 0 20px}.range>input{-webkit-appearance:none;width:100%;height:var(--thumb-size);margin:0;cursor:-webkit-grab;cursor:grab;outline:none;background:none}.range>input::-webkit-slider-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input::-moz-slider-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input::-ms-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.range>input:active{cursor:grabbing;--thumb-color: var(--fill-color);--inner-shadow: 0 0 0 calc(var(--thumb-size)/4) inset white}.range>input:active+output{transition:0s}.range>input:hover+output{--value-background: var(--primaryColor);color:var(--value-active-color);transform:translate(var(--x-offset), 0);box-shadow:0 0 0 3px var(--value-background)}.range>output{--x-offset: calc(var(--completed) * -1% * var(--LTR));--pos: calc(((var(--value) - var(--min))/(var(--max) - var(--min))) * 100%);pointer-events:none;position:absolute;z-index:5;background:var(--value-background);border-radius:10px;padding:0 4px;top:-3ch;left:var(--pos);transform:translate(var(--x-offset), 6px);transition:all .12s ease-out, left 0s, top 0s}[dir='rtl'] .range>output{left:auto;right:var(--pos)}.range>output::after{content:var(--text-value);font:var(--value-font)}.knobs .switch{--color-bg: #444;--color-bg-on: #444;--thumb-color-off: #d75d4a;--thumb-color-on: #4ec964;--thumb-scale: 1.1;--width-multiplier: 2.5;--thumb-animation-pad: 15%;--size: 11px}.knobs .switch input:focus+div{outline:none}.switch{--color-bg: #E1E1E1;--color-bg-on: #16B5FF;--thumb-color-on: white;--thumb-color-off: var(--thumb-color-on);--thumb-scale: 1;--size: 16px;--duration: .18s;--width-multiplier: 2.5;--thumb-animation-pad: 15%;user-select:none;display:inline-flex;align-items:center}@keyframes switchMoveThumb{50%{padding:0 var(--thumb-animation-pad)}}@keyframes switchMoveThumb1{50%{padding:0 var(--thumb-animation-pad)}}.switch--textRight .switch__label{order:10;padding:0 0 0 .4em}.switch>div{cursor:pointer}.switch__label{order:0;padding-right:.4em;color:var(--label-color)}.switch__gfx{--thumb-left: 0%;--transform: translateX(calc(var(--thumb-left) * -1)) scale(var(--thumb-scale));order:5;padding:3px;position:relative;background:var(--bg, var(--color-bg));border-radius:50px;width:calc(var(--size) * var(--width-multiplier));transition:var(--duration);background-size:4px 4px}.switch__gfx::before{content:'';display:block;position:relative;left:var(--thumb-left);background:var(--thumb-color, var(--thumb-color-off));border-radius:var(--size);width:var(--size);height:var(--size);transform:var(--transform);transition:var(--duration);animation:switchMoveThumb var(--duration) ease 1}.switch input{position:absolute;opacity:0}.switch input[disabled]+div{background-image:linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%)}.switch input:disabled ~ div{cursor:not-allowed}.switch input:indeterminate+div{--thumb-left: 50%}.switch input:checked+div{--bg: var(--color-bg-on);--thumb-left: 100%;--thumb-color: var(--thumb-color-on)}.switch input:checked+div::before{animation-name:switchMoveThumb1}.switch input:focus+div{outline:1px dotted silver}.switch input:focus:not(:focus-visible)+div{outline:none}.knobs__controls{display:flex;align-items:center;opacity:0;flex-direction:row-reverse;margin:var(--side-pad) var(--control-right-pad, var(--side-pad)) var(--side-pad) var(--control-left-pad, var(--side-pad));position:relative;z-index:1}.knobs__controls>input{color:black;margin-left:1em}.poweredBy{margin-right:auto;text-decoration:none;color:inherit;padding:3px;font-size:10px;opacity:.5;transition:.15s}.poweredBy:hover{color:var(--primaryColor);opacity:1}label[data-type=\"color\"]>.knobs__knob__inputWrap>div{display:inline-block;border-radius:50px;overflow:hidden;width:var(--color-size);height:var(--color-size);transition:0.3s var(--in-easing);box-shadow:0px 0px 7px -2px currentColor}label[data-type=\"color\"]:hover>.knobs__knob__inputWrap>div{padding:0 1.3em}input[type=\"color\"]{-webkit-appearance:none;appearance:none;border:0;padding:0;transform:scale(2);background:none;cursor:pointer}\n";

  function isObject(obj) {
    return (obj+"") === "[object Object]"
  }

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

  var isModernBrowser = () => window.CSS && CSS.supports('top', 'var(--a)');

  var settingsIcon = `<div class='leversIcon'>
  <div><b></b></div>
  <div><b></b></div>
  <div><b></b></div>
</div>
`;
  function scope(){
    const {visible, live, theme} = this.settings;
    return `
    <input hidden type='checkbox' ${visible ? 'checked' : ''} id='knobsToggle' />
    <aside class='knobs' data-position='${theme.position}' data-flow='${theme.flow}'>
      <label title='Demo Settings' ${visible == 2 ? "style='display:none'" : ''} for='knobsToggle'>${settingsIcon}</label>
      <div class='knobs__bg'></div>
      <form class='knobs__labels'>
        <!-- Knobs goes here -->
        <section class='knobs__controls'>
          ${live ? '' : `<input type="submit" value="Apply">`}
          <input type="reset" value="↩ Reset">
          <a class='poweredBy' href='https://github.com/yairEO/knobs' target='_blank'>Get <em>Knobs</em></a>
        </section>
      </form>
    </aside>
  `
  }
  function fieldset(knobsGroups){
    var legend, knobs;
    if( isObject(knobsGroups[0]) ){
      knobs = knobsGroups;
    }
    else {
      [legend, ...knobs] = knobsGroups;
      legend = getLegend(legend instanceof Array ? { label:legend[0], checked:!!legend[1] } : { label:legend, checked:true });
    }
    return `<fieldset ${legend ? 'data-has-legend' : ''}>
    ${legend ? legend : ''}
    <div class="fieldset__group">
      ${knobs.map(knob.bind(this)).join("")}
    </div>
  </fieldset>`
  }
  function knob(data){
    if( data && data.type )
      return `<div class='knobs__knob'>
        <label data-type='${data.type}'>
          <div class='knobs__knob__label' ${data.cssVar && data.cssVar[1] ? `data-units='${data.cssVar[1].replace('-','')}'` : ''}>${data.label}</div>
          <div class='knobs__knob__inputWrap'>
            ${getInput.call(this, data)}
          </div>
        </label>
        <button type='button' name='${data.__name}' class='knobs__knob__reset' title='Reset'>↩</button>
      </div>
    `
  }
  function getLegend({ label, checked }){
    var id = label.replace(/ /g, '-') + Math.random().toString(36).slice(-6);
    return `<input hidden id="${id}" type="checkbox" ${checked ? "checked" : ""} class="toggleSection">
          <label class='knobs__legend' for="${id}" title="Expand/Collapse">${label}</label>`
  }
  function getInput(data){
    if( data.type == 'range' )
      return `
      <div class="range" style="--step:${data.step||1}; --min:${data.min}; --max:${data.max}; --value:${data.value}; --text-value:'${data.value}'">
        <input type="range" ${this.knobAttrs(data)}>
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
    if ( !isModernBrowser())
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
        "range-value-background": '#FFF',
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
      knob: knob,
      fieldset: fieldset
    },
    knobAttrs(data){
      var attributes = `name="${data.__name}"`,
          blacklist = ['label', 'type', 'onchange', 'cssvar', '__name'],
          CSSVarTarget;
      if( !("value" in data) && data.cssVar && data.cssVar.length ){
        CSSVarTarget = data.cssVar[2] || this.settings.CSSVarTarget;
        if( CSSVarTarget.length )
          CSSVarTarget = CSSVarTarget[0];
        data.value = getComputedStyle(CSSVarTarget).getPropertyValue(`--${data.cssVar[0]}`).trim();
        if( data.type == 'range' )
          data.value = parseInt(data.value);
      }
      for( var attr in data ){
        if( !blacklist.includes(attr.toLowerCase()) )
          attributes += ` ${attr}="${data[attr]}"`;
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
    updateDOM({ cssVar, value, type, __name:name }){
      if( !cssVar || !cssVar.length ) return
      var [cssVarName, cssVarUnit, CSSVarTarget] = cssVar,
          targetElms = CSSVarTarget || this.settings.CSSVarTarget,
          knobInput = this.getInputByName(name),
          action = 'setProperty';
      if( type == 'checkbox' && knobInput && !knobInput.checked )
        action = 'removeProperty';
      if( cssVarUnit && cssVarUnit[0] == '-' )
        cssVarUnit = '';
      if( Object.prototype.toString.call(targetElms).includes("Element") )
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
            inputElm = this.getInputByName(d.__name),
            e = { target:inputElm },
            resetTitle;
        if( isCheckbox )
          resetTitle = inputElm.checked = !!d.checked;
        else
          resetTitle = inputElm.value = d.value;
        this.setResetKnobTitle(d.__name, resetTitle);
        if( isRange )
          inputElm.parentNode.style.setProperty('--value', d.value);
        this.onInput(e);
        this.onChange(e);
        this.setKnobChangedFlag(this.getKnobElm(d.__name), false);
      });
    },
    setResetKnobTitle( name, title ){
      try{
        title = "Reset to " + title;
        this.getKnobElm(name).querySelector('.knobs__knob__reset').title = title;
      }
      catch(err){}
    },
    resetKnobByName( name ){
      this.setKnobChangedFlag(this.getKnobElm(name), false);
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
      var elements = e.target.querySelectorAll('input');
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
    calculateGroupsHeights(){
      var groupElms = this.DOM.form.querySelectorAll('.fieldset__group');
      groupElms.forEach(groupElm => {
        groupElm.style.setProperty('--height', groupElm.clientHeight);
      });
    },
    setIframeProps( opts ){
      var action = (this.state.visible == false ? 'remove' : 'set') + 'Property',
          iframeBodyElm = this.DOM.iframe.contentWindow.document.body,
          style = this.DOM.iframe.style,
          { heightOffset = 0 } = opts || {};
      if( action == 'setProperty' ){
        style.setProperty(`--knobsWidth`, '2000px');
        style.setProperty(`--knobsHeight`, '1000px');
      }
      var { clientWidth, clientHeight } = this.DOM.scope;
      style[action](`--knobsWidth`, clientWidth + 'px');
      style[action](`--knobsHeight`, (+clientHeight + +heightOffset) + 'px');
    },
    toggle( state ){
      if( state === undefined )
        state = !this.DOM.mainToggler.checked;
      this.state.visible = state;
      this.DOM.mainToggler.checked = state;
      this.setIframeProps();
    },
    build(){
      this.createIframe();
      setTimeout(this.bindEvents.bind(this));
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
        width: var(--knobsWidth, 56px);
        height: var(--knobsHeight, 56px);
    `;
      this.settings.appendTo.appendChild(this.DOM.iframe);
      iframeDoc = this.DOM.iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(this.templates.scope.call(this));
      cssText = `.knobs{ ${this.getCSSVariables(theme)} }`;
      cssText += mainStyles + theme.styles;
      iframeDoc.head.insertAdjacentHTML("beforeend", `<style>${cssText}</style>`);
      iframeDoc.close();
      this.DOM.scope = iframeDoc.body.querySelector('.knobs');
      this.DOM.form = this.DOM.scope.querySelector('form');
      this.DOM.mainToggler = iframeDoc.getElementById('knobsToggle');
      this.render();
    },
    render(){
      this.generateIds();
      var knobsGroups = this.knobs.reduce((acc, knobData) => {
          if( knobData && !isObject(knobData) && acc[acc.length - 1].length ) acc.push([]);
          acc[acc.length - 1].push(knobData);
          return acc
        }, [[]]);
      this.DOM.form.querySelectorAll('fieldset').forEach(elm => elm.remove());
      var HTML = knobsGroups.map(this.templates.fieldset.bind(this)).join("");
      this.DOM.form.insertAdjacentHTML('afterbegin', HTML);
      this.calculateGroupsHeights();
      this.toggle(this.DOM.mainToggler.checked);
      this.resetAll();
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
    onInput(e){
      var inputelm = e.target;
      inputelm.parentNode.style.setProperty('--value',inputelm.value);
      inputelm.parentNode.style.setProperty('--text-value', JSON.stringify(inputelm.value));
    },
    setKnobChangedFlag( knobElm, action ){
      knobElm && knobElm[(action == false ? 'remove' : 'set') + 'Attribute']('data-changed', true);
    },
    bindEvents(){
      this.eventsRefs = this.eventsRefs || {
        onChange: e => {
          if( !e.target.name ) return
          this.setKnobChangedFlag( this.getKnobElm(e.target.name) );
          this.onChange(e);
        },
        onInput: e => {
          try{
            let isSectionToggler = e.target.classList.contains('toggleSection'),
                groupElm,
                sectionHeight;
            if( isSectionToggler && e.target.checked ){
              groupElm = e.target.parentNode.querySelector('.fieldset__group');
              sectionHeight = groupElm.style.getPropertyValue('--height');
              this.setIframeProps({ heightOffset:sectionHeight });
            }
          }
          catch(err){}
          if( !e.target.name ) return
          this.onInput(e);
          this.onChange(e);
        },
        onTransitionEnd: e => {
          if( e.target.classList.contains('fieldset__group') ){
            this.setIframeProps();
          }
        },
        onReset : this.resetAll.bind(this, null),
        onSubmit: this.onSubmit.bind(this),
        onClick : this.onClick.bind(this)
      };
      var { onChange, onInput, onReset, onSubmit, onClick, onTransitionEnd } = this.eventsRefs;
      this.DOM.form.addEventListener('change', onChange);
      this.DOM.form.addEventListener('input', onInput);
      this.DOM.form.addEventListener('reset', onReset);
      this.DOM.form.addEventListener('submit', onSubmit);
      this.DOM.scope.addEventListener('click', onClick);
      this.DOM.mainToggler.addEventListener('change', e => this.toggle(e.target.checked));
      this.DOM.form.addEventListener('transitionend', onTransitionEnd);
    }
  };

  return Knobs;

})));
