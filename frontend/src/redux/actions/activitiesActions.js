import axios from 'axios'

const activitiesActions = {
    getActivities: (id) => {
        return async (dispatch, getState) => {
            let response = await axios.get('http://localhost:4000/api/activities/' + id)
            if (!response.data.success) {
                throw new Error ("Error backend-DB response")
            }
            return response
/*             dispatch({type: 'GET_ACTIVITIES', payload: response.data.response})
 */        }
    }
}

export default activitiesActions