import { createReducer } from '../../services/redux/'
import * as types from './types'

// INITIAL STATE
const initialState = {
    showPopup: '',
    loading: false,
    test: 0,
}

// REDUCER METHODS
const startLoading = (state, action) => {
    return {
        loading: true,
    }
}

const stopLoading = (state, action) => {
    return {
        loading: false,
    }
}

const testFn = (state, action) => {
    return {
        test: action.number,
    }
}

const openPopup = (state, action) => {
    const { option, details } = action
    return {
        showPopup: { option, details },
    }
}

const closePopup = (state, action) => {
    return {
        showPopup: '',
    }
}

// REDUCER
const reducer = createReducer(initialState, {
    [types.START_LOADING]: startLoading,
    [types.STOP_LOADING]: stopLoading,
    [types.TEST]: testFn,
    [types.OPEN_POPUP]: openPopup,
    [types.CLOSE_POPUP]: closePopup,
})

export default reducer
