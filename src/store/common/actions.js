import * as types from './types'

// LOADING ACTIONS
export const startLoading = () => {
    return {
        type: types.START_LOADING,
    }
}

export const stopLoading = () => {
    return {
        type: types.STOP_LOADING,
    }
}

export const test = number => {
    return {
        type: types.TEST,
        number: number,
    }
}

export const openPopup = (option, details) => {
    return {
        type: types.OPEN_POPUP,
        option: option,
        details: details,
    }
}

export const closePopup = () => {
    return {
        type: types.CLOSE_POPUP,
    }
}

export const hello = () => {
    return {
        type: 'HEllO',
    }
}
