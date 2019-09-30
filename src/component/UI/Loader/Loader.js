import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
})

const Loader = props => {
    const classes = useStyles()

    const { loading: isLoading } = useSelector(store => store.common)

    let loader = null

    if (isLoading)
        loader = (
            <div className={classes.root}>
                <LinearProgress color="secondary" />
            </div>
        )

    return <>{loader}</>
}

export default Loader
