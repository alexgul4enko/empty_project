import { validateEmail, validateRequired, compose } from 'common/forms/validation'

export default compose(
  validateRequired(['email', 'password']),
  validateEmail('email')
)
