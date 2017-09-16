// ----- Own modules -----
import ENV from 'dummy/config/environment'



export default function () {
  if (ENV.environment === 'test') return

  this.transition(
    this.hasClass('ember-dialogs-backdrop'),
    this.use('fade')
  )

  this.transition(
    this.hasClass('ember-dialogs-dialogTether'),
    this.use('toUp'),
    this.reverse('toDown')
  )
}
