import { IWorkout } from "./types";
import { createMockWorkout } from "../../test/mocks/modules/workout";

const ALL_WORKOUTS = [
  createMockWorkout(),
  createMockWorkout(),
  createMockWorkout(),
];

/**
 * This function returns all of the workouts for the current user
 * intended to be used at the dashboard where the user sess his workouts.
 * @TODO: Make it into something smarter instead of calling the function
 * **hardcodedly 3 times**.
 * @returns Returns a list of workouts
 */
export const getWorkouts = () => {
  return ALL_WORKOUTS;
};

export const getWorkout = (id: string) =>
  ALL_WORKOUTS.find((workout: IWorkout) => workout.id === id);

export const Workout = {
  getWorkouts,
  getWorkout,
};
