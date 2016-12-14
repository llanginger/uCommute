import * as React from "react";
import * as Blueprint from "@blueprintjs/core";
import * as request from "request"
import * as axios from "axios"

interface AJButton {
    store: any
}

export class AjaxButton<AJButton> extends React.Component<any, any> {

    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._doAjax = this._doAjax.bind(this)
        this._getStopInfo = this._getStopInfo.bind(this)
        this._testDispatch = this._testDispatch.bind(this);
    }

    componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _testDispatch() {
        this.props.store.dispatch({
            type: "DELAYED"
        })
        console.log(this.props)
    }

    _doAjax() {
        this.props.store.dispatch({ type: "FETCHING_DATA" })
        axios.get("oneBus").then((response: {data: {}}) => {
            this.props.store.dispatch({
                type: "FETCHED_DATA",
                payload: response.data
            })
        })
    }

    _getStopInfo() {
        this.props.store.dispatch({ type: "FETCHING_STOPS" })
        axios.get("getStopsByLocation").then((response: {data: {}}) => {
            this.props.store.dispatch({
                type: "FETCHED_STOPS",
                payload: response.data
            })
        })
    }

    render() {
        const props = this.props;
        const { store } = props;
        const state = store.getState()
        return (
            <div>
                <button onClick={this._doAjax}>AjaxButton</button>
                <button onClick={this._getStopInfo}>getStopInfo</button>
                <button onClick={this._testDispatch}>TestReduxButton</button>
                <div>Text Area {state.busStopInfoReducer[0].name}</div>
            </div>
        )
    }
}
