import RequestService from '../requestService'


class ConfigClient extends RequestService {
    #request
    #baseURL = 'https://vending-app-c1b48.firebaseio.com/'
    #controller = 'config'

    constructor() {
        super()

        //create new request instance
        this.#request = this.createInstance(this.#baseURL)
    }

    /*
       ENDPOINTS
    */

    getConfig() {
        return this.#request.get('config.json')
    }

    getStock() {
        return this.#request.get('stock.json')
    }

    refreshStock(POST) {
        return this.#request.post('stock.json', POST)
    }

    updateItem(POST) {
        return this.#request.patch('stock.json', POST)
    }

    getOrders() {
        return this.#request.get('orders.json')
    }

    updateOrders(POST) {
        return this.#request.post('orders.json', POST)
    }
}

export default new ConfigClient()
