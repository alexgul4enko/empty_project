import PropTypes from 'prop-types'
import { useCallback } from 'react'
import cx from 'common/utils/cx'
import styles from './text-input.module.scss'


TextInput.propTypes = {
  inputClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
  inputClassName: '',
}

export default function TextInput({ onChange, inputClassName, ...props }) {
  const handleChange = useCallback((event) => onChange(event.target.value), [onChange])
  return (
    <input
      {...props}
      className={cx(styles.input, inputClassName)}
      onChange={handleChange}
    />
  )
}
