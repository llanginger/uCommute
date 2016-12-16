var express = require('express');
var path = require('path');
var http = require("http");
var request = require("request");
var hyperquest = require("hyperquest")

var app = express();

var marketStop = {
  code: "13721",
  direction: "S",
  id: "1_13721",
  lat: 47.668907,
  locationType: 0,
  lon: -122.376312,
  name: "15th Ave NW & NW Market St",
  routeIds:
  [
    "1_100044",
    "1_100350",
    "1_102581"
  ],
  wheelchairBoarding: "UNKNOWN"
}

var myCoords = {
  lat: 47.667880,
  lon: -122.381775
}

var OneBusApi = {
  baseUrl                   : "http://api.pugetsound.onebusaway.org/api/where/",
  stopsFL                   : "stops-for-location",
  routesFL                  : "routes-for-location",
  allRoutes                 : "route-ids-for-agency/1",
  arrivalsDeparturesForStop : "arrivals-and-departures-for-stop/",
  route                     : "trips-for-route/",
  key                       : "?key=4f368d44-acaf-4922-8930-12a607f4ef44",
  D_LINE_ID                 : "1_102581"
}

// http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=TEST&lat=47.667880&lon=-122.381775&radius=300

// http://api.pugetsound.onebusaway.org/api/where/routes-for-location.json?key=TEST&lat=47.653435&lon=-122.381775&query=40

var getStopsByLocationUrl = OneBusApi.baseUrl + OneBusApi.stopsFL + ".json" + OneBusApi.key

var getRoutesByLocationUrl = OneBusApi.baseUrl + OneBusApi.routesFL + ".json" + OneBusApi.key + "&radius=300&maxCount=100"

var oneBusUrl = OneBusApi.baseUrl + OneBusApi.route + OneBusApi.D_LINE_ID + ".json" + OneBusApi.key + "&includeStatus=true";

var marketStreetTestUrl = OneBusApi.baseUrl + OneBusApi.arrivalsDeparturesForStop + marketStop.id + ".json" + OneBusApi.key


app.use(express.static(path.join(__dirname, './build/client')));

app.get("/oneBus", function(req, res) {
  var stuff
  request(oneBusUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      stuff = body
      console.log(body)
    }
    res.send(stuff);
  })
  
})

app.get("/getStopsByLocation", function(req, res) {

  var homeCoords = "&lat=" + JSON.parse(req.query.home).lat + "&lon=" + JSON.parse(req.query.home).lon
  var homeRadius = JSON.parse(req.query.home).radius
  var workCoords = "&lat=" + JSON.parse(req.query.work).lat + "&lon=" + JSON.parse(req.query.work).lon
  var workRadius = JSON.parse(req.query.work).radius

  var stops = []

  request(getStopsByLocationUrl + homeCoords + "&radius=" + homeRadius, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Get Home Stops By Location: ", body)

      stops.push(JSON.parse(body))

      request(getStopsByLocationUrl + workCoords + "&radius=" + workRadius, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Get Work Stops By Location: ", body)

          stops.push(JSON.parse(body))

          res.send(stops)
        } else {
          console.log(error)
        }
      })

    } else if (error) {
      console.log(error)
    }
  })
})

app.get("/getroutesByLocation", function(req, res) {
  console.log(JSON.parse(req.query.home))
  var homeCoords = "&lat=" + JSON.parse(req.query.home).lat + "&lon=" + JSON.parse(req.query.home).lon
  var workCoords = "&lat=" + JSON.parse(req.query.work).lat + "&lon=" + JSON.parse(req.query.work).lon
  var routes = []
  
  request(getRoutesByLocationUrl + homeCoords, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      console.log("Home Call response: ", body)
      routes.push(JSON.parse(body))

      request(getRoutesByLocationUrl + workCoords, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Work Call response: ", body)
          routes.push(JSON.parse(body))
          res.send(routes)
        } else if (error) {
          console.log(error)
        }
      })

    } else if (error) {
      console.log(error)
    }
  })
})

// Listen for requests
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/server/index.html"))
});

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log("Example app listening on port " + port);
})
