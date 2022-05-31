const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/user', (req, res, next) => {
  res.send('<h1> User:' + req.body.username + '</h1>');
})

app.get('/', (req, res, next) => {
  // always call next() unless you ARE IN the middleware where you want to send back a response (only 1 response allowed per request);
  res.send('<form action="/user" method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>');
});

app.listen(5000);