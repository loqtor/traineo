import { Router } from "express";
import { handler } from "./handlers";

const setRoutes = (router: Router) => {
  router.get("/workouts", handler.handleGetWorkouts);
  router.get("/workout/:id", handler.handleGetWorkout);
  router.post("/workout/:id/start", handler.handleStartWorkout);
  router.post("/workout/:id/complete", handler.handleCompleteWorkout);
  router.post("/workout/:id/abandon", handler.handleAbandonWorkout);
};

export default {
  setRoutes,
};
