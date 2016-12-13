import * as React from "react";
import * as Blueprint from "@blueprintjs/core";
import * as request from "request"
import * as axios from "axios"


export class AjaxButton extends React.Component<{}, {}> {
    constructor(props) {
        super(props)
        this._doAjax = this._doAjax.bind(this)
    }

    _doAjax() {
       axios.get("oneBus").then((response: {data: {}}) => console.log(response.data))
    }
    render() {
        return (
            <button onClick={this._doAjax}>AjaxButton</button>
        )
    }
}