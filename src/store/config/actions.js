import * as types from './types'

export const setUpConfig = data => {
    return {
        type: types.SET_UP_CONFIG,
        data: data,
    }
}

export const refreshItems = data => {
    return {
        type: types.REFRESH_ITEMS,
        data: data,
    }
}

export const addMoney = money => {
    return {
        type: types.ADD_MONEY,
        money: money,
    }
}

export const purchaseItem = payload => {
    return {
        type: types.PURCHASE_ITEM,
        payload: payload,
    }
}

export const resolvePayback = () => {
    return {
        type: types.PAYBACK,
    }
}

export const addNewOrder = payload => {
    return {
        type: types.ADD_ORDER,
        payload: payload,
    }
}
