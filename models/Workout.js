const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ],
  day: {
    type: Date,
    default: Date.now
  },
  totalDuration: {
    type: Number
  }
});

WorkoutSchema.methods.getTotalDuration = function() {
  if (this.exercises.length > 0) {
    this.totalDuration = this.exercises.reduce((totalDuration, exercise) => {
      return totalDuration + exercise.duration;
    }, 0);
  } else {
    this.totalDuration = 0;
  }
  return this.totalDuration;
};


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;