import PropTypes from 'prop-types'
import { AccessProvider } from '@cranium/access'
import acessLevels from './access'
import { useSelector } from 'react-redux'

AppAccess.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function AppAccess({ children }) {
  const session = useSelector(({ session }) => session)
  console.log({ session })
  return (
    <AccessProvider acessLevels={acessLevels} session={session}>
      {children}
    </AccessProvider>
  )
}
