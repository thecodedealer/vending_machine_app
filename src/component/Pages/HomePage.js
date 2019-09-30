import React from 'react'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import VendingImg from '../../assets/vendingImg.png'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    imgContainer: {
        height: '500px',
        width: '350px',
        margin: 'auto',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        margin: '50px auto ',
        width: '250px',
        display: 'block',
    },
    btnWrapper: {},
}))

const HomePage = props => {
    const { history } = props

    const classes = useStyles()

    const handleAction = () => {
        history.push('/vending')
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                {/*title*/}
                <Typography variant="h3" align="center" color="textPrimary">
                    Welcome to Cola Flavorous Vending Machine
                </Typography>
                {/*image*/}
                <div className={classes.imgContainer}>
                    <img className={classes.image} src={VendingImg} />
                </div>
                {/*button*/}
                <div className={classes.btnWrapper}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleAction}
                    >
                        Jump to vending machine
                    </Button>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default HomePage
