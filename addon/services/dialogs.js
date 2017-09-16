// ----- Ember modules -----
import Service from '@ember/service'
// import { computed } from '@ember/object'

// ----- Ember addon modules -----

// ----- Third-party modules -----

// ----- Own modules -----
import bind from 'ember-dialogs/-private/macros/bind'

// ----- Constants -----
const BLOCK_SCROLLING_CLASS = '-ember-dialogs-block-scrolling'



export default Service.extend({

  // ----- Normal properties -----
  message : null,
  type    : null,

  actionOk : null,
  labelOk  : null,

  actionCancel  : null,
  labelCancel   : null,
  cancelVisible : null,

  backdrop          : null,
  backdropClickable : null,



  // ----- Computed properties -----



  // ----- Methods -----
  dialog (params) {
    const {
      message,
      type,

      actionOk,
      labelOk = 'OK',

      actionCancel,
      labelCancel   = 'Cancel',
      cancelVisible = true,

      value       = '',
      placeholder = '',

      backdrop          = true,
      backdropClickable = true,

      blockScrolling    = true,
    } = params

    if (blockScrolling) this._blockScrolling()

    this.setProperties({
      message,
      type,

      actionOk,
      labelOk,

      actionCancel,
      labelCancel,
      cancelVisible,

      value,
      placeholder,

      backdrop,
      backdropClickable,
    })
  },

  alert (params) {
    this.dialog({
      ...params,
      type : 'alert',
    })
  },

  confirm (params) {
    this.dialog({
      ...params,
      type : 'confirm',
    })
  },

  prompt (params) {
    this.dialog({
      ...params,
      type : 'prompt',
    })
  },

  reset () {
    this.setProperties({
      message : null,
      type    : null,

      actionOk : null,
      labelOk  : null,

      actionCancel  : null,
      labelCancel   : null,
      cancelVisible : null,

      value       : null,
      placeholder : null,

      backdrop          : null,
      backdropClickable : null,
    })

    this._unblockScrolling()
  },

  actionOkWrapped     : bind('_actionOkWrapped'),
  actionCancelWrapped : bind('_actionCancelWrapped'),



  // ----- Private methods -----
  _actionOkWrapped (userInput) {
    const actionOk = this.get('actionOk')
    if (actionOk) actionOk(userInput)

    this.reset()
  },

  _actionCancelWrapped () {
    const actionCancel = this.get('actionCancel')
    const type         = this.get('type')

    if (
      actionCancel
      && (
        type !== 'prompt'
        || this.get('cancelVisible')
      )
    ) actionCancel()

    this.reset()
  },

  _blockScrolling () {
    document
      .querySelector('body')
      .classList
      .add(BLOCK_SCROLLING_CLASS)
  },

  _unblockScrolling () {
    document
      .querySelector('body')
      .classList
      .remove(BLOCK_SCROLLING_CLASS)
  },
})
