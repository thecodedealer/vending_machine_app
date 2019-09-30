import React, { useEffect } from 'react'
import appService from '../../services/core/appService'
import { useSelector } from 'react-redux'

import makeStyles from '@material-ui/core/styles/makeStyles'

import VendingService from '../../services/feaatures/VendingService'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
    list: {
        marginTop: 50,
        width: 150,
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#fbf19c',
    },
    nav: {
        marginTop: 20,
    },
    txt: {
        color: 'white',
        paddingBottom: 25,
    },
}))

const VendingMachine = props => {
    const { route } = props
    const { products, stock } = useSelector(store => store.config)
    let items = ''

    if (products) {
        let { date, ...rest } = products

        items = appService
            .transformObjectToArray(rest, 'price', 'asc')
            .map(item => (
                <React.Fragment>
                    <ListItem button>
                        <ListItemText
                            primary={`Cola ${item.name.toUpperCase()}`}
                            secondary={`Price: $${item.price}`}
                        />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))
    }

    const isEmpty = (letter, num) => {
        if (stock) return stock[letter][letter + num] === 0
    }

    const classes = useStyles()

    useEffect(() => {
        window.vending = new VendingService()
    }, [])

    return (
        <React.Fragment>
            <div id="vendingMachine">
                <div className={classes.list}>
                    <h5>PRICES LIST</h5>
                    <List
                        component="nav"
                        className={classes.root}
                        aria-label="mailbox folders"
                    >
                        {items}
                    </List>
                </div>
                <div className="machine">
                    <div className="inner">
                        <div className="arm">
                            <div className="hand" />
                        </div>

                        {['A', 'B', 'C', 'D', 'E'].map(item => (
                            <div key={item} className="shelf" data-shelf={item}>
                                <div className="container" data-can="1">
                                    <div
                                        className={`can ${
                                            isEmpty(item, 1)
                                                ? 'abraCadabra'
                                                : ''
                                        }`}
                                    />
                                </div>
                                <div className="container" data-can="2">
                                    <div
                                        className={`can ${
                                            isEmpty(item, 2)
                                                ? 'abraCadabra'
                                                : ''
                                        }`}
                                    />
                                </div>
                                <div className="container" data-can="3">
                                    <div
                                        className={`can ${
                                            isEmpty(item, 3)
                                                ? 'abraCadabra'
                                                : ''
                                        }`}
                                    />
                                </div>
                                <div className="container" data-can="4">
                                    <div
                                        className={`can ${
                                            isEmpty(item, 4)
                                                ? 'abraCadabra'
                                                : ''
                                        }`}
                                    />
                                </div>
                                <div className="container" data-can="5">
                                    <div
                                        className={`can ${
                                            isEmpty(item, 5)
                                                ? 'abraCadabra'
                                                : ''
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass" />

                    <div className="tray-inner" />

                    <div className="tray" />

                    <div className="numberpad" />
                </div>

                <div className="numpad">
                    <div className={classes.txt}>Select your product</div>
                    <div className="current-input" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default VendingMachine
