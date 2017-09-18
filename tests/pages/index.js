import {
  create,
  visitable,
} from 'ember-cli-page-object'

import c from 'dummy/tests/pages/components/_component'

import {
  backdrop,
  dialog,
} from 'dummy/tests/pages/components/dialogs'



export default create({
  visit : visitable('/'),

  alertValue   : c('.route-index-alertValue'),
  alertTrigger : c('.route-index-alertTrigger'),

  confirmValue   : c('.route-index-confirmValue'),
  confirmTrigger : c('.route-index-confirmTrigger'),

  promptValue   : c('.route-index-promptValue'),
  promptTrigger : c('.route-index-promptTrigger'),

  backdrop,
  dialog,
})
