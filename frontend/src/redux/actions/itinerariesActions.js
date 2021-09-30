import axios from 'axios'

const itinerariesActions = {
    getItineraries: (id) => {
        return async (dispatch, getState) => {
            let response = await axios.get('http://localhost:4000/api/itineraries/' + id)
            if (!response.data.success) {
                throw new Error ("There´s been a conection error")
            }
            dispatch({type: 'GET_ITINERARIES', payload: response.data.response})
        }
    },

    likes: (itineraryId, token) => {
       
        return async (dispatch, getState) => {
            //Le pido al backend que me valide el token
            try {
                let response = await axios.put(`http://localhost:4000/api/likes/${itineraryId}`, {},
                {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if(response.data.success) {
                return ({success: true, response: response.data.response})
            } else {
                return({success: false})
            }
            } catch(error) {
                return {success: false, response: error.message}
            }
        }
    },

    addComment: (token, id, comment) => {
        return async (dispatch, getState) => {
              //Le pido al backend que me valide el token
            try {
                let response = await axios.post(`http://localhost:4000/api/comments/${id}`, comment, 
                {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            return response.data.response
            } catch(error) {
                console.log(error)
            }
        }
    },

    /* likes: (token, ) => {
        return async (dispatch, getState) => {
            //Le pido al backend que me valide el token
            try {
                let response = await axios.get('http://localhost:4000/api/likes', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            return response.data.response
            } catch(error) {
                console.log(error)

            }
        }
    }, */

    /* addComment: (id, comment) => {
        return async () => {
            try {
                let response = await axios.post('http://localhost:4000/api/comments/' + id, comment, {
                headers: {
                    Authorization: 'Bearer ' + input.token,
                },
            })
            return response.data.response
            } catch(error) {
                console.log(error)
            }
        }
    }, */

    
}

export default itinerariesActions