require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());

const usersRouter = require("./routes/user");
app.use("/users", usersRouter);

const workoutsRouter = require("./routes/workout");
app.use("/workouts", workoutsRouter);

app.listen(PORT, () => {
    console.log("Listening on", PORT);
});