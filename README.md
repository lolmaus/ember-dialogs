# ember-dialogs

[![Travis build status](https://img.shields.io/travis/lolmaus/ember-dialogs.svg)](https://travis-ci.org/lolmaus/ember-dialogs)
[![Ember Observer Score](http://emberobserver.com/badges/ember-dialogs.svg?cache_bust=1)](http://emberobserver.com/addons/ember-dialogs)
[![npm package version](https://img.shields.io/npm/v/ember-dialogs.svg)](https://www.npmjs.com/package/ember-dialogs)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/lolmaus/ember-dialogs/blob/gen-1/LICENSE.md)
![ember-versions 2.8+](https://img.shields.io/badge/ember--versions-2.8%2B-yellowgreen.svg)
![node-versions 4+](https://img.shields.io/badge/node--versions-4%2B-yellowgreen.svg)
![ember-cli 2.16.0-beta.1](https://img.shields.io/badge/uses%20ember--cli-2.16.0-beta.1-blue.svg)


Customizable implementation of `alert`, `confirm` and `prompt` modal dialogs with straightforward API.

Modal dialogs are driven by [liquid-tether](https://pzuraq.github.io/liquid-tether/).



## Features

* API is close to native `alert`, `confirm` and `prompt`.
* Execute with JS or a simple template action. You no longer need to add a duplicate template entry every time you need a dialog.
* Use built-in looks or throw in your own.
* Can be effortlessly animated with `liquid-fire`.
* Blocks page scrolling while a dialog is active.
* Prompt supports placeholder and initial value.



## Planned features

You are welcome to contribute!

* A11y/ARIA.
* Keyboard support: tabindex, cancel with Esc, etc.
* Autofocus on input.



## Why

Native `alert`, `confirm` and `prompt` functions are very handy and simple to use, yet they have a few drawbacks:

1. Their looks aren't customizable, always out of sync with your app's design.
2. Their looks are different from browser to browser.
3. There's no backdrop.
4. They are a pain to test.
5. :warning: They block the JS thread, messing with animations and mouse/finger events.

A common solution is to use a custom dialog. Every time you need one, you typically add a duplicate entry like this:

```handlebars
<button {{action (toggle 'isConfirmDialogOpen' this)}}>
  Do the thing
</button>

{{#if isConfirmDialogOpen}}
  {{confirm-dialog
    message      = 'Are you sure?'
    actionOk     = (action 'doTheThing')
    actionCancel = (action (toggle 'isConfirmDialogOpen' this))
  }}
{{/if}}
```

`ember-dialogs` removes the redundancy, reducing the above boilerplate to:

```handlebars
<button {{action (confirm
  message      = 'Are you sure?'
  actionOk     = (action 'doTheThing')
  actionCancel = (action (toggle 'isConfirmDialogOpen' this))
)}}>
  Do the thing
</button>
```

Alternatively, you can trigger dialogs programmatically without having to update your templates for every invocation:

```js
// Old-school, blocking approach
if (confirm('Are you sure?') {
  this._doTheThing()
}

// ember-dialogs non-blocking approach
this.get('dialogs').confirm({
  message: 'Are you sure?',
  actionOk () { this._doTheThing() },
})
```



## Installation

    ember i ember-dialogs

Then add this snippet to your `application` template:

```handlebars
{{ember-dialogs}}
```

These components will no render anything until a dialog is invoked. They will be reused for every invocation.



## Invoking a dialog from JS

Call `alert`, `confirm` or `prompt` on the `dialogs` service:

```js
import Component from '@ember/component'
import { inject as service } from '@ember/service'

export default Component.extend({
  dialogs: service(),
  
  importantValue: false,
  
  actions: {
    toggle (value) {
      this.get('dialogs').confirm({
        message: 'Are you sure?',
        actionOk: () => { this.set('importantValue', value) }, // Use arrow function to keep the scope
      })
    }
  }
})
```

Note: this example uses [modern import paths](https://github.com/ember-cli/ember-rfc176-data).



## Invoking a dialog from a template

Use `alert`, `confirm` or `prompt` helper:

```js
import Component from '@ember/component'
import { inject as service } from '@ember/service'

export default Component.extend({
  dialogs: service(),
  
  importantValue: false,
})
```

```hbs
<a href {{action (confirm
  message  = 'Are you sure?'
  actionOk = (toggle 'importantValue' this)
)}}>
  Toggle
</a>
```

Note: this example uses the `toggle` helper from [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers).



## Arguments

Both methods and helpers accept a single arguments with a hash of values:

| Argument            | Type                             | Default value | Description                                                                                                  |
|:--------------------|:---------------------------------|:--------------|:-------------------------------------------------------------------------------------------------------------|
| `message`           | String                           | <required>    | Text to appear in the dialog.                                                                                |
| `actionOk`          | Closure action, function or null | `null`        | Action to execute when user presses OK.                                                                      |
| `actionCancel`      | Closure action, function or null | `null`        | Action to execute when user presses Cancel (not applicable for `alert`).                                     |
| `labelOk`           | String                           | `'OK'`        | Text to appear on the OK button.                                                                             |
| `labelCancel`       | String                           | `'Cancel'`    | Text to appear on the Cancel button (not applicable for `alert`).                                            |
| `cancelVisible`     | Boolean                          | `true`        | Whether to show the Cancel button (applicable only for `prompt`).                                            |
| `value`             | String                           | `''`          | Initial value for the input of `prompt`.                                                                     |
| `placeholder`       | String                           | `''`          | Placeholder for the input of `prompt`.                                                                       |
| `backdrop`          | Boolean                          | `true`        | Whether to render the backdrop.                                                                              |
| `backdropClickable` | Boolean                          | `true`        | Whether the backdrop triggers an action (`actionOk` for `alert`, `actionCancel` for `confirm` and `prompt` . |
| `blockScrolling`    | Boolean                          | `true`        | Whether to block page scrolling while the dialog is active.                                                  |

Note: clicking backdrop triggers `actionOk` for `alert` and `actionCancel` for `confirm`/`prompt`. `actionCancel` will *not* be triggered in `prompt` mode if `cancelVisible` is disabled.



## Animating

Use [liquid-fire](https://ember-animation.github.io/liquid-fire/) to apply transitions.

You can target the backdrop with `this.hasClass('ember-dialogs-backdrop')`.

A dialog can be targeted with `this.hasClass('ember-dialogs-dialogTether')`.

You can distinguish dialog type with `this.toValue(str)`, values are `'alert'`, `'confirm'` and `'prompt'`.

In `app/transitions.js`:

```js
this.transition(
  this.hasClass('ember-dialogs-backdrop'),
  this.use('fade')
)

this.transition(
  this.hasClass('ember-dialogs-dialog'),
  this.use('toUp'),
  this.reverse('toDown')
)
```



## Customizing

In order to throw in your own HTML for the dialogs, use the block form of components in the `application` template:

```handlebars
{{#ember-dialogs as |params|}}
  <div class="dialog">
    {{#if params.message}}
      <p class="message">{{params.message}}</p>
    {{/if}}

    {{#if (eq params.type 'prompt')}}
      {{input 
        class       = 'input'
        value       = params.userInput
        placeholder = params.placeholder
        enter       = (action params.actionOk params.userInput)
      }}
    {{/if}}

    <button
      class = "ok"
      {{action params.actionOk params.userInput}}
    >
      {{params.labelOk}}
    </button>

    {{#if params.shouldDisplayCancel}}
      <button
        class = "cancel"
        {{action params.actionCancel}}
      >
        {{params.labelCancel}}
      </button>
    {{/if}}
  </div>
{{/ember-dialogs}}
```

Here's a list of params available as properties on the yielded object:

| Property              | Expected type  | Description                                                                                                                          |
|:----------------------|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `message`             | String         | Text to appear on the modal.                                                                                                         |
| `type`                | String         | `'alert'`, `'confirm'` or `'prompt'`                                                                                                 |
| `value`               | String         | Value for the prompt input field. Using it as `{{input}}`'value will mutate the bound value as user types into the input.            |
| `userInput`           | String         | Same as `value` but passed through `reads` computed property. Mutating it does not update the bound value.                           |
| `placeholder`         | String         | Placeholder for the prompt input field.                                                                                              |
| `labelOk`             | String         | Label for the OK button.                                                                                                             |
| `labelCancel`         | String         | Label for the Cancel button.                                                                                                         |
| `actionOk`            | Closure action | Action to execute when OK button is clicked.                                                                                         |
| `actionCancel`        | Closure action | Action to execute when Cancel button is clicked.                                                                                     |
| `actionBackdrop`      | Closure action | Action to execute when the backdrop is clicked: either OK or Cancel depending on dialog type. Useful for an 🗙 button in top corner. |
| `backdropClickable`   | Boolean        | Whether the backdrop is clickable. Can be used to hide an 🗙 button in top corner.                                                   |
| `cancelVisible`       | Boolean        | Value of the `cancelVisible` property passed when calling a dialog.                                                                  |
| `shouldDisplayCancel` | Boolean        | False for `alert`, true for `confirm`, equal to `cancelVisible` for `prompt`.                                                        |




## Customizing the backdrop

The backdrop is a single HTML element which can be customized by applying CSS to `.ember-dialogs-backdrop`.



## Testing with page objects

[ember-cli-page-object](ember-cli-page-object.js.org) is the recommended way of accessing the dialogs in your tests

You can import pages objects like this:

```js
import {backdrop, dialog} from '<your-app-name>/tests/pages/components/dialogs'
```

Here's a list of nodes on the page objects:

```
backdrop // The backdrop element

dialog              // The dialog
dialog.message      // The text label
dialog.input        // The input field (only in prompt mode)
dialog.buttonOk     // The confirmation button
dialog.buttonCancel // The cancellation button (only in confirm and prompt modes)
```

Every page object node has the following properties and methods:

```
.$           // the jQuery object of the element
.exists      // whether the element exists
.index       // index of the element among siblings
.visible     // whether the element is not hidden with CSS
.text        // trimmed text content of the element, including child elements

.attribute(str) // returns the value of the given attribute on element
.click()        // trigger the click event on the element
.keyup(code)    // trigger the `keyup` event on the element, use http://keycode.info/
.blur()         // remove focus from the element
.focus()        // set focus to the element
.hasClass(str)  // returns true/false

// Applicable only to the input:
.value       // value attr (applicable only to the input)
.placeholder // placeholder attr text (applicable only to the input)
.fill(str)   // populate with text
```

Some usage examples:

```
assert.equal(alert.message.text, 'Are you sure?')
assert.ok(backdrop.hasClass('-ember-dialogs-clickable')

prompt.input.fill('I agree')
backdrop.click()
prompt.buttonOk.click()

assert.ok(confirm.$.offset().top > 100)
```

See our [acceptance tests](https://github.com/lolmaus/ember-dialogs/blob/gen-0/tests/acceptance/index-test.js) for some inspiration.


## Chained usage

If you invoke a dialog from another dialog's action, the inner dialog will not show up.
 
This is because the outer dialog will cleanup after itself and hide the inner dialog immediately after it shows up. The inner dialog doesn't even get to render.

To work around this issue, wrap the inner dialog invocation with `next`. See demo app's [`chain` action](https://github.com/lolmaus/ember-dialogs/blob/gen-0/tests/dummy/app/controllers/index.js).



## Notable dependencies

* [liquid-tether](https://pzuraq.github.io/liquid-tether/)
* [liquid-fire](https://ember-animation.github.io/liquid-fire/)
* jQuery
* [ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers)



## Private API usage

This addon uses `defineProperty` from `'@ember/object'` which is marked as private in the API docs. If you know a better way to reset an overwritten `reads` CP, please create an issue or PR.



## License

[MIT](https://github.com/lolmaus/ember-dialogs/blob/gen-0/LICENSE.md).



## Credit

Build by Andrey Mihkaylov ([lolmaus](https://github.com/lolmaus)) and [contributors](https://github.com/lolmaus/ember-dialogs/graphs/contributors).
