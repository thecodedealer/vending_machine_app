import * as types from './types'
import { createReducer } from '../../services/redux'

import appService from '../../services/core/appService'

// INITIAL STATE
const initialState = {
    user: {
        balance: 0,
        purchase: {
            cherry: 0,
            ginger: 0,
            mist: 0,
            berry: 0,
            mint: 0,
        },
    },
}

// REDUCER METHODS
const setUpConfig = (state, action) => {
    const { globalConfig, stock: allStocks, orders } = action.data

    const stock = appService.resolveLastItem(allStocks)

    return {
        ...globalConfig,
        stock,
        allStocks,
        orders,
        user: {
            id: appService.generateUniqId('user_'),
        },
    }
}

const refreshItems = (state, action) => {
    const { data } = action.data

    return {
        data,
    }
}

const addMoney = (state, action) => {
    const { money } = action

    return {
        user: {
            balance: state.user.balance + money,
        },
    }
}

const purchaseItem = (state, action) => {
    const { letter, number, stockAmount } = action.payload

    const { name, price } = appService.getProductFromId(number, state.products)

    return {
        user: {
            balance: state.user.balance - price,
            purchase: {
                [name]: state.user.purchase[name] + 1,
            },
        },
        stock: {
            [letter]: {
                [letter + number]: stockAmount - 1,
            },
        },
    }
}

const payback = (state, action) => {
    return {
        user: {
            balance: 0,
        },
    }
}

const addOrder = (state, action) => {
    const newOrder = action.payload
    return {
        orders: {
            ...state.orders,
            ...newOrder,
        },
    }
}

// REDUCER
const reducer = createReducer(initialState, {
    [types.SET_UP_CONFIG]: setUpConfig,
    [types.REFRESH_ITEMS]: refreshItems,

    [types.ADD_MONEY]: addMoney,
    [types.PURCHASE_ITEM]: purchaseItem,

    [types.PAYBACK]: payback,

    [types.ADD_ORDER]: addOrder,
})

export default reducer
