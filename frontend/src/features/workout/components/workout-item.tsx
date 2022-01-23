import { IWorkout } from '../types';

export interface IWorkoutItemProps {
  workout: IWorkout;
  onWorkoutClick?: (workout: IWorkout) => void;
}

export const WorkoutItem = ({ workout, onWorkoutClick }: IWorkoutItemProps) => (
  <div>
    <h3>{workout.name}</h3>
    <span>{workout.tracks.length} tracks</span>
    {onWorkoutClick && <button onClick={() => onWorkoutClick(workout)}>See details</button>}
  </div>
);
