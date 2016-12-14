import * as React from "react";

export class TimeDisplay extends React.Component <{}, {}> {
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