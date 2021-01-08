import { withFinalForm, customResource } from '@cranium/resource'
import validate from './utils/validate'


function login(API, payload) {
  return API.post('accounts/login', payload).then(_ => API.get('accounts/me'))
}

const sessionResource = customResource(login)

export default withFinalForm(
  {
    validate,
  },
  sessionResource('session'),
  {
    prefetch: false,
  }
)
