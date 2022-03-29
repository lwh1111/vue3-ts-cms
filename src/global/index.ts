import { App } from 'vue'
import { elIcons } from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App) {
  // elComponents(app)
  elIcons(app)
  registerProperties(app)
}
