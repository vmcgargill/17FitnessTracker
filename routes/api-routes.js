
module.exports = function(app) {

  // getLastWorkout()
  app.get("/api/workouts", (req, res) => {
    console.log("Get Workout")
  });
  
  // addExercise(data)
  app.put("/api/workouts/:id", ({ body }, res) => {
    console.log("Add excersize")
  });
  
  // createWorkout(data = {})
  app.post("/api/workouts", ({ body }, res) => {
    console.log("Create workout Workout")
  });
  
  // getWorkoutsInRange()
  app.get("/api/workouts/range", ({ body }, res) => {
    console.log("Get Workouts in Range")
  });
  
};