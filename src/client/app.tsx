import * as React from "react";
import * as ReactDOM from "react-dom";
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


// import * as thunk from "redux-thunk";
// import * as logger from "redux-logger";

// Custom Modules

import reducers from "./store"
import { SettingsPop } from "./Settings"
import { StopInfo } from "./StopInfo"
import { AjaxButton } from "./AjaxButton"



// const middleware = applyMiddleware(thunk, logger())

console.log("Hello World")

const colors = {
    onTime: "#3DCC91",
    delayed: "#F29D49",
    veryLate: "#A82A2A"

}



// Refactor this so it's one class that takes props, obviously



class TimeDisplay extends React.Component <{}, {}> {
    render() {
        return (
            <div style={{
                marginTop: "30px",
                height: "100px",
                paddingTop: "10px",
                backgroundColor: "#30404D",
            }}>
                <ul style={{
                    padding: "0px",
                    listStyleType: "none",
                    textAlign: "center"
                }}>
                    <li><h4 style={{
                        color: "white"
                    }}>Time To Stop</h4></li>
                    <li><h4 style={{
                        color: "white"
                    }}>Time To Work</h4></li>
                </ul>
            </div>
        )
    }
}

interface BusAnimState {
    bgColor: string
}

class BusAnim extends React.Component<{}, BusAnimState> {
    
    constructor(props) {
        super(props)
        this.state = {
            bgColor: colors.onTime
        }
    }
    
    render() {
        
        return (
            <div style={{
                height: "350px",
                width: "375px",
                marginTop: "30px",
                backgroundColor: this.state.bgColor,
                color: "white"
            }}>
                Bus Animation goes here
                <AjaxButton />
            </div>
        )
    }
}

class Nav extends React.Component<{}, {}> {
    render() {
        return (
            <nav className="pt-navbar .modifier pt-dark">

                    <div className="pt-navbar-group pt-align-left">
                        <div className="pt-navbar-heading">uCommute</div>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <StopInfo />
                        <span className="pt-navbar-divider"></span>
                        <SettingsPop />
                    </div>
            </nav>
        )
    }
}

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div style={{
                position: "relative",
                width: "375px",
                height: "667px",
                backgroundColor: colors.veryLate
            }}>
                <Nav />
                <TimeDisplay />
                <BusAnim />
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

const store: any = createStore(reducers)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>


, document.getElementById("root"))