import {combineReducers} from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    citiesRedux: citiesReducer,
    itinerariesRedux: itinerariesReducer,
    usersReducer: usersReducer,


})

export default rootReducer