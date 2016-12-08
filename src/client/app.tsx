import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
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

import * as reducers from "./store"

// const middleware = applyMiddleware(thunk, logger())

console.log("Hello World")

const colors = {
    onTime: "#3DCC91",
    delayed: "#F29D49",
    veryLate: "#A82A2A"

}

class Pop extends React.Component<{}, {}> {
    render() {
        let popoverContent = (
            <div style={{
                textAlign: "center"
            }}>
                <h5>Settings</h5>
                <h5>Instructions</h5>
                <button className="pt-button pt-popover-dismiss">Close</button>
            </div>
        );

        return ( 
            <Popover content={popoverContent}
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="pt-popover-content-sizing"
                    position={Position.BOTTOM_RIGHT}
                    isModal={true}
                    useSmartPositioning={false}>
                <button className="pt-button pt-minimal pt-icon-cog"></button>
            </Popover>
        )
    }
}

// Refactor this so it's one class that takes props, obviously

class StopInfo extends React.Component<{}, {}> {
    render() {
        let popoverContent = (
            <div>
                <h5>Pop Title</h5>
                <p>You Clicked On Something</p>
                <button className="pt-button pt-popover-dismiss">Dismiss</button>
            </div>
        );

        return ( 
            <Popover content={popoverContent}
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="pt-popover-content-sizing"
                    position={Position.BOTTOM}
                    useSmartPositioning={true}>
                <button type="button" className="pt-button">Stop Info<span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span></button>
            </Popover>
        )
    }
}

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
                <button 
                    className="pt-button pt-intent-primary"
                    onClick={() => {
                        console.log("color changed")
                        this.setState({ bgColor: colors.veryLate })
                    }}
                >
                    Change Bg Color
                </button>
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
                        <Pop />
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


ReactDOM.render(<App />


, document.getElementById("root"))