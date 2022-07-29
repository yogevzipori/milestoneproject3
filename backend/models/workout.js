const mongoose = require("mongoose");

const { Schema } = mongoose;

const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;