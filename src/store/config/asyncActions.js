import * as types from './types'
import * as actions from './actions'

import configClient from '../../services/request/clients/configClient'
import * as commonActions from '../common/actions'

import { handleError } from '../../services/utils'

/**
 * GET CONFIG
 * @return {Function}
 */
export const loadConfig = () => {
    return async dispatch => {
        dispatch(commonActions.startLoading())

        try {
            const { data: globalConfig } = await configClient.getConfig()
            const { data: stock } = await configClient.getStock()
            const { data: orders } = await configClient.getOrders()

            dispatch(actions.setUpConfig({ globalConfig, stock, orders }))
            dispatch(commonActions.stopLoading())
        } catch (e) {
            dispatch(commonActions.openPopup('error', e))
            dispatch(commonActions.stopLoading())
        }
    }
}

export const refillStock = data => {
    return dispatch => {
        dispatch(commonActions.startLoading())
        configClient
          .refreshStock(data)
          .then(res => {
              console.log('Stock refilled')
              dispatch(loadConfig())
          })
          .catch(e => dispatch(commonActions.openPopup('error', e)))
          .finally(() => dispatch(commonActions.stopLoading()))
    }
}

export const resolvePurchase = payload => {
    const { letter, number, stockId, stockAmount, userId, product } = payload

    return async dispatch => {
        dispatch(commonActions.startLoading())

        try {
            dispatch(actions.purchaseItem(payload))
            await configClient.updateItem({
                [`${stockId}/${letter}/${letter + number}`]: stockAmount - 1,
            })
            const POST = {
                date: new Date(),
                userId,
                product,
                stockId,
                slotNumber: letter + number,
            }
            const { data: { name: id } } = await configClient.updateOrders(POST)
            //add order to current state
            dispatch(actions.addNewOrder({[id]: POST}))
        } catch (e) {
            handleError(e)
        } finally {
            dispatch(commonActions.stopLoading())
        }
    }
}
