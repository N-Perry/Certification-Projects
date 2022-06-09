const fs = require('fs'); // built into Node.js
const path = require('path') // built into Node.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * == any domain is allowed access to these responses, will bypass CORS error flag in browser.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE') // controls which HTTP methods may be attached to incoming requests from frontend
  next();
});

app.use("/api/places", placesRoutes); // => /api/places/...
app.use("/api/users", usersRoutes); // => /api/users/...

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// will execute if any middleware in front of it yields an error.
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
}); // no path & 4th argument (which is really the first argument, 'error') means Express.js will recognize this function as an 'error-handling' middleware function.

// must have your own MongoDB '<username>:<password>' in place of mongoKey
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myfirstcluster.mj6hp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
