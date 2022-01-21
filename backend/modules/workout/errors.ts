export enum ErrorCodes {
  GET_WORKOUTS = "GET_WORKOUTS",
  GET_WORKOUT = "GET_WORKOUT",
  WORKOUT_NOT_FOUND = "WORKOUT_NOT_FOUND",
  CREATE_WORKOUT = "CREATE_WORKOUT",
}

export const MESSAGES: { [key in keyof typeof ErrorCodes]?: string } = {
  [ErrorCodes.GET_WORKOUTS]:
    "There was an error trying to retrieve the user's workouts.",
  [ErrorCodes.GET_WORKOUT]:
    "There was an error trying to retrieve the workout.",
  [ErrorCodes.WORKOUT_NOT_FOUND]: "The workout could not be found.",
  [ErrorCodes.CREATE_WORKOUT]: "There was an error trying to create a workout.",
};
