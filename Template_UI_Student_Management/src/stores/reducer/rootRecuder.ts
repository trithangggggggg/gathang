import { combineReducers } from "redux";
import { reducerStudent } from "./reducerStudent";



export const rootReducer= combineReducers({
    student: reducerStudent
})