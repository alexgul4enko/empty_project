import { RouterConfig, Redirect, Router } from '@cranium/router'
import { CheckAccess } from '@cranium/access'
import routes from 'routes'

const configs = new RouterConfig()
configs.addInterceptor(
  function(props) {
    return props.access ? (
      <CheckAccess level= {props.access} fallback={props.fallback || <Redirect to={props.accessRedirectTo }/>} >{props.children}</CheckAccess>
    )
      : props.children
  }
)

export default function AppRouter(props) {
  return (
    <Router routes={routes} notFountUrl="404" configs={configs} />
  )
}
