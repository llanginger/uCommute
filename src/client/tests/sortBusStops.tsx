interface BusStop {
    name: string;
    routeIds: number[];
    checked?: boolean 
}

const homeStops: BusStop[] = [
    {
        name: "homeStop1",
        routeIds: [1, 2, 3]
    },
    {
        name: "homeStop2",
        routeIds: [4, 5, 6]
    },
    {
        name: "homeStop3",
        routeIds: [1, 4, 7]
    }
]

const workStops: BusStop[] = [
    {
        name: "workStop1",
        routeIds: [1, 12, 3]
    },
    {
        name: "workStop2",
        routeIds: [4, 8, 6]
    },
    {
        name: "workStop3",
        routeIds: [2, 8, 5]
    }
]

var routes = [];

for (var stop in workStops) {
    workStops[stop].checked = false
}

for (var i = 0; i < homeStops.length; i++) {

    routes.push(Object.assign(
        {
            stopInfo: homeStops[i],
            matchedRoutes: []
        }
    ))

    console.log("routes: ", routes)

    for (var j = 0; j < homeStops[i].routeIds.length; j++) {
        var route1 = homeStops[i].routeIds[j]

        for (var k = 0; k < workStops.length; k++) {
            var workRoutes = workStops[k].routeIds;
            if(workRoutes.indexOf(route1) != -1 && workStops[k].checked === false) {
                console.log("test match: ", routes[i])
                routes[i].matchedRoutes.push(workStops[k])
            } else if (workRoutes.indexOf(route1) === -1) {
                routes[i].matchedRoutes.push({ noMatch: true})
            }
        }
        // if (routes[i].matchedRoutes.length <= j) {
        //     routes[i].matchedRoutes.push({ noMatch: true})
        // }
    }
}