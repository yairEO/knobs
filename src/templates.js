import isObject from './utils/isObject'

var settingsIcon = `<div class='leversIcon'>
  <div><b></b></div>
  <div><b></b></div>
  <div><b></b></div>
</div>
`

export function scope(){
  const {visible} = this.settings;

  return `
    <input hidden type='checkbox' ${visible ? 'checked' : ''} id='knobsToggle' />
    ${knobs.call(this, {})}
  `
}

export function knobs({ withToggler = true}){
  const {visible, live, theme} = this.settings;

  return `
    <aside class='knobs' data-position='${theme.position}' data-flow='${theme.flow}'>
      ${withToggler ?
      `<label title='Demo Settings' ${visible == 2 ? "style='display:none'" : ''} for='knobsToggle'>${settingsIcon}</label>`
      : ''}
      <div class='knobs__bg'></div>
      <form class='knobs__labels'>
        <div class='knobs__groups'>
          <!-- Knobs goes here -->
        </div>
        <section class='knobs__controls'>
          ${live ? '' : `<input type="submit" value="Apply">`}
          <input type="reset" value="↩ Reset" title="Reset to defaults">
          <a class='poweredBy' href='https://github.com/yairEO/knobs' target='_blank'>Get <em>Knobs</em></a>
        </section>
      </form>
    </aside>
  `
}

// group of knobs which is described by a label or a separator
export function fieldset(knobsGroup){
  var legend, knobs;

  if( isObject(knobsGroup[0]) ){
    knobs = knobsGroup
  }

  else{
    [legend, ...knobs] = knobsGroup;
    let getLegendParams = legend instanceof Array ? { label:legend[0], checked:!!legend[1] } : { label:legend, checked:true }
    legend = getLegend({ ...getLegendParams, knobsCount:knobs.length })
  }

  return `<fieldset ${legend ? 'data-has-legend' : ''}>
    ${legend ? legend : ''}
    <div class="fieldset__group">
      <div class="fieldset__group__wrap">
        ${knobs.map(knob.bind(this)).join("")}
      </div>
    </div>
  </fieldset>`
}

export function knob(data){
  if( data.render )
    return `<div class='knobs__knob ${data.knobClass||''}'>${data.render}</div>`

  if( data && data.type )
    return `<div class='knobs__knob ${data.knobClass||''}'>
        <input type='checkbox' css-util-before data-for-knob='${data.__name}' ${data.isToggled === false ? "" : "checked"} class='knobs__knob__toggle' title='Temporarily disable the knob' />
        <label data-type='${data.type}'>
          ${data.label ? `<div class='knobs__knob__label' title='${data.labelTitle||''}' ${data.cssVar && data.cssVar[1] ? `data-units='${data.cssVar[1].replace('-','')}'` : ''}>${data.label}</div>` : ''}
          <div class='knobs__knob__inputWrap'>
            ${getInput.call(this, data)}
          </div>
        </label>
        <button type='button' name='${data.__name}' class='knobs__knob__reset' title='Reset'>↩</button>
      </div>
    `
}

function getLegend({ label, checked, knobsCount }){
  var id = label.replace(/ /g, '-') + Math.random().toString(36).slice(-6);

  return `<input hidden id="${id}" type="checkbox" ${checked ? "checked" : ""} class="toggleSection">
          <label class="knobs__legend" ${label && `data-has-label`} for="${id}" title="Expand/Collapse">
            <div>
              ${label && `<span>${label}</span>`}
              <span class='knobs__legend__knobsCount' css-util-before>${knobsCount}</span>
            </div>
          </label>`
}

function getInput( data ){
  let { type, step, min, max, value, options } = data

  if( type == 'range' )
    return `
      <div class="range-slider" style="--step:${step||1}; --min:${min}; --max:${max}; --value:${value}; --text-value:'${value}'">
        <input type="range" ${this.knobAttrs(data)}>
        <output></output>
        <div class='range-slider__progress'></div>
      </div>`

  if( type == 'checkbox' )
    return `
      <div class="switch">
        <input type='${type}' ${this.knobAttrs(data)} class="switch__input">
        <div class='switch__gfx'></div>
      </div>`

  if( type == 'select' && options?.length )
    return `
      <select ${this.knobAttrs(data)}>
        ${options.map(v => `<option ${(Array.isArray(v) ? v[0] : v) == data.value ? 'selected' : ''} value='${(Array.isArray(v) ? v[0] : v)}'>${(Array.isArray(v) ? v[1] : v)}</option>`)}
      </select>`

  if( type == 'color' )
    type = 'text'

  return `<div><input type='${type}' data-type='${data.type}' ${this.knobAttrs(data)}></div>`
}