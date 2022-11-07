<p align="center">
<br>
  <a href='https://codepen.io/vsync/pen/KKMwyRO'>
      <img src="./demo.apng?sanitize=true" alt="Knobs"/>
  </a>
<br>
<p>

<p align="center">
  <a href='https://www.npmjs.com/package/@yaireo/knobs'>
      <img src="https://img.shields.io/npm/v/@yaireo/knobs.svg" />
  </a>
  <a href='https://simple.wikipedia.org/wiki/MIT_License'>
      <img src="https://img.shields.io/badge/license-MIT-lightgrey" />
  </a>
</p>

<h1 align="center">
  <a href='https://codepen.io/vsync/pen/KKMwyRO'>Knobs</a> 🎛️ UI controllers for JS/CSS manipulation
</h1>

<h3 align="center">
  👉 <a href='https://codepen.io/vsync/pen/KKMwyRO' target='_blank'>Demo</a> 👈
  <br><br>
</h3>

<table>
  <tr>
    <td >
      <table>
        <tr>
          <td>Minified</td>
          <td align="right"><strong>54kb</strong></td>
        </tr>
        <tr>
          <td>Brotli</td>
          <td align="right"><strong>13.5kb</strong></td>
        </tr>
        <tr>
          <td>GZIP</td>
          <td align="right"><strong>15kb</strong></td>
        </tr>
      </table>
    </td>
    <td>
<h2>What is this:</h2>
<p>
Started as something I needed for my many Codepens - A way to provide viewers, and myself, a set
of controllers, for manipulating the DOM instantaneously.
</p>
<p>
Imagine certain aspects of a web page, or a specific *component*, which you would like to add the ability
to control on-the-fly. Change the visual looks or certain javascript parameters with a move or a slider.
</p>
<p>
CSS-variables (custom properties) are a great match for this script as they compute in real-time. Javascript is of course a benefitor because every knobs can be attached with a callback that recieves the current value, and additional data, as to what that value should be applied on.
</p>
<p>
It's so easy & quick to use Knobs, about 1 minute!
</p>
<strong>⚠️ Supported only in modern browsers</strong><br>
    </td>
  </tr>
</table>

### Features:

