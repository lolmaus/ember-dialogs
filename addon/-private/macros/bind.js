// ----- Ember modules -----
import { computed } from '@ember/object'



export default function bindMacro (key) {
  return computed(function () {
    return this[key].bind(this)
  })
}
