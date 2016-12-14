import * as React from "react";
import * as Blueprint from "@blueprintjs/core";
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel,
    Popover,
    PopoverInteractionKind,
    Position
} from "@blueprintjs/core";
import { AjaxButton } from "./AjaxButton"

const colors = {
    onTime: "#3DCC91",
    delayed: "#F29D49",
    veryLate: "#A82A2A"

}

interface BusAnimState {
    bgColor: string
}

export class BusAnim extends React.Component<any, BusAnimState> {
    
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
                <AjaxButton store={this.props.store}/>
            </div>
        )
    }
}
