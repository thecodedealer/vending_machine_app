import React from 'react'
import VendingMachine from '../VendingMachine/VendingMachine'
import VendingController from '../VendingMachine/VendingController'

import Grid from '@material-ui/core/Grid'

const VendingPage = props => {
    const { route } = props

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <VendingMachine />
            </Grid>
            <Grid item xs={5}>
                <VendingController />
            </Grid>
        </Grid>
    )
}

export default VendingPage
