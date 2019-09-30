import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'

import Header from '../../component/Header/Header'
import Loader from '../../component/UI/Loader/Loader'
import Popup from '../../component/Features/Popup'

const Layout = props => {
    const { location } = props

    const isLogin = location.pathname === '/login'

    return (
        <React.Fragment>
            <Loader />
            <Popup />
            {isLogin ? null : <Header {...props} />}
            <Container maxWidth="lg">
                <main>{props.children}</main>
            </Container>
        </React.Fragment>
    )
}

export default Layout
