import axios from 'axios'

const citiesActions = {
    getCities: () => {
        return async (dispatch, getState) => {
            let response = await axios.get('http://localhost:4000/api/cities')
            if (!response.data.success) {
                throw new Error ("Error backend-DB response")
            } 
            dispatch({type: 'GET_ALL_CITIES', payload: response.data.response})
        } 
    },

    filterCities: (e) => {
        const value = e.target.value
        return async (dispatch, getState) => {
            dispatch({type: 'FILTER_CITIES', payload: value})
        }
    },

    getOneCity: (id) => {
        return async (dispatch, getState) => {
            dispatch({type: 'GET_ONE_CITY', payload: id})
        }
    }

}

export default citiesActions