import { render } from 'react-dom'
import App from './App'
import store from './init'

render(
  <App store={store}/>,
  document.getElementById('root'),
)
