import { Router } from "express";
import { handler } from "./handlers";

const setRoutes = (router: Router) => {
  router.get("/workouts", handler.handleGetWorkouts);
  router.get("/workout/:id", handler.handleGetWorkout);
  router.post("/workout/:id/start", handler.handleStartWorkout);
};

export default {
  setRoutes,
};
