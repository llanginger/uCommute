import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Blueprint from "@blueprintjs/core";
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel,
    Popover,
    PopoverInteractionKind,
    Position
 } from "@blueprintjs/core"

// import * as thunk from "redux";

// Custom Modules

import reducers from "./store"
import { TimeDisplay } from "./TimeDisplay"
import { AjaxButton } from "./AjaxButton"
import { BusAnim } from "./BusAnim"
import { Nav } from "./Nav"



// const middleware = applyMiddleware(thunk, logger())

console.log("Hello World")

// Refactor this so it's one class that takes props, obviously

class App extends React.Component<any, any> {
    render() {
        return (
            <div style={{
                position: "relative",
                width: "375px",
                height: "667px"
            }}>
                <Nav />
                <TimeDisplay />
                <BusAnim store={this.props.store}/>
                <footer style={{
                    position: "absolute",
                    bottom: "0px",
                    width: "100%",
                }}>
                    <h5 style={{
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#30404D",
                        height: "40px",
                        marginBottom: "0px",
                        paddingTop: "10px"
                    }}>Footer</h5>
                </footer>
            </div>
        )
    }
}

const logger: any = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const myStore: any = createStore(reducers, applyMiddleware(logger))
console.log(myStore)
myStore.dispatch({type: "ON_TIME"})
console.log(myStore)


ReactDOM.render( <App store={myStore}/>, document.getElementById("root"))