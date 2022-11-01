import { ALL_TODO, DELETE_TODO, SET_LOADING, UPDATE_TODO } from "../Actions/actions.type"

const initialState = {
    Todos: [],
    Todo: null,
    TodoId: null,
    isLoading: false,
    isUpdate: false
}
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_TODO:
            return action.payload === null ?
                { ...state, Todos: null }
                :
                { ...state, Todos: action.payload }
        case DELETE_TODO:
            return {
                ...state, TodoId: action.payload.deleteTodoId
            }
        case UPDATE_TODO:
            return {
                ...state, Todo: action.payload, isUpdate: action.status
            }
        case SET_LOADING:
            return { ...state, isLoading: action.payload }


        default:
            return state
    }
}

export default todoReducer