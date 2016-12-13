import { Action, combineReducers } from "redux";

interface A<T> extends Action {
    payload?: T;
}

const colorReducer = (state="#3DCC91", action: A<any>) => {
    switch(action.type) {
        case "ON_TIME":
            return "#3DCC91"
        case "DELAYED":
            return "#F29D49"
        case "VERY_LATE":
            return "#A82A2A"
        default:
            return state
    }
}

const busApiMainReducer = (state:any = {}, action: A<any>) => {
    switch(action.type) {
        case "FETCHING_DATA":
            return
        case "FETCHED_DATA":
            return Object.assign({}, state, {currentData: action.payload})
        default:
            return state

    }
}

export const reducers = combineReducers({
    colorReducer,
    busApiMainReducer
})
export default reducers;