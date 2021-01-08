import PropTypes from 'prop-types'
import { AccessProvider } from '@cranium/access'
import acessLevels from './access'


AppAccess.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function AppAccess({ children }) {
  return (
    <AccessProvider acessLevels={acessLevels}>
      {children}
    </AccessProvider>
  )
}
