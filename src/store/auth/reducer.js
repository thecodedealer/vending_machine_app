import * as types from './types'
import { fromJS } from 'immutable'
import { createReducer } from '../../services/redux'
import * as actionTypes from '../common/types'

const initialState = {
    isAuth: false,
    user: null,
    token: null,
    expireIn: null,
}

// REDUCER METHODS

const setUpLogin = (state, action) => {
    const { user, token } = action.data

    return {
        isAuth: true,
        user: user || null,
        token: token,
    }
}

// REDUCER
const reducer = createReducer(initialState, {
    [types.SET_UP_LOGIN]: setUpLogin,
})

export default reducer
