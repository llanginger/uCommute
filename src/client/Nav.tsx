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
import { SettingsPop } from "./Settings"
import { StopInfo } from "./StopInfo"


export class Nav extends React.Component<{}, {}> {
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