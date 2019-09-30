import { combineReducers } from 'redux'

// imported reducers
import commonReducer from './common/reducer'
import authReducer from './auth/reducer'
import configReducer from './config/reducer'

// export root reducer
export const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
    config: configReducer,
})
