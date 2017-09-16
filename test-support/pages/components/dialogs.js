import c from './_component'

export const backdrop = c('.ember-dialogs-backdrop')

export const dialog = c('.ember-dialogs-dialog', {
  resetScope : true,

  message  : c('.ember-dialogs-dialog-message'),
  buttonOk : c('.ember-dialogs-dialog-button.-ember-dialogs-ok'),
})
