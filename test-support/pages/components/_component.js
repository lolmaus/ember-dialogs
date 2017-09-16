import {
  attribute,
  clickable,
  fillable,
  findElement,
  hasClass,
  isVisible,
  text,
  value,
} from "../../page-object"

// import testSelector from "ember-test-selectors"

import $ from "jquery"
// import _ from 'lodash'



// A helper to leverage jQuery for page component queries
export function jquery (callback, errorIfMissing = true) {
  return {
    isDescriptor : true,

    get () {
      const $el = findElement(this)

      if (errorIfMissing && !$el.length) {
        throw new Error(`Element ${this.scope} not found.`)
      }

      return callback($el)
    },
  }
}



export default function component (scope = "", descriptor = {}) {
  // If a descriptor is passed as the first arg
  if (scope === Object(scope)) {
    descriptor = scope
    scope = null
  }

  return {
    ...(scope ? { scope, itemScope : scope } : {}), // inject the scope only if it was provided

    $                : jquery($el => $el),
    attribute        : attribute(),
    blur             : jquery($el => $el.blur()),
    checked          : jquery($el => $el.is(":checked")),
    click            : clickable(),
    contains         : jquery($el => selector => $el.find(selector).length > 0, false),
    disabled         : jquery($el => $el.is("[disabled]")),
    empty            : jquery($el => $el.is(":empty") || !$el.children().length && !$el.text().trim().length),
    exists           : jquery($el => $el.length > 0, false), // false: don't spit an error if element isn't found
    fill             : fillable(),
    focus            : jquery($el => $el.focus()),
    index            : jquery($el => $el.index()),
    hasClass         : jquery($el => className => $el.hasClass(className)),
    active           : hasClass("active"),
    disabledViaClass : hasClass("disabled"),
    visible          : isVisible(),
    placeholder      : attribute("placeholder"),
    text             : text(),
    value            : value(),

    keyup (code) {
      const event = new $.Event("keyup")
      event.which = code
      event.keyCode = code
      return this.$.trigger(event)
    },

    ...descriptor,
  }
}



/**
 * A test-selector driven decorator for the `component` function
 *
 * First argument -- first argument of test selector
 * Last argument -- optional object for component()
 * In between -- optional arguments for test selector
 */
// export function t (selectorBefore, ...args) {
//   const obj =
//         _.isObject(args[args.length - 1])
//           ? args.pop()
//           : {}
//
//   const selectorAfter = testSelector(selectorBefore, ...args)
//   return component(selectorAfter, obj)
// }
