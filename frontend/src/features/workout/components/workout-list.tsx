import { IWorkout } from '../types';

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
            <h3>{workout.name}</h3>
            <span>{workout.tracks.length} tracks</span>
            {onWorkoutClick && <button onClick={() => onWorkoutClick(workout)}>See details</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};
