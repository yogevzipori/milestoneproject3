require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const defineCurrentUser = require("./middleware/defineCurrentUser");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongoDB at", process.env.MONGO_URI);
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(defineCurrentUser)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Fit App server"})
});

app.use("/workouts", require("./controllers/workout.js"));
app.use("/users", require("./controllers/user.js"));
app.use("/authentication", require("./controllers/authentication"))

app.listen(process.env.PORT, () => {
    console.log("Listening at port", process.env.PORT);
});