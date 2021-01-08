import { API } from '@cranium/api'
import { QueryParams } from '@cranium/queryparams'
import get from 'lodash/get'

export const QS = new QueryParams()

const api = new API({
  baseURL: `${process.env.API_URL}`,
  queryFuntion: QS.buildQueryParams,
})

export default api
