import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
import Store from './store'

ReactDOM.render(<Store children={<App />} />, document.getElementById('root'))
