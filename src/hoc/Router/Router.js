import React, { lazy } from 'react'

import HomePage from '../../component/Pages/HomePage'

const VendingPage = lazy(() => import('../../component/Pages/VendingPage'))
const AdminPage = lazy(() => import('../../component/Pages/AdminPage'))

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        path: '/vending',
        render: props => <VendingPage {...props} />,
    },
    {
        path: '/admin',
        render: props => <AdminPage {...props} />,
    },
    {
        //Not Found
        component: () => <h1>404 Not found</h1>,
    },
]

export default root => {
    return [
        {
            component: root,
            routes: routes,
        },
    ]
}
