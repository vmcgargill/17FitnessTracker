const mongojs = require("mongojs");
const db = require("../models")

module.exports = function(app) {

  // getLastWorkout()
  app.get("/api/workouts", ({ body }, res) => {
    db.Workout.find({}, (err, workout) => {
      if (err) {
        throw err;
      } else {
        res.json(workout);
      }
    })
  });
  
  // addExercise(data)
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $push: { exercises: req.body }
      },
      (error, workout) => {
        if (error) throw error;
        // After updating the workout with new exercise, update the total duration by using the getTotalDuration.
        db.Workout.findByIdAndUpdate(
          {
            _id: mongojs.ObjectId(req.params.id)
          },
          {
            $set: { totalDuration: workout.getTotalDuration() }
          },
          (err, wrkout) => {
            if (err) throw err;
            res.json(wrkout);
          }
        )
      }
    )
  });
  
  // createWorkout(data = {})
  app.post("/api/workouts", (req, res) => {
    const workout = new db.Workout();
    workout.getTotalDuration();
    db.Workout.create(workout).then(dbWorkout => {
      res.json(dbWorkout);
    });
  });
  
  // getWorkoutsInRange()
  app.get("/api/workouts/range", ({ body }, res) => {
    db.Workout.find({}, (err, dbworkout) => {
      if (err) {
        throw err;
      } else {
        res.send(dbworkout);
      }
    })
  });

};