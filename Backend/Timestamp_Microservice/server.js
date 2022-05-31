// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var strftime = require('strftime');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// api/date
app.get("/api/:date", function (req, res) {
  let date = new Date();

  if (req.params.date.includes('-') || req.params.date.includes(' ')) {
    date = new Date(req.params.date)

  } else {
    date.setTime(req.params.date);
  }

  if (!date.getTime()) {
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: date.getTime(),
      utc: strftime('%a, %d %b %Y %H:%M:%S GMT', date)
    });
  }
  
});

app.get("/api/", function (req, res) {
  var date = new Date();
  res.json({
    unix: date.getTime(),
    utc: strftime('%a, %d %b %Y %H:%M:%S GMT', date)
  });
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
