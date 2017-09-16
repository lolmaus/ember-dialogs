// ----- Ember modules -----
import Helper from '@ember/component/helper'
import { inject as service } from '@ember/service'



export default Helper.extend({

  // ----- Servies -----
  dialogs : service(),



  // ----- Overridden methods -----
  compute (args, params) {
    return () => this.get('dialogs').prompt(params)
  },
})
