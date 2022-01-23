import { IWorkout } from '../types';
import { WorkoutItem } from './workout-item';

interface IWorkoutListProps {
  workouts?: IWorkout[];
  onWorkoutClick?: (workout: IWorkout) => void;
}

export const WorkoutList = ({ workouts, onWorkoutClick }: IWorkoutListProps) => {
  if (!workouts || workouts.length === 0) {
    return <div>No workouts found.</div>;
  }

  return (
    <div>
      <h2>Your workouts</h2>
      <ul>
        {workouts.map((workout: IWorkout) => (
          <li key={workout.id}>
            <WorkoutItem workout={workout} onWorkoutClick={onWorkoutClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};
