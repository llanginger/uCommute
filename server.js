var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './build/client')));

// Listen for requests
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/server/index.html"))
});

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log("Example app listening on port " + port);
})
