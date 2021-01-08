import 'polyfills'
import '../styles/index.scss'
import API from './api'
import { resourcesReducer } from '@cranium/resource'
import { cacheMiddleware, persistReducer } from '@cranium/cache'
import { promisableActionMiddleware, composeReducers, combineReducers } from '@cranium/redux-helpers'
import { createStore, applyMiddleware } from 'redux'
import { reducers } from 'store'
import * as Sentry from '@sentry/browser'
import createSentryMiddleware from 'redux-sentry-middleware'
import authMiddleware from 'common/session/authMiddleware'
import omit from 'lodash/omit'
import { composeWithDevTools } from 'redux-devtools-extension'


if(process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.SENTRY_ENVIRONMENT })
}


const compose = composeWithDevTools({
  name: process.env.APP_NAME,
})

export default createStore(
  composeReducers(
    {},
    combineReducers(reducers),
    persistReducer(JSON.parse(process.env.CACHE_STATE_PERSIST_KEYS)),
    resourcesReducer,
  ),
  {},
  compose(
    applyMiddleware(...[
      authMiddleware,
      promisableActionMiddleware({ API }),
      cacheMiddleware({
        storeKey: process.env.STORAGE_KEY,
        cacheKeys: JSON.parse(process.env.CACHE_STATE_KEYS),
        storage: localStorage,
      }),
      process.env.SENTRY_DSN && createSentryMiddleware(Sentry, {
        stateTransformer: (state) => { return omit(state, 'session') },
      }),

    ].filter(Boolean))
  )
)
