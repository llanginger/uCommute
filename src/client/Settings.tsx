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
 } from "@blueprintjs/core"

export class SettingsPop extends React.Component<{}, {}> {
    render() {
        let popoverContent = (
            <div style={{
                textAlign: "center"
            }}>
                <h5>Settings</h5>
                <h5>Instructions</h5>
                <h5>Test thing</h5>
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
