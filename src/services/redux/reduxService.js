import { merge } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../../store/rootReducer'

import { handleError } from '../utils'


class ReduxService {
    #store

    /**
     * CREATE REDUX STORE
     * @return {Store<any, AnyAction> & Store<S & {}, A> & {dispatch: any}}
     */
    createStore() {
        try {
            // REDUX DEV TOOLS
            let composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

            if (!composeEnhancers)
                composeEnhancers = compose

            // CREATE REDUX STORE with MIDDLEWARES
            return this.#store = window.reduxStore = createStore(rootReducer, composeEnhancers(
                applyMiddleware(thunk),
            ))
        } catch (e) {
            handleError(e)
        }
    }

    /**
     *  GET STATE FROM STORE
     * @param name {String} - state name
     * @return {*}
     */
    getState(name) {
        try {
            let state = this.#store.getState()[name]
            if (!state)
                console.trace(`State name ${name} not found!`)
            return state
        } catch (e) {
            handleError(e)
        }
    }

    /**
     *  DISPATCH ACTIONS
     * @param action {Object} - action creator
     */
    dispatch(action) {
        try {
            this.#store.dispatch(action)
        } catch (e) {
            handleError(e)
        }

    }

    /**
     *
     * @param name {String}
     * @param cb {Function}
     * @return {*}
     */
    watchState(name, cb) {
        const select = (state) => {
            return state[name]
        }

        let currentValue = null

        const handleChange = () => {
            let previousValue = currentValue
            currentValue = select(this.#store.getState())

            if (!(currentValue === previousValue)) {
                cb(currentValue, previousValue)
            }
        }
        return this.#store.subscribe(handleChange)
    }

    /**
     *  CREATE REDUCER
     * @param initialState {Object}
     * @param handlers {Object}
     * @return {function(*=, *=)} - new state
     */
    createReducer(initialState = {}, handlers) {
        return (state = initialState, action) => {
            const handler = handlers[action.type]
            //Throw err if no handler
            if (!handler)
                handleError(new Error(`Unknown action type ${action.type}`))
            const nextState = handler(state, action)
            // Deeply merge current and next state to new object
            return merge({}, state, nextState)
        }
    }
}

export default new ReduxService()

