const usersReducer = (state = {token: null, name: null, img: null, userId: null}, action) => {
    switch(action.type ) {
        case 'LOGIN_SIGNUP':
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('img', action.payload.img)
            localStorage.setItem('userId', action.payload.userId)
            return {
                token: action.payload.token,
                name: action.payload.name,
                img: action.payload.img,
                userId: action.payload.userId
            }
        case 'LOG_OUT':
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('img')
            localStorage.removeItem('userId')
            return {
                token: null,
                name: null,
                img: null,
                userId: null                
            }
        default: 
            return state
    }
}

export default usersReducer