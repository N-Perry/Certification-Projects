const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const { MONGO_KEY } = require("./sneaky");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // => /api/places/...
app.use("/api/users", usersRoutes); // => /api/users/...

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// will execute if any middleware in front of it yields an error.
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
}); // no path & 4th argument (which is really the first argument, 'error') means Express.js will recognize this function as an 'error-handling' middleware function.

// must have your own MongoDB '<username>:<password>' in place of mongoKey
const mongoUrl = `mongodb+srv://${MONGO_KEY}@myfirstcluster.mj6hp.mongodb.net/places?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
