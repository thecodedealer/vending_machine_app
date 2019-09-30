import AbstractService from './abstractService'
import { handleError } from '../utils'
import localforage from 'localforage'


let stores = {}

class LocalStoreService extends AbstractService{
    #store

    constructor(name) {
        super()
        if (!name)
            this.log.error('Please provide a name for the local store.')
        if (!!stores[name])
            this.log.error(`${name} store is already used.`)
        // create local store
        this.#store = stores[name] = localforage.createInstance({
            name: name,
            version: 1.0,
        })

        this.init()

    }

    init() {
        this.#store.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE])
            .then(() => this.log.log(`Local store seated up!`))
            .catch(e => this.log.error(e, `Local store unable to set up`))
    }

    set(key, value) {
        try {
            const data = {
                data: value,
                time: new Date(),
            }
            return this.#store.setItem(key, data)
        } catch (e) {
            handleError(e)
        }
    }

    async get(key, option = 'data') {
        try {
            key = String(key)
            return await this.#store.getItem(key)[option]
        } catch (e) {
            handleError(e)
        }
    }

    remove(key) {
        try {
            key = String(key)
            this.#store.removeItem(key)
        } catch (e) {
            handleError(e)
        }
    }
}

export default LocalStoreService
