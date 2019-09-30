import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Router from './hoc/Router/Router'
import { Provider } from 'react-redux'

import reduxService from './services/redux/reduxService'

// service worker
import * as serviceWorker from './serviceWorker'

// root component
import App from './App'

// redux store
const store = reduxService.createStore()

const app = (
    <Provider store={store}>
        <BrowserRouter>{renderRoutes(Router(App))}</BrowserRouter>
    </Provider>
)

// root element
const target = document.getElementById('root')

ReactDOM.render(app, target)

serviceWorker.register()
