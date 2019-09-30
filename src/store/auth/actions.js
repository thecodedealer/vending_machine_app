import * as types from './types'

export const testAuth = flag => {
    return {
        type: types.TEST_AUTH,
        flag: flag,
    }
}

export const setUpLogin = data => {
    return {
        type: types.SET_UP_LOGIN,
        data: data,
    }
}
