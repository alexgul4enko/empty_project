import PropTypes from 'prop-types'
import { Link } from '@cranium/router'
import styles from './layout.scss'
import logo from '@img/example.png'

AppLayout.propTypes = {
  children: PropTypes.node,
}

AppLayout.defaultProps = {
  children: null,
}

export default function AppLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="root"><img src={logo} alt="logo" className={styles.logo}/></Link>
      </header>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}
