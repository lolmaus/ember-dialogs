// ----- Ember modules -----
import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { reads as writable } from '@ember/object/computed'

// ----- Own modules -----
import layout from '../templates/components/ember-dialogs'



export default Component.extend({

  // ----- Services -----
  dialogs : service(),



  // ----- Overridden properties -----
  layout,
  tagName : null,



  // ----- Normal properties -----
  userInput : writable('dialogs.value'),



  // ----- Actions -----
  actions : {
    backdrop () {
      if (!this.get('dialogs.backdropClickable')) return

      if (this.get('dialogs.type') === 'alert') this.get('dialogs.actionOkWrapped')()
      else                                      this.get('dialogs.actionCancelWrapped')()
    },

    ok (userInput) {
      this.get('dialogs.actionOkWrapped')(userInput)
    },

    cancel () {
      this.get('dialogs.actionCancelWrapped')()
    },
  },
})
