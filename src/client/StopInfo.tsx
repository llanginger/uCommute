import * as React from "react";
import * as Blueprint from "@blueprintjs/core";
import * as axios from "axios"
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel,
    Popover,
    PopoverInteractionKind,
    Position
 } from "@blueprintjs/core"



export class StopInfo extends React.Component<{}, {}> {
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