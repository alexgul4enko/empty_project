import PropTypes from 'prop-types'

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
}

Loader.defaultProps = {
  children: undefined,
}

export default function Loader({ isLoading, children }) {
  return isLoading ? <div>Loading..</div> : children
}
