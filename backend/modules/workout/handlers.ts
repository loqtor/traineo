import { Request, Response } from "express";
import { ErrorCodes, MESSAGES } from "./errors";
import { handleException } from "../../util/exception-handler";
import { Workout } from "./module";
import { IWorkout } from "./types";

interface IWorkoutRequestGet {
  id: string;
}

// type WorkoutRequestPost = Omit<IWorkout, "id">;

type RequestWorkoutById = Request<IWorkoutRequestGet, {}, {}, {}>;
// type RequestCreateWorkout = Request<{}, {}, {}, WorkoutRequestPost>;

const handleGetWorkouts = async (_: Request, res: Response) => {
  try {
    const workouts = (await Workout.getWorkouts()) as IWorkout[];

    return res.status(200).json(workouts);
  } catch (deliveriesPendingError) {
    return handleException(res, {
      error: deliveriesPendingError,
      message: MESSAGES[ErrorCodes.GET_WORKOUTS],
      code: ErrorCodes.GET_WORKOUTS,
    });
  }
};

const handleGetWorkout = async (req: RequestWorkoutById, res: Response) => {
  try {
    const workout = (await Workout.getWorkout(req.params.id)) as IWorkout;

    if (!workout) {
      return handleException(
        res,
        {
          message: MESSAGES[ErrorCodes.WORKOUT_NOT_FOUND],
          code: ErrorCodes.WORKOUT_NOT_FOUND,
        },
        404
      );
    }

    return res.status(200).json(workout);
  } catch (deliveriesPendingError) {
    return handleException(res, {
      error: deliveriesPendingError,
      message: MESSAGES[ErrorCodes.GET_WORKOUT],
      code: ErrorCodes.GET_WORKOUT,
    });
  }
};

export const handler = {
  handleGetWorkouts,
  handleGetWorkout,
};
