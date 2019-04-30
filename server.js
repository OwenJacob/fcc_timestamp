// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp", function (req, res){
  var date = new Date().toString();
  res.json({"unix": Date.parse(date), "utc": date});
});
        
app.get("/api/timestamp/:date_string", function (req, res) {
  var date = new Date(req.params.date_string).toUTCString();
  var unix = new Date(req.params.date_string).getTime();
  if (date == "Invalid Date") {
    unix = new Date(parseInt(req.params.date_string)).getTime();
    date = new Date(parseInt(req.params.date_string)).toUTCString();
  }
  res.json({"unix": unix, "utc": date});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});