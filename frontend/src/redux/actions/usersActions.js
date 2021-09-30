import axios from 'axios'
import { toast } from 'react-toastify';

const usersActions = {
    logIn: (userInfo) => {
        return async (dispatch, getState) => {
            let response = await axios.post('http://localhost:4000/api/user/login', {...userInfo})
            if (!response.data.success) {
                throw response
            }
            dispatch({type: 'LOGIN_SIGNUP', payload: response.data.response})
            return response
          }  //de acá sale el error de conexión de back y front.        
    },

    signUp: (userInfo) => {
        return async (dispatch, getState) => {
            let response = await axios.post('http://localhost:4000/api/user/signup', {...userInfo})
            if (!response.data.success) {
                throw response
            }
            dispatch({type: 'LOGIN_SIGNUP', payload: response.data.response})
            return response
          }  //de acá sale el error de conexión de back y front.        
    },

    logOut: () => {
        return (dispatch, getState) => {
            dispatch({type: 'LOG_OUT'})
            toast('Goodbye! Hope to see you back soon!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    },

    logInLS: (token) => {
        return async (dispatch, getState) => {
            //Le pido al backend que me valide el token
            try {
                let response = await axios.get('http://localhost:4000/api/verifyToken', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            dispatch({type: 'LOGIN_SIGNUP', payload: {token, name: response.data.name, img: response.data.img, userId: response.data._id}})
            } catch(error) {
                return dispatch({type: 'LOG_OUT'})

            }
        }
    }
}

export default usersActions