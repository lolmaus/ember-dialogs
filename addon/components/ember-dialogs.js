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
})
