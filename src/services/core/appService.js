import AbstractService from './abstractService'
import log from 'loglevel'
import uniqid from 'uniqid'
import _ from 'lodash'
import reduxService from '../redux/reduxService'
import { openPopup } from '../../store/common/actions'
import { red } from '@material-ui/core/colors'


class AppService extends AbstractService {

    resolveLastItem(items) {
        return _.chain(items)
            .map((value, id) => ({ id, ...value }))
            .maxBy(el => new Date(el.date).getTime())
            .value()
    }

    getStockId() {
        const { stock: { id } } = reduxService.getState('config')
        return id
    }

    getUserId() {
        const { user: {id} } = reduxService.getState('config')

        return id
    }

    getStockAmount(letter, number) {
        const { stock } = reduxService.getState('config')
        return stock[letter][letter + number]
    }

    getProductFromId(id, products) {
        if(!products)
            products = reduxService.getState('config').products

        let key = _.findKey(products, { id: id })
        return { ...products[key], name: key }
    }

    hasMoney(productId) {
        const { products, user: { balance } } = reduxService.getState('config')
        const { price } = this.getProductFromId(productId, products)

        console.log({ price, balance })

        if (price > balance) {
            reduxService.dispatch(openPopup('warning', {
                title: 'You don\'t have enough money to purchase this beverage',
                msg: `Please add $${price - balance} more`,
            }))
            return false
        } else
            return true

    }

    isSlotEmpty(slotLetter, slotNumber) {
        console.log('checkIfSlotEmpty', { slotLetter, slotNumber })
        const { stock } = reduxService.getState('config')
        const slot = stock[slotLetter][slotLetter + slotNumber]

        return slot === 0
    }

    transformObjectToArray(obj, orderBy, orderType) {
        return _.chain(obj)
            .map((v, name) => ({ name, ...v }))
            .orderBy(orderBy, orderType)
            .value()

    }

    /*
        Generate unique id
     */
    generateUniqId(pre = '') {
        return !!pre ? uniqid(pre) : uniqid()
    }
}

export default new AppService()
