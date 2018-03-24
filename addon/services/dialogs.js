// ----- Ember modules -----
import Service from '@ember/service'
import { reads as writable } from '@ember/object/computed'
import { defineProperty } from '@ember/object'
import { next } from '@ember/runloop'

// ----- Ember addon modules -----

// ----- Third-party modules -----
import RSVP from 'rsvp'

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
  userInput : writable('value'),



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

    const userActionDeferred = RSVP.defer(`ember-dialogs: ${message}`)

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

      userActionDeferred,
    })

    return userActionDeferred.promise
  },

  alert (params) {
    return this.dialog({
      ...params,
      type : 'alert',
    })
  },

  confirm (params) {
    return this.dialog({
      ...params,
      type : 'confirm',
    })
  },

  prompt (params) {
    return this.dialog({
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

    defineProperty(this, 'userInput', writable('value'))

    this._unblockScrolling()
  },

  actionOkWrapped       : bind('_actionOkWrapped'),
  actionCancelWrapped   : bind('_actionCancelWrapped'),
  actionBackdropWrapped : bind('_actionBackdropWrapped'),



  // ----- Private methods -----
  _actionOkWrapped (userInput) {
    const actionOk = this.get('actionOk')
    if (actionOk) actionOk(userInput)

    const userActionDeferred = this.get('userActionDeferred')
    next(() => userActionDeferred.resolve(userInput))

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

    const userActionDeferred = this.get('userActionDeferred')
    next(() => userActionDeferred.reject())

    this.reset()
  },

  _actionBackdropWrapped () {
    if (!this.get('backdropClickable')) return

    if (this.get('type') === 'alert') this.get('actionOkWrapped')()
    else                              this.get('actionCancelWrapped')()
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
