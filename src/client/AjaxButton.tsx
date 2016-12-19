import * as React from "react";
import * as Blueprint from "@blueprintjs/core";
import * as request from "request"
import * as axios from "axios"
import * as _ from "underscore";

interface AJButton {
    store: any
}

interface Route {
    code?: string;
    direction?: string;
    id?: string;
    lat?: number;
    lon?: number;
    name?: string;
    routeIds?: string[] | undefined;
    wheelchairBoarding?: string;
    checked?: boolean;
}

const homeCoords = {
  lat: "47.667880",
  lon: "-122.381775"
}

const workCoords = {
    lat: "47.606300",
    lon: "122.336351"
}

export class AjaxButton<AJButton> extends React.Component<any, any> {

    private unsubscribe: Function;

    constructor(props) {
        super(props)
        this._doAjax = this._doAjax.bind(this)
        this._getStopsForLocation = this._getStopsForLocation.bind(this)
        this._testDispatch = this._testDispatch.bind(this);
        this._displayStopName = this._displayStopName.bind(this);
        this._getRoutesForLocation = this._getRoutesForLocation.bind(this);
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

    _getStopsForLocation() {
        this.props.store.dispatch({ type: "FETCHING_STOPS" })
        axios.get("getStopsByLocation", {
            params: {
                radius: "300"
            }
        }).then((response: {data: {}}) => {
            this.props.store.dispatch({
                type: "FETCHED_STOPS",
                payload: response.data
            })
        })
    }

    _getRoutesForLocation() {
        this.props.store.dispatch({ type: "FETCHING_STOPS" })
        axios.get("getStopsByLocation", {
            params: {
                "home": {
                    lat: 47.667880,
                    lon: -122.381775,
                    radius: 300
                },
                "work": {
                    lat: 47.606300,
                    lon: -122.336351,
                    radius: 200
                }
            }
        }).then((response: {data: {}}) => {
            console.log("full response: ", response)
            // this.props.store.dispatch({
            //     type: "FETCHED_ROUTES",
            //     payload: response.data
            // })

            let routes = []
           
            let home: Route[] = response.data[0].data.list
            let work: Route[] = response.data[1].data.list

            console.log("Home response: ", home)
            console.log("Work response: ", work)

            for (var stop in work) {
                work[stop].checked = false
            }

            for (var i = 0; i < home.length; i++) {

                routes.push(Object.assign(
                    {
                        stopInfo: home[i],
                        matchedRoutes: []
                    }
                ))

                console.log("routes: ", routes)

                for (var j = 0; j < home[i].routeIds.length; j++) {
                    var route1 = home[i].routeIds[j]

                    for (var k = 0; k < work.length; k++) {
                        var workRoutes = work[k].routeIds;
                        if(workRoutes.indexOf(route1) != -1 && work[k].checked === false) {
                            console.log("test match: ", routes[i])
                            routes[i].matchedRoutes.push(work[k])
                        }
                    }
                }
            }

            console.log("Filtered routs: ", routes)
            // console.log("filter results: ", home.filter(returnDupes, work))
        })
    }

    _displayStopName() {
        if (this.props.store.getState().busStopInfoReducer.length > 0) {
            return this.props.store.getState().busStopInfoReducer[0].name;
        } else {
            return "dummy name"
        }
    }


    render() {
        const props = this.props;
        const { store } = props;
        const state = store.getState()
        return (
            <div>
                <button onClick={this._getRoutesForLocation}>Get Stop Info</button>
                <div>Text Area {this._displayStopName()}</div>
            </div>
        )
    }
}



// interface BusStop {
//     name: string;
//     routeIds: number[];
//     checked?: boolean 
// }

// const homeStops: BusStop[] = [
//     {
//         name: "homeStop1",
//         routeIds: [1, 2, 3]
//     },
//     {
//         name: "homeStop2",
//         routeIds: [4, 5, 6]
//     },
//     {
//         name: "homeStop3",
//         routeIds: [1, 4, 7]
//     }
// ]

// const workStops: BusStop[] = [
//     {
//         name: "workStop1",
//         routeIds: [1, 12, 3]
//     },
//     {
//         name: "workStop2",
//         routeIds: [4, 8, 6]
//     },
//     {
//         name: "workStop3",
//         routeIds: [2, 8, 5]
//     }
// ]

// var routes = [];

// for (var stop in workStops) {
//     workStops[stop].checked = false
// }

// for (var i = 0; i < homeStops.length; i++) {

//     routes.push(Object.assign(
//         {
//             stopInfo: homeStops[i],
//             matchedRoutes: []
//         }
//     ))

//     console.log("routes: ", routes)

//     for (var j = 0; j < homeStops[i].routeIds.length; j++) {
//         var route1 = homeStops[i].routeIds[j]

//         for (var k = 0; k < workStops.length; k++) {
//             var workRoutes = workStops[k].routeIds;
//             if(workRoutes.indexOf(route1) != -1 && workStops[k].checked === false) {
//                 console.log("test match: ", routes[i])
//                 routes[i].matchedRoutes.push(workStops[k])
//             } else if (workRoutes.indexOf(route1) === -1) {
//                 routes[i].matchedRoutes.push({ noMatch: true})
//             }
//         }
//     }
// }

