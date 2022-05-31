const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
// app.use('/', bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// connect to the database
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

// User schema
let UserSchema = new Schema({
  username: {type: String, required: true}
})

// Exercise schema
let ExerciseSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: Date
})


// create schema models
let User = mongoose.model('User', UserSchema);
let Exercise = mongoose.model('Exercise', ExerciseSchema);


// POST create new user
app.post('/api/users', (req, res) => {
  let newUser = new User({username: req.body.username});

  newUser.save((err, savedUser) => {
    if (err || !savedUser) {
      res.send("there was an error saving the user");
    } else {
      res.json(savedUser);
    }
  })
})

// GET all users
app.get('/api/users', (req, res) => {

  User.find({}, (error, arrayOfUsers) => {
    if (!error) {
      res.json(arrayOfUsers);
    }
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {

  const id = req.params._id
  const { description, duration, date } = req.body
  User.findById(id, (err, userData) => {
    if (err || !userData) {
      res.send("Could not find user");
    } else {
      const newExercise = new Exercise({
        userId: id,
        description,
        duration,
        date: new Date(date)
      })
      newExercise.save((err, data) => {
        if (err || !data) {
          res.send("There was an error saving this exercise");
        } else {
          const { description, duration, date, _id } = data;
          res.json({
            username: userData.username,
            description,
            duration,
            date: date.toDateString(),
            _id: userData.id
          })
        }
      })
    }
  })
})

app.get('/api/users/:_id/logs', (req, res) => {
  const { from, to, limit } = req.query;
  const id = req.params._id;

  User.findById(id, (err, userData) => {
    if (err || !userData) {
      res.send("Could not find user");
    } else {
      let dateObj = {};
      if (from) {
        dateObj["$gte"] = new Date(from);
      }
      if (to) {
        dateObj["$lte"] = new Date(to);
      }
      let filter = {
        userId: id
      };
      if (from || to) {
        filter.date = dateObj
      }
      let nonNullLimit = (limit == null || limit == undefined) ? 500 : limit;
      Exercise.find(filter).limit(+nonNullLimit).exec((err, data) => {
        if (err || !data) {
          res.json([]);
        } else {
          const count = data.length
          const rawLog = data
          const { username, _id } = userData;
          const log = rawLog.map((l) => ({
            description: l.description,
            duration: l.duration,
            date: l.date.toDateString()
          }))
          res.json({username, count, _id, log})
        }
      })
    }
  })
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
