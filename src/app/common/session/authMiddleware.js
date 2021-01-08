import api from 'api'
import get from 'lodash/get'
import { reset } from '@cranium/cache'

export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(reset())
        throw new Error(response.statusText)
      }
      return { data, response }
    },
  })
  return (next) => action => {
    return next(action)
  }
}
