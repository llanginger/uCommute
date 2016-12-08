import { combineReducers } from "redux";

const colorReducer = (state="#3DCC91", action) => {
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

const reducers = combineReducers({
    colorReducer
})
export default reducers;