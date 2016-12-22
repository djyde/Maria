import * as React from 'react'
import { render } from 'react-dom'
import Demo from './components/Demo'

const App = () => {
  return <div>It works! <Demo /></div>
}

render(<App />, document.querySelector('#app'))
