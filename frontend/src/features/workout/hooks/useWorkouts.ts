import { makeGetRequest } from '../../../util/ajax';
import { useQuery } from 'react-query';
import { IWorkout } from '../types';

const getWorkouts = (): Promise<IWorkout[]> => makeGetRequest('/workouts');

export const useWorkouts = () => {
  const { data: workouts, isLoading, isError } = useQuery<IWorkout[]>('workouts', () => getWorkouts());

  return {
    workouts,
    isLoading,
    isError,
  };
};
