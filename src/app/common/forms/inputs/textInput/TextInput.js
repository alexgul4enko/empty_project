import PropTypes from 'prop-types'
import { useCallback } from 'react'
import cx from 'common/utils/cx'
import styles from './text-input.scss'


TextInput.propTypes = {
  inputClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
}

TextInput.defaultProps = {
  inputClassName: '',
}

export default function TextInput({ error, onChange, inputClassName, ...props }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      {...props}
      className={cx(styles.input, inputClassName)}
      onChange={handleChange}
    />
  )
}
