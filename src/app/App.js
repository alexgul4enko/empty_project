import { Provider } from 'react-redux'
import Router from 'common/router'
import { CheckCache } from '@cranium/cache'
import routes from './routes'
import PropTypes from 'prop-types'
import AppAccess from 'common/session'

App.propTypes = {
  store: PropTypes.object.isRequired,
}


export default function App({ store }) {
  return (
    <Provider store={store}>
      <CheckCache>
        <AppAccess>
          <Router/>
        </AppAccess>
      </CheckCache>
    </Provider>
  )
}
