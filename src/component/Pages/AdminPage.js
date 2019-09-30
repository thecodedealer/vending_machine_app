import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refillStock } from '../../store/config/asyncActions'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import _ from 'lodash'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'

import { openPopup } from '../../store/common/actions'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import appService from '../../services/core/appService'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    card: {
        margin: theme.spacing(4),
    },
    stocksContainer: {
        height: '600px',
        overflow: 'auto',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
    tableContainer: {
        width: '100%',
        paper: {
            marginTop: theme.spacing(3),
            width: '100%',
            overflowX: 'auto',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
    },
}))

const AdminPage = props => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { allStocks, orders } = useSelector(store => store.config)
    const [values, setValues] = useState({
        id: '',
        pass: '',
        items: '',
    })

    const ITEMS = [
        {
            value: 1,
            label: 1,
        },
        {
            value: 2,
            label: 2,
        },
        {
            value: 3,
            label: 3,
        },
        {
            value: 4,
            label: 4,
        },
        {
            value: 5,
            label: 5,
        },
    ]

    const getItemsSlot = letter => {
        return [1, 2, 3, 4, 5].reduce((obj, value) => {
            obj[letter + value] = values.items
            return obj
        }, {})
    }

    const handleUserInput = name => e => {
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }

    const handleRefill = () => {
        if (!values.id || !values.pass || !values.items)
            dispatch(
                openPopup('warning', {
                    title:
                        'Please enter your badge id, password and number of items',
                })
            )
        else
            dispatch(
                refillStock({
                    badgeId: values.id,
                    date: new Date(),
                    A: getItemsSlot('A'),
                    B: getItemsSlot('B'),
                    C: getItemsSlot('C'),
                    D: getItemsSlot('D'),
                    E: getItemsSlot('E'),
                })
            )
    }

    let stockItems = ''

    if (allStocks) {
        stockItems = _.chain(allStocks)
            .values()
            .orderBy('date', 'desc')
            .map(stock => (
                <Card key={stock.id} className={classes.card}>
                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Date:{' '}
                            {moment(stock.date).format('DD-MM-YYYY | HH:mm')}
                        </Typography>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Badge ID: {stock.id}
                        </Typography>
                        <Typography variant="h5" component="h2"></Typography>

                        <pre> {JSON.stringify(stock, null, 2)}</pre>
                    </CardContent>
                </Card>
            ))
            .value()
    }

    let elOrders = ''

    if (!!orders) {
        elOrders = appService
            .transformObjectToArray(orders, 'date', 'desc')
            .map(order => (
                <TableRow>
                    <TableCell align="right">{order.userId}</TableCell>
                    <TableCell align="right">{order.product}</TableCell>
                    <TableCell align="right">{order.stockId}</TableCell>
                    <TableCell align="right">{order.slotNumber}</TableCell>
                    <TableCell align="right">
                        {moment(order.date).format('DD-MM-YYYY | HH:mm')}
                    </TableCell>
                </TableRow>
            ))
    }

    return (

        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h2">
                        Controls
                    </Typography>
                    <Paper className={classes.stocksContainer}>
                        <p>
                            Enter your credentials in order to refill the
                            vending machine
                        </p>

                        <form
                            className={classes.container}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        id="id"
                                        label="Badge ID (numbers only)"
                                        className={classes.textField}
                                        margin="normal"
                                        type="number"
                                        onChange={handleUserInput('id')}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={handleUserInput('pass')}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Select"
                                        className={classes.textField}
                                        value={values.items}
                                        onChange={handleUserInput('items')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="Please select how many items do you want to add on slot"
                                        margin="normal"
                                    >
                                        {ITEMS.map(option => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRefill}
                        >
                            Refill stock
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h2">
                        Stock reports
                    </Typography>
                    <Paper className={classes.stocksContainer}>
                        {stockItems}
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.tableContainer}>
                        <Paper className={classes.tableContainer.paper}>
                            <Typography variant="h5" component="h2">
                                Orders
                            </Typography>
                            <Table
                                className={classes.tableContainer.table}
                                size="small"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">
                                            User id
                                        </TableCell>
                                        <TableCell align="right">
                                            Product name
                                        </TableCell>
                                        <TableCell align="right">
                                            Stock id
                                        </TableCell>
                                        <TableCell align="right">
                                            Slot number
                                        </TableCell>
                                        <TableCell align="right">
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{elOrders}</TableBody>
                            </Table>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default AdminPage
