import { test } from 'qunit'
import { withChai } from 'ember-cli-chai/qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'

import page from 'dummy/tests/pages/index'

moduleForAcceptance('Acceptance | index')

let m



test('initial state', withChai(async function (expect) {
  await visit('/')

  m = "backdrop existence"
  expect(page.backdrop.exists, m).false

  m = "dialog existence"
  expect(page.dialog.exists, m).false
}))




test('prompt', withChai(async function (expect) {
  await visit('/')
  await page.promptTrigger.click()

  m = "#0 Initial: value"
  expect(page.alertValue.text, m).equal("false")

  m = "#0 Initial: backdrop visibility"
  expect(page.backdrop.visible, m).true

  m = "#0 Initial: dialog visibility"
  expect(page.dialog.visible, m).true

  m = "#0 Initial: message text"
  expect(page.dialog.message.text, m).equal("Type in a new value")

  m = "#0 Initial: input value"
  expect(page.dialog.input.value, m).equal("foo")

  m = "#0 Initial: input placeholder"
  expect(page.dialog.input.placeholder, m).equal("Please type something")

  m = "#0 Initial: ok button text"
  expect(page.dialog.buttonOk.text, m).equal("Yup")

  m = "#0 Initial: cancel button text"
  expect(page.dialog.buttonCancel.text, m).equal("Nah")

  await page.dialog.input.fill('bar')
  await page.dialog.buttonOk.click()

  m = "#1 After click on OK: value"
  expect(page.promptValue.text, m).equal("bar")

  m = "#1 After click on OK: backdrop visibility"
  expect(page.backdrop.visible, m).false

  m = "#1 After click on OK: dialog visibility"
  expect(page.dialog.visible, m).false
}))
