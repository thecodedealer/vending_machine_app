import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'
import _ from 'lodash'

import { addMoney, resolvePayback } from '../../store/config/actions'
import { openPopup } from '../../store/common/actions'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'

import ImageIcon from '@material-ui/icons/Image'

const useStyles = makeStyles({
    card: {
        marginTop: 50,
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 20,
        marginBottom: 12,
    },
    btnHolder: {
        marginBottom: 25,
    },
})

const VendingMachine = props => {
    const { route } = props
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.config)
    const classes = useStyles()

    const MONEY = [1, 2, 5, 10]

    const handlePayback = () => {
        if (user.balance > 0) {
            dispatch(
                openPopup('success', {
                    title: 'Payback',
                    msg: `We returned your $${user.balance}`,
                })
            )
            dispatch(resolvePayback())
        }
    }

    const handleAddingMoney = value => {
        dispatch(addMoney(value))
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        MONEY: ${user.balance}
                    </Typography>
                    <Divider />
                    <Typography className={classes.pos} color="textSecondary">
                        ADD MONEY
                    </Typography>
                    <div className={classes.btnHolder}>
                        {MONEY.map(value => (
                            <Button
                                key={value}
                                color="primary"
                                variant="outlined"
                                onClick={() => handleAddingMoney(value)}
                            >
                                ${value}
                            </Button>
                        ))}
                    </div>

                    <Divider />
                </CardContent>
                <CardActions>
                    <Button onClick={handlePayback} size="small">
                        PAYBACK
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        You bought :
                    </Typography>
                    <List className={classes.root}>
                        {_.chain(user.purchase)
                            .map((value, key) => (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`Cola ${key}`}
                                        secondary={value}
                                    />
                                </ListItem>
                            ))
                            .value()}
                    </List>
                </CardContent>
            </Card>
        </>
    )
}

export default VendingMachine
