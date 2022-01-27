import { Request, Response } from "express";
import { ErrorCodes, MESSAGES } from "./errors";
import { handleException } from "../../util/exception-handler";
import { Workout } from "./module";
import { IWorkout } from "./types";
import { socket } from "../../server";
import { WorkoutSocketEvents } from "./constants";

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
  } catch (getWorkoutsError) {
    return handleException(res, {
      error: getWorkoutsError,
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
  } catch (getWorkoutError) {
    return handleException(res, {
      error: getWorkoutError,
      message: MESSAGES[ErrorCodes.GET_WORKOUT],
      code: ErrorCodes.GET_WORKOUT,
    });
  }
};

const handleStartWorkout = async (req: RequestWorkoutById, res: Response) => {
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

    socket.emit(WorkoutSocketEvents.WORKOUT_START, workout);

    return res.status(204).json(workout);
  } catch (getWorkoutError) {
    return handleException(res, {
      error: getWorkoutError,
      message: MESSAGES[ErrorCodes.GET_WORKOUT],
      code: ErrorCodes.GET_WORKOUT,
    });
  }
};

const handleCompleteWorkout = async (
  req: RequestWorkoutById,
  res: Response
) => {
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

    socket.emit(WorkoutSocketEvents.WORKOUT_COMPLETE, workout);

    return res.status(204).json(workout);
  } catch (getWorkoutError) {
    return handleException(res, {
      error: getWorkoutError,
      message: MESSAGES[ErrorCodes.GET_WORKOUT],
      code: ErrorCodes.GET_WORKOUT,
    });
  }
};

const handleAbandonWorkout = async (req: RequestWorkoutById, res: Response) => {
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

    socket.emit(WorkoutSocketEvents.WORKOUT_ABANDON, workout);

    return res.status(204).json(workout);
  } catch (getWorkoutError) {
    return handleException(res, {
      error: getWorkoutError,
      message: MESSAGES[ErrorCodes.GET_WORKOUT],
      code: ErrorCodes.GET_WORKOUT,
    });
  }
};

export const handler = {
  handleGetWorkouts,
  handleGetWorkout,
  handleStartWorkout,
  handleCompleteWorkout,
  handleAbandonWorkout,
};
