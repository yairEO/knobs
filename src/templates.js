export function scope(){
  const {visible, knobs, live, theme} = this.settings;

  return `
    <aside class='knobs' data-position='${theme.position}' data-flow='${theme.flow}'>
      <input hidden type='checkbox' ${visible ? 'checked' : ''} id='knobsToggle' />
      <label title='Demo Settings' ${visible == 2 ? "style='display:none'" : ''} for='knobsToggle'>⚙️</label>
      <form class='knobs__labels'>
        <fieldset>
        ${ knobs.map(this.templates.knob.bind(this)).join("") }
        ${this.templates.knob.call(this)}
        </fieldset>
        <section class='knobs__controls'>
          <a class='poweredBy' href='https://github.com/yairEO/knobs' target='_blank'>Get <em>Knobs</em></a>
          <input type="reset" value="↩ Reset">
          ${live ? '' : `<input type="submit" value="Apply">`}
        </section>
      </form>
    </aside>
  `
}

export function knob(data){
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