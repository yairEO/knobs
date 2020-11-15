<p align="center">
  <a href='https://www.npmjs.com/package/@yaireo/knobs'>
      <img src="https://img.shields.io/npm/v/@yaireo/knobs.svg" />
  </a>
  <a href='https://simple.wikipedia.org/wiki/MIT_License'>
      <img src="https://img.shields.io/badge/license-MIT-lightgrey" />
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@yaireo/knobs" />
</p>

<h1 align="center">
  <a href='https://codepen.io/vsync/pen/KKMwyRO'>Knobs</a> - UI controllers for JS/CSS live manipulation
</h1>

<h3 align="center">
  👉 Demos: <a href='https://codepen.io/vsync/pen/KKMwyRO' target='_blank'>Codepen</a> 👈
</h3>

<p align="center">
<br>
  <a href='https://codepen.io/vsync/pen/KKMwyRO'>
      <img src="./horizontal.png?sanitize=true" alt="Knobs - Horizontal"/>
      <img src="./compact.png?sanitize=true" alt="Knobs - Compact"/>
  </a>
<br>
<p>

## What is this:

Started as something I needed for my many Codepens - A way to provide viewers, and myself, a set
of controllers, for manipulating the DOM instantaneously.

Imagine certain aspects of a web page, or a specific *component*, which you would like to add the ability
to control on-the-fly. Change the visual looks or certain javascript parameters with a move or a slider.

CSS-variables (custom properties) are a great match for this script as they compute in real-time. Javascript is of course a benefitor because every knobs can be attached with a callback that recieves the current value, and additional data, as to what that value should be applied on.

**⚠️ Supported only in modern browsers**

It's so easy & quick to use Knobs, about 1 minute!

### Features

* `Range` input
* `Color` input
* `Checkbox` input
* Resset all (to defaults)
* Reset individual
* Labels - allows grouping of every knob defined after a label
* Expanding/collapsing knobs' groups
* Apply change live, on-the-fly, or with an <kbd>Apply</kbd> button
* Knobs are completely **isolated** within an *iframe* (unaffected by page styles)
* Allows 3 states of visibility:
  * Always visible
  * Show on Icon click, Default open
  * Show on Icon click, Default closed
* `position` of the knobs on the viewport:
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

| Name         | Type                  | Default                                                                                                                                                                                                                                                                                       | Info                                                                                                               |
|--------------|-----------------------|---------|--------------------------------------------------------------------------------------------------------------------|
| theme        | `Object`              |         | Knobs theme variables.  Since the Knobs are encapsulated within an iframe,  they cannot be be styled from outside. |
| live         | `Boolean`             | `true`  | Should changes be immediately applied                                                                              |
| visible      | `Number`              | `0`     | `0` - Starts as hidden<br> `1` - Starts as visible<br> `2` - Always visible                                        |
| CSSVarTarget | `Element`/`NodeList ` |         | Global HTML element(s) for which to apply the CSS custom properties.<br> Can also be configured per-knob.             |
| knobs        | `Array`               |         | Array of Objects describing the knobs controllers on-screen

<details>
  <summary><strong>theme</strong> (defaults)</summary>

```js
{
  styles      : ``,                // optioanlly add any CSS and it will be injected into the iframe
  flow        : 'horizontal',      // use 'compact' to keep things tight
  position    : 'top right',
  primaryColor: '#0366D6',         // mainly for links / range sliders
  backgroud   : "rgba(0,0,0,1)",
  textColor   : "#CCC",
  border      : 'none'
}
```
</details>

<details>
  <summary><strong>knobs</strong></summary>

An array of Objects, where the properties describe a *knob*.

It is ***possible*** to define/change the `knobs` Array **after** instance initialization, like so:

```js
var myKnobs = new Knobs({ CSSVarTarget:document.body }) // only if working with CSS variables

myKnobs.knobs = [{...}, ...] // see example further down
myKnobs.render()
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

**`label`**

A text which is displayed alongside the knob

**`value`**

Acts as the initial value of the knob, except if the knob is a `checkbox`, in which case,
if the knob also has `cssVar` property set, then check the checkbox is checked, that CSS variable
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
</details>


## Install:

```
npm i @yaireo/Knobs
```

**Or include the JS file from a CDN source:**

    unpkg.com/@yaireo/knobs


## Example:

### When Using with NPM, first import `Knobs`
```js
import Knobs from '@yaireo/knobs'
```

### Defining Knobs:

```js
var settings = {
  theme: {
    position: 'bottom right', // default is 'top left'
  },
  live: false, // should update immediately (default true)
  visible: 0, // 0 - starts as hidden, 1 - starts as visible, 2 - always visible
  CSSVarTarget: document.querySelector('.testSubject'),
  knobs: [
    {
      cssVar: ['width', 'px'],
      label: 'Width',
      type: 'range',
      value: 200,
      min: 0,
      max: 500,
      step: 50,
      onChange: console.log
    },
    {
      cssVar: ['height', 'vh'],
      label: 'Height',
      type: 'range',
      value: 20,
      min: 0,
      max: 100,
      onChange: console.log
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
      value: '#45FDA9',
      onChange: console.log
    },
    {
      cssVar: ['main-bg', null, document.body], // [alias for the CSS variable, units, applies on element]
      label: 'Background',
      type: 'color',
      value: '#FFFFFF',
      onChange: console.log
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
  ]
}

var penKnobs = new Knobs(settings)
```
