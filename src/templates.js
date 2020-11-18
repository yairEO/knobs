import isObject from './utils/isObject'

var settingsIcon = `<div class='leversIcon'>
  <div><b></b></div>
  <div><b></b></div>
  <div><b></b></div>
</div>
`

export function scope(){
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

// group of knobs which is described by a label or a separator
export function fieldset(knobsGroups){
  var legend, knobs;

  if( isObject(knobsGroups[0]) ){
    knobs = knobsGroups
  }
  else{
    [legend, ...knobs] = knobsGroups;
    legend = getLegend(legend instanceof Array ? { label:legend[0], checked:!!legend[1] } : { label:legend, checked:true })
  }

  return `<fieldset ${legend ? 'data-has-legend' : ''}>
    ${legend ? legend : ''}
    <div class="fieldset__group">
      ${knobs.map(knob.bind(this)).join("")}
    </div>
  </fieldset>`
}

export function knob(data){
  if( data && data.type )
    return `<div class='knobs__knob'>
        <label data-type='${data.type}'>
          <div class='knobs__knob__label' ${data.cssVar && data.cssVar[1] ? `data-type='${data.cssVar[1]}'` : ''}>${data.label}</div>
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