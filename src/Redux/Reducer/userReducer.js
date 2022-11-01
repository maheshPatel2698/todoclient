import { LOGIN, LOGOUT, AUTH, DELETE_USER, EDIT_USER } from "../Actions/actions.type"

const initiaState = {
    user: null,
    token: null,
    userID: null
}

const userReducer = (state = initiaState, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, token: action.payload }

        case LOGIN:
            return action.payload === null ?
                { ...state, user: null }
                :
                { ...state, user: action.payload }

        case LOGOUT:
            return action.payload === null ?
                { ...state, user: null }
                :
                { ...state, user: action.payload }

        case DELETE_USER:
            return { ...state, userID: action.payload }

        case EDIT_USER:
            return { ...state, userID: action.payload }

        default:
            return state
    }
}

export default userReducer