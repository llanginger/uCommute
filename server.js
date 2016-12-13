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

var OneBusApi = {
  baseUrl     : "http://api.pugetsound.onebusaway.org/api/where/",
  allRoutes   : "route-ids-for-agency/1",
  arrivalsDeparturesForStop : "arrivals-and-departures-for-stop/",
  route       : "trips-for-route/",
  key         : "?key=4f368d44-acaf-4922-8930-12a607f4ef44",
  D_LINE_ID   : "1_102581"
}

var oneBusUrl = OneBusApi.baseUrl + OneBusApi.route + OneBusApi.D_LINE_ID + ".json" + OneBusApi.key + "&includeStatus=true";

var marketStreetTestUrl = OneBusApi.baseUrl + OneBusApi.arrivalsDeparturesForStop + marketStop.id + ".json" + OneBusApi.key


app.use(express.static(path.join(__dirname, './build/client')));

app.get("/oneBus", function(req, res) {
  var stuff
  request(oneBusUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      stuff = body
      console.log(body) // Show the HTML for the Google homepage.
    }
    res.send(stuff);
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
