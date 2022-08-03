const mongoose = require("mongoose");

const { Schema } = mongoose;

const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;