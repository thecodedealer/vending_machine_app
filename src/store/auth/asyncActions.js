import * as actions from './actions'
import * as commonActions from '../common/actions'

import authClient from '../../services/request/clients/authClient'

export const login = () => {
    return dispatch => {
        dispatch(commonActions.startLoading())
        authClient
            .login()
            .then(res => {
                dispatch(actions.setUpLogin(res.data.data))
            })
            .catch(e => {
                console.log(111)
                console.log(e.toString())
                dispatch(commonActions.openPopup(e.toString()))
            })
            .finally(() => dispatch(commonActions.stopLoading()))
    }
}
