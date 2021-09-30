const citiesReducer = (state = {cities: [], filtered: [], oneCity: {}}, action) => {
    switch(action.type ) {
        case 'GET_ALL_CITIES':
            return {
                ...state,
                cities: action.payload,
                filtered: action.payload
            }
        case 'FILTER_CITIES':
            return {
                ...state,
                filtered: state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            }
        case 'GET_ONE_CITY':
            return {
                ...state,
                oneCity: state.cities.find(city => city._id === action.payload)
            }

        default: 
            return state
    }
}

export default citiesReducer