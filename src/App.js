import React, { Suspense, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { useDispatch } from 'react-redux'
// import './styles/index.scss'

import { configAsyncActions } from './store/config'

import Layout from './hoc/Layout/Layout'

const App = props => {
    const dispatch = useDispatch()
    const { route } = props

    useEffect(() => {
        // Load config
        dispatch(configAsyncActions.loadConfig())
    }, [])

    return (
        <Layout {...props}>
            <div className="App">
                {/*<Router/>*/}
                <Suspense fallback={<p>Loading ...</p>}>
                    {renderRoutes(route.routes)}
                </Suspense>
            </div>
        </Layout>
    )
}

export default withRouter(App)
