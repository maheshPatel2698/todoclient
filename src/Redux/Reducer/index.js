import { combineReducers } from "redux";
import todoReducer from "./TodoReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    todoReducer,
    userReducer
})


export default rootReducer