import { Action, combineReducers } from "redux";

interface A<T> extends Action {
    type: string
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
            return state
        case "FETCHED_DATA":
            return Object.assign({}, state, {currentData: action.payload})
        default:
            return state
    }
}

const busStopInfoReducer = (state: any = [{ name: "dummy" }], action: A<any>) => {
    switch(action.type) {
        case "FETCHING_STOPS":
            return state
        case "FETCHED_STOPS":
            let newStopsArray = []
            for (var i in action.payload.data.list) {
                newStopsArray.push(action.payload.data.list[i])
            }
            return newStopsArray
        default:
            return state
    }
}

export const reducers = combineReducers({
    colorReducer,
    busApiMainReducer,
    busStopInfoReducer
})
export default reducers;