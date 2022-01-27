import { makePostRequest } from '../../../util/ajax';
import { useMutation } from 'react-query';
import { IWorkout } from '../types';

const startWorkoutApi = (id: string) => makePostRequest(`workout/${id}/start`, {});
const completetWorkoutApi = (id: string) => makePostRequest(`workout/${id}/complete`, {});
const abandonWorkoutApi = (id: string) => makePostRequest(`workout/${id}/abandon`, {});

export enum WorkoutSocketEvents {
  WORKOUT_START = 'WORKOUT_START',
  WORKOUT_COMPLETE = 'WORKOUT_COMPLETE',
  WORKOUT_ABANDON = 'WORKOUT_ABANDON',
}

export const WorkoutSocketEventToApiMethod = {
  [WorkoutSocketEvents.WORKOUT_START]: startWorkoutApi,
  [WorkoutSocketEvents.WORKOUT_COMPLETE]: completetWorkoutApi,
  [WorkoutSocketEvents.WORKOUT_ABANDON]: abandonWorkoutApi,
};

export const useBroadcastWorkoutEvent = (event: WorkoutSocketEvents) => {
  const mutationFunction = WorkoutSocketEventToApiMethod[event];
  const { mutate, isLoading, isError } = useMutation<any, any, any, any>(`workouts/${event}}`, mutationFunction);

  const broadCastWorkoutEvent = (workout: IWorkout) => {
    mutate(workout.id, {
      onSuccess: () => console.log('Request successful and broadcast emmited.'),
    });
  };

  return {
    isLoading,
    isError,
    broadCastWorkoutEvent,
  };
};
