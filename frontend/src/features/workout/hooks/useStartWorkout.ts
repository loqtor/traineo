import { makePostRequest } from '../../../util/ajax';
import { useMutation } from 'react-query';
import { IWorkout } from '../types';

const startWorkoutApi = (id: string) => makePostRequest(`workout/${id}/start`, {});

export const useStartWorkout = () => {
  const { mutate, isLoading, isError } = useMutation<any, any, any, any>(`workouts/start`, startWorkoutApi);

  const broadcastWorkoutStart = (workout: IWorkout) => {
    mutate(workout.id, {
      onSuccess: () => console.log('Request successful and broadcast emmited.'),
    });
  };

  return {
    isLoading,
    isError,
    broadcastWorkoutStart,
  };
};
