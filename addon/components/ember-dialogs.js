// ----- Ember modules -----
import Component from '@ember/component'
import { inject as service } from '@ember/service'

// ----- Own modules -----
import layout from '../templates/components/ember-dialogs'



export default Component.extend({

  // ----- Services -----
  dialogs : service(),



  // ----- Overridden properties -----
  layout,
  tagName : null,



  // ----- Normal properties -----
  userInput : '',



  // ----- Actions -----
  actions : {
    backdrop () {
      const clickable = this.get('dialogs.backdropClickable')

      if (clickable) this.get('dialogs.actionOkWrapped')()
    },
  },
})
