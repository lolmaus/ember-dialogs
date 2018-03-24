// ----- Ember imports -----
import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { next } from '@ember/runloop'



export default Controller.extend({

  // ----- Services -----
  dialogs : service(),



  // ----- Normal properties -----
  alertValue   : false,
  confirmValue : false,
  promptValue  : 'foo',
  chainValue   : false,



  // ----- Actions -----
  actions : {
    chain () {
      const dialogs = this.get('dialogs')

      dialogs
        .alert({message : 'Gonna change value'})
        .then(() => dialogs.confirm({message : 'Are you sure?'}))
        .then(() => dialogs.prompt({message : 'Type "yes" to proceed'}))
        .then(userInput => {
          if (userInput.toLowerCase() === 'yes') this.toggleProperty('chainValue')
        })
    },

    nested () {
      const dialogs = this.get('dialogs')

      dialogs.alert({
        message  : 'Gonna change value',
        actionOk : () => {

          // Need to wrap next()
          next(() => {
            dialogs.confirm({
              message  : 'Are you sure?',
              actionOk : () => {

                next(() => {
                  dialogs.prompt({
                    message  : 'Type "yes" to proceed',
                    actionOk : userInput => {
                      if (userInput.toLowerCase() === 'yes') this.toggleProperty('chainValue')
                    },
                  })
                })

              },
            })
          })

        },
      })
    },
  },
})
