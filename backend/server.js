require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const defineCurrentUser = require("./middleware/defineCurrentUser");

app.use(cookieSession({
    name: "session",
    keys: [ process.env.SESSION_SECRET ],
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
}))

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongoDB at", MONGO_URI);
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); // prevent cors errors
app.use(express.urlencoded({ extended: true })); // parse incoming requests
app.use(express.json()); // parse incoming requests with JSON payloads
app.use(defineCurrentUser)


app.get("/", (req, res) => {
    res.send("Index route");
});

// authentication controller
app.use("/authentication", require("./controllers/authentication"))

// user controller
app.use("/users", require("./controllers/user.js"));

// workout controller
app.use("/workouts", require("./controllers/workout.js"));

// 404 error
app.get("*", (req, res) => {
    res.json("error404");
});


// 4. listen for connections
app.listen(PORT, () => {
    console.log("Listening at port", PORT);
});