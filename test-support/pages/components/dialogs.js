import c from './_component'

export const backdrop = c('.ember-dialogs-backdrop')

export const dialog = c('.ember-dialogs-dialog', {
  resetScope : true,

  message      : c('.ember-dialogs-dialog-message'),
  input        : c('.ember-dialogs-dialog-input'),
  buttonOk     : c('.ember-dialogs-dialog-button.-ember-dialogs-ok'),
  buttonCancel : c('.ember-dialogs-dialog-button.-ember-dialogs-cancel'),
})
