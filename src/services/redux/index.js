import { handleError } from '../utils'
import { merge } from 'lodash'

/**
 *  CREATE REDUCER
 * @param initialState {Object}
 * @param handlers {Object}
 * @return {function(*=, *=)} - new state
 */
const createReducer = (initialState = {}, handlers) => {
    return (state = initialState, action) => {
        const actionType = action.type
        const handler = handlers[actionType]

        // check for special action types
        if (actionType.indexOf('@@') !== -1 || !handler) return state
        // throw error if no handler found
        // if (!handler) handleError(Error(`Unknown action type ${actionType}`))

        const nextState = handler(state, action)
        // Deeply merge current and next state to new object
        return merge({}, state, nextState)
    }
}


export { createReducer }
