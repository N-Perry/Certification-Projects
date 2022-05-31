require('dotenv').config();
const express = require('express');
const cors = require('cors');
var validUrl = require('valid-url');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;



app.use(cors());

//app.use('/', bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(`${process.cwd()}/public`));

// load base page
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// connect to the database
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let urlSchema = new mongoose.Schema({
  original: {type: String, require: true},
  short: Number
})

// create url model
let Url = mongoose.model('Url', urlSchema)
let responseObject = {};

app.post('/api/shorturl', bodyParser.urlencoded({extended: false}), (req, res) => {
  let inputUrl = req.body['url'];

  let urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);

  if (!inputUrl.match(urlRegex)) {
    res.json({error: "invalid url"});
    return
  }

  responseObject['original_url'] = inputUrl;

  let inputShort = 1;

  Url.findOne({})
      .sort({short: "desc"})
      .exec((error, result) => {
        if (!error && result != undefined) {
          inputShort = result.short + 1;
        }
        if (!error) {
          Url.findOneAndUpdate(
            {original: inputUrl},
            {original: inputUrl, short: inputShort},
            {new: true, upsert: true},
            (error, newSavedUrl) => {
              if (!error) {
                responseObject['short_url'] = newSavedUrl.short;
                res.json(responseObject);
              }
            }
          );
        }
      })
})

app.get('/api/shorturl/:input', (req, res) => {
  let input = req.params.input;

  Url.findOne({short: parseInt(input)}, (error, result) => {
    if (!error && result != undefined) {
      res.redirect(result.original);
    } else {
      res.json({error: 'URL does not exist'});
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
