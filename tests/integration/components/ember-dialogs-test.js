import { moduleForComponent, test } from 'ember-qunit'
import { withChai } from 'ember-cli-chai/qunit'
import hbs from 'htmlbars-inline-precompile'
import { create } from 'ember-cli-page-object'
import {alert} from 'dummy/tests/pages/components/dialogs'
import wait from 'ember-test-helpers/wait'
import $ from 'jquery'
import { run } from '@ember/runloop'

const page = create(alert)
let dialogs, m



moduleForComponent('ember-dialogs', 'Integration | Component | ember dialogs', {
  integration : true,
  beforeEach () {
    page.setContext(this)
    this.inject.service('dialogs')
    dialogs = this.get('dialogs')
  },

  afterEach () {
    page.removeContext()
    $('body').removeClass('-ember-dialogs-block-scrolling')
  },
})



test('basic', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  m = '#0 Initial: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = '#0 Initial: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = '#0 Initial: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false

  run(() => {
    dialogs.alert({
      message : 'lol',
      actionOk () { value = true },
    })
  })

  await wait()

  m = '#1 After triggering dialog: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = '#1 After triggering dialog: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(1)

  m = '#1 After triggering dialog: message text'
  expect($('.ember-dialogs-dialog-message').text().trim(), m).equal('lol')

  m = '#1 After triggering dialog: button text'
  expect($('.ember-dialogs-dialog-button').text().trim(), m).equal('OK')

  m = '#1 After triggering dialog: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).true


  run(() => $('.ember-dialogs-dialog-button').click())
  await wait()

  m = '#2 After dismissing dialog: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = '#2 After dismissing dialog: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = '#2 After dismissing dialog: value'
  expect(value, m).ok

  m = '#2 After dismissing dialog: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false
}))



test('backdrop click should dismiss', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  run(() => {
    dialogs.alert({
      message : 'lol',
      actionOk () { value = true },
    })
  })
  await wait()

  run(() => $('.ember-dialogs-backdrop').click())
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = 'value'
  expect(value, m).true
}))



test('backdrop click should not dismiss when backdropClickable=false', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  run(() => {
    dialogs.alert({
      message           : 'lol',
      backdropClickable : false,
      actionOk () { value = true },
    })
  })
  await wait()

  run(() => $('.ember-dialogs-backdrop').click())
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(1)

  m = 'value'
  expect(value, m).false
}))



test('no backdrop, no action, no blockScrolling', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  run(() => {
    dialogs.alert({
      message        : 'lol',
      backdrop       : false,
      blockScrolling : false,
    })
  })
  await wait()

  m = 'body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false

  run(() => $('.ember-dialogs-backdrop').click())
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  run(() => $('.ember-dialogs-dialog-button').click())
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)
}))



test('confirm', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  run(() => {
    dialogs.confirm({
      message : 'lol',
      actionCancel () { value = true },
    })
  })
  await wait()

  m = 'cancel button existence'
  expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel'), m).length(1)

  m = 'cancel button text'
  expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel').text().trim(), m).equal('Cancel')

  run(() => $('.ember-dialogs-dialog-button.-ember-dialogs-cancel').click())
  await wait()

  m = 'value'
  expect(value, m).true
}))



test('custom button labels', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  run(() => {
    dialogs.confirm({
      message     : 'lol',
      labelOk     : 'Yup',
      labelCancel : 'Nah',
    })
  })
  await wait()

  m = 'ok button text'
  expect($('.ember-dialogs-dialog-button.-ember-dialogs-ok').text().trim(), m).equal('Yup')

  m = 'cancel button text'
  expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel').text().trim(), m).equal('Nah')
}))



test('prompt', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = 'hee'

  run(() => {
    dialogs.prompt({
      message     : 'lol',
      placeholder : 'woo',
      value,
      actionOk (userInput) { value = userInput },
    })
  })
  await wait()

  m = 'cancel button existence'
  expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel'), m).length(1)

  m = 'input existence'
  expect($('.ember-dialogs-dialog-input'), m).length(1)

  m = 'input placeholder'
  expect($('.ember-dialogs-dialog-input').attr('placeholder'), m).equal('woo')

  m = 'input initial value'
  expect($('.ember-dialogs-dialog-input').val(), m).equal('hee')

  run(() => $('.ember-dialogs-dialog-input').val('heeyoo'))
  await wait()

  run(() => $('.ember-dialogs-dialog-input').change())
  await wait()

  run(() => $('.ember-dialogs-dialog-button.-ember-dialogs-ok').click())
  await wait()

  m = 'value'
  expect(value, m).equal('heeyoo')

  run(() => {
    dialogs.prompt({
      message     : 'lol',
      placeholder : 'woo',
      value       : 'naa',
      actionOk (userInput) { value = userInput },
    })
  })
  await wait()

  m = 'input value after second invocation'
  expect($('.ember-dialogs-dialog-input').val(), m).equal('naa')
}))