* `range` input (*wheel*-supported)
* `color` input with awesome custom [color picker](https://github.com/yairEO/color-picker)
* `checkbox` input
* `radio` inputs group
* `select` dropdown (native)
* Custom HTML-Knobs (add your own buttons or whatever)
* Resset all knobs (to defaults)
* Reset individual knob
* Labels - group all the knobb defined after a certain label
* **Expand/Collapse** knobs groups
* Apply changes live, on-the-fly, or with an <kbd>Apply</kbd> button
* Auto-detect CSS variables defined in knobs as their initialvalues, if possible
* Knobs are completely **isolated** within an *iframe* (unaffected by your page styles)
* Allows 3 states of visibility:
  - `0` - Starts as hidden
  - `1` - Starts as visible
  - `2` - Always visible
* Knobs component placement `position` (relative to window viewport):
  * `top right` (default)
  * `bottom right`
  * `top left`
  * `bottom left`
* Allows theme customization (*currently very limited*)

## Configuration:

All is needed is to include the knobs script on the page, and set it up.

```js
new Knobs(settings)
```


### Settings

| Name         | Type                  | Default | Info
|--------------|-----------------------|---------|--------------------------------------------------------------------------------------------------------------------
| theme        | `Object`              |         | Knobs theme variables. Since the Knobs are encapsulated within an iframe, they cannot be be styled from outside.
| live         | `Boolean`             | `true`  | Should changes be immediately applied
| persist      | `Boolean`             | `false` | Persist changes using the browser's localstorage. Store `key/value` per knob, where `key` is the knob's *label*.
| visible      | `Number`              | `0`     | `0` - Starts as hidden<br> `1` - Starts as visible<br> `2` - Always visible
| CSSVarTarget | `Element`/`NodeList ` |         | Global HTML element(s) for which to apply the CSS custom properties.<br> Can also be configured per-knob.
| knobsToggle  | `Boolean`             | `false` | if `true` - adds a checkbox next to each knob, which allows temporarily disabling the knob, reverting to default
| knobs        | `Array`               |         | Array of Objects describing the knobs controllers on-screen
| standalone   | `Boolean`             | `false` | if `true` - does not create an iframe and appends it to the page, but simply gives the developer the DOM node, as is, to inject manually with `knobs.DOM.scope` node. Note that CSS in also needed ('./src/styles/styles.scss`)
<details>
  <summary><strong>theme</strong> (defaults)</summary>

```js
{
  styles      : ``,                // optioanlly add any CSS and it will be injected into the iframe
  flow        : 'horizontal',      // use 'compact' to keep things tight
  position    : 'top right',
  primaryColor: '#0366D6',         // mainly for links / range sliders
  'base-color': "rgba(0,0,0,1)",   // mainly for the background color but also for input fields such as text or number
  textColor   : "#CCC",
  border      : 'none'
}
```
</details>

<details>
  <summary><strong>knobs</strong></summary>

An array of Objects, where the properties describe a *knob*.

It is ***possible*** to define/update the `knobs` Array **after** instance initialization, like so:

```js
var myKnobs = new Knobs({ CSSVarTarget:document.body }) // only if working with CSS variables

myKnobs.knobs = [{...}, ...] // Add/change the knobs. will automatically re-render (see example further below)
```

All defined *knob* properties, beside a special few, are attributes that
are applied on the HTML *input* element that controls the knob, so it is up
to the developer who set up the knobs to use the appropriate attributes, for
each type of of the supported knobs (`range`, `color`, `checkbox`).

The special other properties are:

**`onChange`**

Callback which fires on every `input` event

**`cssVar`**

Optional. An array of 3 items:
1. (`String`) - CSS variable name
2. (`String`) - Units (*optional* - Ex. `%` or `px`)
3. (`HTML NODE`) - Reference to an HTML node to apply the knob's CSS variable on (*optional*)

Sometimes it is wanted for variables to be defined unitless, for calculation-purposes, like so:

```css
div{
  --size: 10;
  /* limits with width to a minimum of 10px by using unitless variable for the "max" function */
  width: calc(Max(50, var(--size)) * 1px);
}
```

So, when a unitless-variable is desired, but ultimatly it will have a unit, then `units` (*2nd* item in the array)
should be written with a dash prefix, Ex.: `-px`, and it will be displayed in the label correctly but ignored when
applying the variable.

**`cssVarsHSLA`** (boolean)

Applies only to *color* knobs and if set to `true` will generate 4 CSS variables for the HSLA version of the color.

`--main-color-h`, `--main-color-s`, `--main-color-l` & `--main-color-a`.

```js
{
  cssVar: ['main-color'],
  cssVarsHSLA: true,
  label: 'Page background',
  type: 'color',
  defaultFormat: 'hsla',
},
```

**`defaultFormat`** (string)

Applies only to *color* knobs. Sets the default format displayed to the user and also the value which will
be set to the input. Possible values are: `hsla`, `rgba`, `hex`.


**`label`** (string)

A text which is displayed alongside the knob

**`labelTitle`** (string)

Optional `title` attribute for the knob's label

**`value`** (string, number)

Acts as the initial value of the *knob*, except for `checkbox` *knobs*, in which case,
if the knob also has `cssVar` property set, then the checkbox is *checked*, that CSS variable
`value` will be the `value` property of the knob, Ex.

```js
{
  cssVar: ['hide'], // CSS variable name "--hide"
  label: 'Show',
  type: 'checkbox',
  // checked: true,  // not checked by default
  value: 'none', // if checked: --hide: none;
}
```

Then in your CSS you can write the below, so when `--hide` is not defined,
`block` is used as the `display` property value.

```css
display: var(--hide, block);
```

It is possible to use an *already-declared* CSS-varaible (on the target element) by emmiting the `value`
prop from the *knob* decleration. The program will try to get the value using `getComputedStyle` and `getPropertyValue`.

Variables which has `calc` or any other computations might result in `NaN`. In which case, a `console.warn` will be presented
and a manually typed `value` property for the *knob* would be advised.

**`isToggled`** (boolean)
If this property is set to `false`, the knob will be toggled *off* by default.

Will only take affect if `knobsToggle` setting is set to `true`

**`options`** (array)
Used for knobs of type `select`. An Array of options to render.

    [20, 150, [200, '200 nice pixels'], 500]

An option can be split to the actual value it represents and its textual value, as the above example shows.

**`knobClass`** (string)
Add your own *class* to the knob (row) element itself (for styling purposes).
Remember that in order to add custom styles, the `theme.styles` setting should be used, because all knobs
are encapsulated within an *iframe* so your page styles won't affect anything that's inside.

**`render`** (string)
Allows to render anything you want in the knob area.
Should return a *string* of HTML, for example:

```js
{
  render: `
    <button onclick='alert(1)'>1</button>
    <button onclick='alert(2)'>2</button>
  `,
  knobClass: 'custom-actions'
}
```

**`script`** (function)
A function to be called which has logic related to the custom HTML in the `render` property (shown above).
The function recieves 2 arguments: The knobs instance referece and the (auto)generated knob `name` string.

```js
{
  label: 'Custom HTML with label',
  render: `
    <button type='button' class='specialBtn1'>1</button>
    <button type='button' class='specialBtn2'>2</button>
  `,
  script(knobs, name){
    knobs.getKnobElm(name).addEventListener("click", e => {
      if( e.target.tagName == 'BUTTON' )
        alert(e.target.textContent)
    })
  },
},
```
</details>


## Install:

```
npm i @yaireo/knobs
```

**CDN source:**

[https://unpkg.com/@yaireo/knobs@latest](https://unpkg.com/@yaireo/knobs@latest)


## Example:

### When Using with NPM, first import `Knobs`
```js
import Knobs from '@yaireo/knobs'
```

#### Color manipulation methods:

`format` & `CSStoHSLA` are defined on Knobs' instances in `color` property, for example:

```js
const myKnobs = new Knobs({
  ...,
  knobs: [
    {
      cssVar: ['bg'], // alias for the CSS variable
      label: 'Color',
      type: 'color',
      value: '#45FDA9',
      onChange(e, knobData, hsla) => {
        console.log( myKnobs.format(knobData.value, 'rgb') )  // will print a color string in RGBA
      }
    }
  ]
})

myKnobs.color.format()
```

See [color-picker docs](https://github.com/yairEO/color-picker#helper-methods-exported-alongside-the-default-colorpicker)


### Defining Knobs:

```js
var settings = {
  theme: {
    position: 'bottom right', // default is 'top left'
  },

  // should update immediately (default true)
  live: false,

  // 0 - starts as hidden, 1 - starts as visible, 2 - always visible
  visible: 0,

  CSSVarTarget: document.querySelector('.testSubject'),

  knobs: [
    {
      cssVar: ['width', '-px'], // prefix unit with '-' makes it only a part of the title but not of the variable
      label: 'Width',
      labelTitle: 'Changes the width at steps of 50 pixels',
      type: 'range',
      value: 200,
      min: 0,
      max: 500,
      step: 50,
      onChange: console.log  // javascript callback on every "input" event
    },

    {
      cssVar: ['width', '-px'],
      label: 'Width preset',
      type: 'select',
      options: [20, 150, [200, '200 nice pixels'], 500],
      value: 150, // should be one of the options
      defaultValue: 150 // value for which to reset to (optional)
      isToggled: false, // this knob will not take affect by default
    },

    {
      cssVar: ['height', 'vh'],
      label: 'Height',
      type: 'range',
      // value: 20,  // if a value is not defined, Knobs will try to get it from the CSS ("CSSVarTarget" selector) automatically
      min: 0,
      max: 100,
      onChange: console.log
    },

    {
      cssVar: ['align'],
      label: 'Align boxes',
      type: 'radio',
      name: 'align-radio-group',
      options: [
        { value:'left', hidden:true, label: '<svg ...' },
        { value: 'center', label:'Center' },
        { value:'right', hidden:true, label:'<svg ...' }
      ],
      value: 'center',
      defaultValue: 'left'
    },

    {
      cssVar: ['radius', '%'],
      label: 'Radius of the big square here',
      type: 'range',
      value: 0,
      min: 0,
      max: 50,
      onChange: console.log
    },

    "Label example",

    {
      cssVar: ['bg'], // alias for the CSS variable
      label: 'Color',
      type: 'color',
      defaultFormat: 'hsla',
      cssVarsHSLA: true,
      value: '#45FDA9',
      swatches: ['red', 'gold'],  //  swatches which can be selected inside the color picker
      onChange: (e, knobData, hsla) => console.log(e, knobData, hsla, knobData.value)
    },

    {
      cssVar: ['main-bg', null, document.body], // [alias for the CSS variable, units, applies on element]
      label: 'Background',
      type: 'color',
      value: '#FFFFFF',
      onChange: (e, knobData, hsla) => console.log(e, knobData, hsla, knobData.value)
    },

    ["Label example", false] // group is collapsed by default
    {
      cssVar: ['hide'], // alias for the CSS variable
      label: 'Show',
      type: 'checkbox',
      // checked: true,  // default
      value: 'none',
      onChange: console.log
    },

    {
      label: 'Custom with label',
      render: `
        <button type='button' class='specialBtn1'>1</button>
        <button type='button' class='specialBtn2'>2</button>
      `,
      script(knobs, name){
        knobs.getKnobElm(name).addEventListener("click", e => {
          if( e.target.tagName == 'BUTTON' )
            alert(e.target.textContent)
        })
      },
    },

    {
      render: `
        <button type='button' class='specialBtn3'>😎</button>
      `,
      script(knobs){
        const elm = knobs.DOM.scope.querySelector('.specialBtn3')
        elm.addEventListener("click", () => alert('😎'))
      },
      knobClass: 'custom-actions'
    }
  ]
}

var penKnobs = new Knobs(settings)
```
