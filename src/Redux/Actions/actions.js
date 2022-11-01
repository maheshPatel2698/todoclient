import { LOGIN, LOGOUT, ALL_TODO, DELETE_TODO, UPDATE_TODO, AUTH, DELETE_USER, EDIT_USER, SET_LOADING } from "./actions.type"



export const logIn = (user) => {
    return {
        type: LOGIN,
        payload: user

    }
}

export const deleteUser = (userId) => {
    return {
        type: DELETE_USER,
        payload: userId
    }
}

export const editUser = (userId) => {
    return {
        type: EDIT_USER,
        payload: userId
    }
}

export const authUser = (authToken) => {
    return {
        type: AUTH,
        payload: authToken
    }
}

export const logOut = (user) => {
    return {
        type: LOGOUT,
        payload: user

    }
}

export const AllTodos = (todos) => {
    return {
        type: ALL_TODO,
        payload: todos
    }
}

export const deleteTodo = (deleteTodoId) => {
    return {
        type: DELETE_TODO,
        payload: {
            deleteTodoId
        }

    }
}

export const updateTodo = (todo, status) => {
    return {
        type: UPDATE_TODO,
        payload: todo,
        status: status
    }
}

export const setLoading = (status) => {
    return {
        type: SET_LOADING,
        payload: status
    }
}