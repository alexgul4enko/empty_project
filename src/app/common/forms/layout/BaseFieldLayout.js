import PropTypes from 'prop-types'
import { useMemo } from 'react'
import cx from 'common/utils/cx'
import styles from './layout.scss'


BaseFieldLayout.propTypes = {
  label: PropTypes.node,
  inputComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  errorClassName: PropTypes.string,
}

BaseFieldLayout.defaultProps = {
  label: undefined,
  errorClassName: undefined,
}

export default function BaseFieldLayout({
  label,
  inputComponent: InputComponent,
  meta,
  input,
  errorClassName,
  ...rest
}) {
  const error = useMemo(() => {
    if(meta.submitError && !meta.dirtySinceLastSubmit) {
      return meta.submitError
    }
    if(meta.error && meta.touched) {
      return meta.error
    }
  }, [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError])
  const errorText = useMemo(() => {
    if(Array.isArray(error)) {
      return error.map((text) => <p key={text} className={styles.errorText}>{text}</p>)
    }
    return error
  }, [error])

  return (
    <div className={styles.field}>
      {label ? (<label className={styles.label}>{label}</label>) : null}
      <InputComponent
        error={Boolean(error)}
        {...rest}
        {...input}
      />
      <span className={cx(styles.error, errorClassName)}>{errorText}</span>
    </div>
  )
}
