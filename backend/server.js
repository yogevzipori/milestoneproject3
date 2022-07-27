// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// PORT AND MONGOOSE CONNECTION
const PORT = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongodb:", process.env.MONGO_URI);
  }
);

// MIDDLEWARE
app.use(cors()); // prevents cors error
app.use(express.json()); // allows server to parse Json
app.use(express.urlencoded({ extended: true }));

// ROUTES
const usersController = require("./controllers/User.js");
app.use("/users", usersController);

app.listen(PORT, () => {
    console.log("Tracking fitness at:", PORT);
});